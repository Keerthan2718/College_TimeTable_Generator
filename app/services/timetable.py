from sqlalchemy.orm import Session

from app.models.timetable import Timetable
from app.schemas import timetable
from app.schemas.timetable import TimetableCreate, TimetableUpdate
from app.models.section import Section
from app.models.subject import Subject
from app.models.faculty import Faculty
from app.models.teaching_assignment import TeachingAssignment
from app.models.constraint import Constraint
from app.scheduler.scheduler import TimetableScheduler
from fastapi import HTTPException


def create_timetable(
    db: Session,
    timetable: TimetableCreate,
    user_id: int,
):
    db_timetable = Timetable(
        title=timetable.title,
        department=timetable.department,
        semester=timetable.semester,
        section=timetable.section,
        academic_year=timetable.academic_year,

        working_days=timetable.time_configuration.working_days,
        periods_per_day=timetable.time_configuration.periods_per_day,
        college_start_time=timetable.time_configuration.college_start_time,
        college_end_time=timetable.time_configuration.college_end_time,
        period_duration=timetable.time_configuration.period_duration,
        lunch_start=timetable.time_configuration.lunch_start,
        lunch_duration=timetable.time_configuration.lunch_duration,

        created_by=user_id,
    )

    db.add(db_timetable)

    # Flush assigns timetable_id without committing
    db.flush()
    db_section = Section(
    timetable_id=db_timetable.timetable_id,
    section_name=timetable.section,
    strength=0,  # Default value for now
    )

    db.add(db_section)
    db.flush()

    # Store created subjects
    subject_map = {}
    # Theory Subjects
    for subject_name in timetable.teaching_assignments.theory_subjects:

        subject = Subject(
                    timetable_id=db_timetable.timetable_id,
        subject_name=subject_name,
        subject_type="THEORY",
        )
        db.add(subject)
        db.flush()
        subject_map[subject_name] = subject

    # Lab Subjects
    for subject_name in timetable.teaching_assignments.lab_subjects:
        subject = Subject(
            timetable_id=db_timetable.timetable_id,
            subject_name=subject_name,
            subject_type="LAB",
        )
        db.add(subject)
        db.flush()
        subject_map[subject_name] = subject

    # Store created faculties
    faculty_map = {}
    # Get all unique faculty names
    faculty_names = set(
            timetable.teaching_assignments.faculty_assignments.values()
    )
    for faculty_name in faculty_names:
        faculty = Faculty(
            timetable_id=db_timetable.timetable_id,
            faculty_name=faculty_name,
        )
        db.add(faculty)
        db.flush()
        faculty_map[faculty_name] = faculty

    # Create Teaching Assignments
    # Theory Subjects
    for subject_name in timetable.teaching_assignments.theory_subjects:
        assignment = TeachingAssignment(
            faculty_id=faculty_map[
                timetable.teaching_assignments.faculty_assignments[subject_name]
            ].faculty_id,
            subject_id=subject_map[subject_name].subject_id,
            section_id=db_section.section_id,
            weekly_periods=timetable.teaching_assignments.theory_weekly_periods[
                subject_name
            ],
        )
        db.add(assignment)

    for subject_name in timetable.teaching_assignments.lab_subjects:
        assignment = TeachingAssignment(
            faculty_id=faculty_map[
                timetable.teaching_assignments.faculty_assignments[subject_name]
            ].faculty_id,
            subject_id=subject_map[subject_name].subject_id,
            section_id=db_section.section_id,
            weekly_periods=timetable.teaching_assignments.lab_weekly_periods[
                subject_name
            ],
        )
        db.add(assignment)

    # Create Constraints
    for constraint in timetable.constraints:
        db_constraint = Constraint(
            timetable_id=db_timetable.timetable_id,
            constraint_type=constraint.constraint_type,
            subject=constraint.subject,
            day=constraint.day,
            period=constraint.period,
        )

        db.add(db_constraint)


    
    db.commit()
    db.refresh(db_timetable)
    return db_timetable


def get_timetable(db: Session, timetable_id: int):
    return (
        db.query(Timetable)
        .filter(Timetable.timetable_id == timetable_id)
        .first()
    )
def get_timetable_details(
    db: Session,
    timetable_id: int,
    user_id: int,
):
    timetable = (
        db.query(Timetable)
        .filter(Timetable.timetable_id == timetable_id, Timetable.created_by == user_id)
        .first()
    )

    if not timetable:
        return None

    teaching_assignments = []

    for section in timetable.sections:
        teaching_assignments.extend(section.teaching_assignments)

    timetable_entries = []

    for entry in timetable.timetable_entries:

        timetable_entries.append({
            "entry_id": entry.entry_id,
            "day": entry.day,
            "period": entry.period,
            "subject": entry.assignment.subject.subject_name,
            "faculty": entry.assignment.faculty.faculty_name,
            "room": entry.room,
        })

    

    return {
    "timetable_id": timetable.timetable_id,
    "title": timetable.title,
    "department": timetable.department,
    "semester": timetable.semester,
    "section": timetable.section,
    "academic_year": timetable.academic_year,
    "working_days": timetable.working_days,
    "periods_per_day": timetable.periods_per_day,
    "college_start_time": timetable.college_start_time,
    "college_end_time": timetable.college_end_time,
    "period_duration": timetable.period_duration,
    "lunch_start": timetable.lunch_start,
    "lunch_duration": timetable.lunch_duration,
    "sections": timetable.sections,
    "subjects": timetable.subjects,
    "faculties": timetable.faculties,
    "constraints": timetable.constraints,
    "teaching_assignments": teaching_assignments,
    "timetable_entries": timetable_entries,
}

def get_all_timetables(
        db: Session,
        user_id:int,
    ):
    return(
         db.query(Timetable).filter(Timetable.created_by == user_id).all()
)


def update_timetable(
    db: Session,
    timetable_id: int,
    timetable: TimetableUpdate
):
    db_timetable = get_timetable(db, timetable_id)

    if not db_timetable:
        return None

    update_data = timetable.model_dump(exclude_unset=True)

    # Update nested time configuration
    if "time_configuration" in update_data:

        time_config = update_data.pop("time_configuration")

        for key, value in time_config.items():
            setattr(db_timetable, key, value)

    # Update remaining timetable fields
    for key, value in update_data.items():
        setattr(db_timetable, key, value)

    db.commit()
    db.refresh(db_timetable)

    return db_timetable


def delete_timetable(
        db: Session,
        timetable_id: int,
        user_id: int,
        ):
    timetable = (
        db.query(Timetable)
        .filter(Timetable.timetable_id == timetable_id, Timetable.created_by == user_id)
        .first()
    )

    if not timetable:
        return None

    db.delete(timetable)
    db.commit()

    return timetable




def generate_timetable(
    db: Session,
    timetable_id: int,
    user_id: int,
):
    timetable = (
        db.query(Timetable)
        .filter(Timetable.timetable_id == timetable_id, Timetable.created_by == user_id)
        .first()
    )
    if not timetable:
        raise HTTPException(
            status_code=404,
            detail="Timetable not found"
        )
    scheduler = TimetableScheduler(
        db=db,
        timetable_id=timetable_id,
    )

    success = scheduler.generate()

    if not success:
        raise HTTPException(status_code=400, detail="Failed to generate timetable")

    return {
        "message": "Timetable generated successfully"
    }