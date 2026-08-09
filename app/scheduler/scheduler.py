from sqlalchemy.orm import Session
from ortools.sat.python import cp_model

from app.scheduler.constraints import (
    apply_daily_subject_limit,
    apply_weekly_period_constraints,
    apply_lunch_break_constraint,
    apply_consecutive_lab_constraint,
    apply_subject_unavailable_constraint,
)   
from app.scheduler.utils import (
    create_variables,
    load_teaching_assignments,
    build_assignment_map,
    load_timetable,
    calculate_lunch_period,
)

from app.scheduler.objective import apply_objective

from app.scheduler.save_results import (
    save_timetable_entries,
)

class TimetableScheduler:

    def __init__(
        self,
        db: Session,
        timetable_id: int,
    ):
        self.db = db
        self.timetable = load_timetable(
            db,
            timetable_id,
        )

        if self.timetable is None:
            raise ValueError(
                 "Timetable not found."
            )

        self.working_days = (
            self.timetable.working_days
        )

        self.periods_per_day = (
            self.timetable.periods_per_day
        )

        self.lunch_period = calculate_lunch_period(
            college_start_time=self.timetable.college_start_time,
            lunch_start=self.timetable.lunch_start,
            period_duration=self.timetable.period_duration,
        )


        # Load teaching assignments from database
        self.assignments = load_teaching_assignments(
            db=db,
            timetable_id=timetable_id,
        )


        self.constraints = self.timetable.constraints


                    

        # Convert assignments into scheduler lookup map
        
        (
            self.assignment_map,
            self.scheduler_to_db,
            self.db_to_scheduler,
        ) =build_assignment_map(
            self.assignments
            )




        # Total number of assignment IDs
        self.max_assignment_id = max(self.assignment_map.keys())

        # OR-Tools Model
        self.model = cp_model.CpModel()

        # OR-Tools Solver
        self.solver = cp_model.CpSolver()

        # Create timetable variables
        self.variables = create_variables(
            model=self.model,
            working_days=self.timetable.working_days,
            periods_per_day=self.timetable.periods_per_day,
            total_assignments=self.max_assignment_id,
        )

    def generate(self):
        apply_weekly_period_constraints(
            model=self.model,
            variables=self.variables,
            assignment_map=self.assignment_map,
        )

        apply_daily_subject_limit(
            model=self.model,
            variables=self.variables,
            assignment_map=self.assignment_map,
            working_days=self.working_days,
        )


        apply_lunch_break_constraint(
            model=self.model,
            variables=self.variables,
            working_days=self.working_days,
            lunch_period=self.lunch_period,
        )
  

        apply_consecutive_lab_constraint(
            model=self.model,
            variables=self.variables,
            assignment_map=self.assignment_map,
            working_days=self.working_days,
            periods_per_day=self.periods_per_day,
        )



        apply_subject_unavailable_constraint(
            model=self.model,
            variables=self.variables,
            assignment_map=self.assignment_map,
            constraints=self.constraints,
        )


        apply_objective(
            model=self.model,
            variables=self.variables,
            assignment_map=self.assignment_map,
            working_days=self.working_days,
            periods_per_day=self.periods_per_day,
        )

        status = self.solver.Solve(self.model)

        print("\n===== Generated Timetable =====")


        
        if status not in (
            cp_model.OPTIMAL,
            cp_model.FEASIBLE,
        ):

            return False

    

        save_timetable_entries(
            db=self.db,
            timetable_id=self.timetable.timetable_id,
            variables=self.variables,
            solver=self.solver,
            scheduler_to_db=self.scheduler_to_db,
    )


        return True