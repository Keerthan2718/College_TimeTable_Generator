from ortools.sat.python import cp_model
import math
from ortools.sat.python import cp_model
from app.models.subject import Subject


def apply_consecutive_lab_constraint(
    model,
    variables,
    assignment_map,
    working_days,
    periods_per_day,
):
    """
    Ensure that lab subjects are scheduled in
    consecutive periods.
    """
    days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]

    for scheduler_id, assignment in assignment_map.items():

        if scheduler_id == 0:
            continue

        if assignment["subject_type"] != Subject.LAB:
            continue

        if assignment["weekly_periods"] != 2:
            continue





def apply_daily_subject_limit(
    model: cp_model.CpModel,
    variables: dict,
    assignment_map: dict,
    working_days: int,
):
    """
    Prevent a subject from being scheduled too many
    times on the same day.
    """

    days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]

    for scheduler_id, assignment in assignment_map.items():

        if scheduler_id == 0:
            continue

        weekly_periods = assignment["weekly_periods"]

        max_per_day = math.ceil(
            weekly_periods / working_days
        )



        for day in days[:working_days]:

            indicators = []

            for (d, period), slot in variables.items():

                if d != day:
                    continue

                is_assignment = model.NewBoolVar(
                    f"{day}_{scheduler_id}_{period}"
                )

                model.Add(
                    slot == scheduler_id
                ).OnlyEnforceIf(is_assignment)

                model.Add(
                    slot != scheduler_id
                ).OnlyEnforceIf(
                    is_assignment.Not()
                )

                indicators.append(is_assignment)

            model.Add(
                sum(indicators) <= max_per_day
            )


def apply_weekly_period_constraints(
    model: cp_model.CpModel,
    variables: dict,
    assignment_map: dict,
):
    """
    Ensure every teaching assignment is scheduled
    exactly weekly_periods times.
    """

    for scheduler_id, assignment in assignment_map.items():
        if scheduler_id == 0:
            # Skip the FREE assignment
            continue

        occurrences = []

        for slot in variables.values():

            is_assigned = model.NewBoolVar(
                f"{slot.Name()}_is_{scheduler_id}"
            )

            model.Add(slot == scheduler_id).OnlyEnforceIf(is_assigned)

            model.Add(slot != scheduler_id).OnlyEnforceIf(
                is_assigned.Not()
            )

            occurrences.append(is_assigned)

        model.Add(
            sum(occurrences)
            == assignment["weekly_periods"]
        )

def apply_lunch_break_constraint(
    model,
    variables,
    working_days,
    lunch_period,
):
    """
    Force lunch period to always be FREE (Scheduler ID 0).
    """

    days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]

    for day in days[:working_days]:

        model.Add(
            variables[(day, lunch_period)] == 0
        )

def apply_subject_unavailable_constraint(
    model: cp_model.CpModel,
    variables: dict,
    assignment_map: dict,
    constraints,
):
    """
    Prevent a specific subject from being scheduled
    on a specific day and period.

    Example:
        Subject: DBMS
        Day: Monday
        Period: 1

    DBMS cannot be assigned to Monday P1.
    """

    for constraint in constraints:

        if constraint.constraint_type != "SUBJECT_UNAVAILABLE":
            continue

        subject = constraint.subject
        day = constraint.day
        period = constraint.period

        # Skip incomplete constraints
        if not subject or not day or period is None:
            continue

        # Make sure the requested slot exists
        if (day, period) not in variables:
            continue

        slot = variables[(day, period)]

        # Find all scheduler assignment IDs belonging
        # to the prohibited subject.
        prohibited_assignment_ids = []

        for scheduler_id, assignment in assignment_map.items():

            if scheduler_id == 0:
                continue

            if assignment["subject_name"] == subject:
                prohibited_assignment_ids.append(
                    scheduler_id
                )

        # Prevent those assignments from occupying
        # the specified slot.
        for scheduler_id in prohibited_assignment_ids:

            model.Add(
                slot != scheduler_id
            )