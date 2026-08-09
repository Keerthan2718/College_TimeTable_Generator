from ortools.sat.python import cp_model
from sqlalchemy.orm import Session
from app.models.teaching_assignment import TeachingAssignment
from app.models.timetable import Timetable
from datetime import datetime
from sqlalchemy.orm import joinedload
from app.models.section import Section

def calculate_lunch_period(
    college_start_time: str,
    lunch_start: str,
    period_duration: int,
):
    """
    Convert lunch start time into the timetable period number.

    Example:
        College Start : 09:00
        Lunch Start   : 13:00
        Duration      : 60

        Returns 5
    """

    start = datetime.strptime(
        college_start_time,
        "%H:%M",
    )

    lunch = datetime.strptime(
        lunch_start,
        "%H:%M",
    )

    minutes = (
        lunch - start
    ).seconds // 60

    return (minutes // period_duration) + 1


def load_timetable(
    db: Session,
    timetable_id: int,
):
    return (
        db.query(Timetable)
        .filter(
            Timetable.timetable_id == timetable_id
        )
        .first()
    )


DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]

def load_teaching_assignments(
        db: Session,
        timetable_id: int ,
):
    assignments = (
        db.query(TeachingAssignment)
        .join(Section)
        .filter(
            Section.timetable_id == timetable_id
        )
        .options(
            joinedload(TeachingAssignment.subject),
            
        )
        .all()
    )
    return assignments

def build_assignment_map(assignments):

    assignment_map = {
        0:{
            "db_assignment_id": None,
            "faculty_id": None,
            "subject_id": None,
            "section_id": None,
            "weekly_periods": 0,
            "name": "FREE",
        }
    }
    scheduler_to_db={
        0:None
    }
    db_to_scheduler={}
    scheduler_id=1

    for assignment in assignments:
        scheduler_to_db[scheduler_id]=assignment.assignment_id
        db_to_scheduler[assignment.assignment_id]=scheduler_id
        assignment_map[scheduler_id] ={
            "db_assignment_id": assignment.assignment_id,
            "faculty_id": assignment.faculty_id,
            "subject_id": assignment.subject_id,
            "section_id": assignment.section_id,
            "weekly_periods": assignment.weekly_periods,
            "subject_name": assignment.subject.subject_name,
            "subject_type": assignment.subject.subject_type,
                                                }
        scheduler_id+=1
    return (
        assignment_map,
        scheduler_to_db,
        db_to_scheduler,
    )

def create_variables(
    model: cp_model.CpModel,
    working_days: int,
    periods_per_day: int,
    total_assignments: int,
):
    variables = {}

    for day in DAYS[:working_days]:

        for period in range(1, periods_per_day + 1):

            variables[(day, period)] = model.NewIntVar(
                0,
                total_assignments,
                f"{day}_P{period}",
            )

    return variables