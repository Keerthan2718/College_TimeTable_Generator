from ortools.sat.python import cp_model
from app.models.subject import Subject


# -------------------------------------------------
# Morning Preference
# -------------------------------------------------

def calculate_morning_penalty(
    model: cp_model.CpModel,
    variables: dict,
):
    penalties = []

    for (day, period), slot in variables.items():

        is_class = model.NewBoolVar(
            f"{slot.Name()}_is_class"
        )

        model.Add(slot > 0).OnlyEnforceIf(is_class)
        model.Add(slot == 0).OnlyEnforceIf(
            is_class.Not()
        )

        penalties.append(period * is_class)

    return penalties


# -------------------------------------------------
# Balanced Distribution
# -------------------------------------------------

from ortools.sat.python import cp_model


def calculate_balanced_penalty(
    model: cp_model.CpModel,
    variables: dict,
    assignment_map: dict,
    working_days: int,
):
    """
    Encourage each subject to be spread evenly
    across the available working days.
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

    penalties = []

    for scheduler_id in assignment_map.keys():

        if scheduler_id == 0:
            continue

        daily_counts = []

        # -------------------------
        # Count occurrences per day
        # -------------------------

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

            count = model.NewIntVar(
                0,
                len(indicators),
                f"{day}_{scheduler_id}_count"
            )

            model.Add(
                count == sum(indicators)
            )

            daily_counts.append(count)

        # -------------------------
        # Find maximum count
        # -------------------------

        max_count = model.NewIntVar(
            0,
            max(len(daily_counts), 1),
            f"{scheduler_id}_max"
        )

        model.AddMaxEquality(
            max_count,
            daily_counts,
        )

        # -------------------------
        # Find minimum count
        # -------------------------

        min_count = model.NewIntVar(
            0,
            max(len(daily_counts), 1),
            f"{scheduler_id}_min"
        )

        model.AddMinEquality(
            min_count,
            daily_counts,
        )

        # -------------------------
        # Difference
        # -------------------------

        spread = model.NewIntVar(
            0,
            working_days,
            f"{scheduler_id}_spread"
        )

        model.Add(
            spread == max_count - min_count
        )

        penalties.append(spread)

    return penalties


# -------------------------------------------------
# Consecutive Lab Preference
# -------------------------------------------------

def calculate_lab_penalty(
    model: cp_model.CpModel,
    variables: dict,
    assignment_map: dict,
    working_days: int,
    periods_per_day: int,
):
    """
    Penalize isolated lab periods.

    If two consecutive periods contain the same lab,
    penalty becomes 0.

    Otherwise penalty becomes 1.
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

    penalties = []

    for scheduler_id, assignment in assignment_map.items():

        if scheduler_id == 0:
            continue

        if assignment["subject_type"] != Subject.LAB:
            continue

        for day in days[:working_days]:

            for period in range(1, periods_per_day):

                current = variables[(day, period)]
                next_slot = variables[(day, period + 1)]

                same_lab = model.NewBoolVar(
                    f"{day}_{period}_{scheduler_id}_same_lab"
                )

                model.Add(
                    current == scheduler_id
                ).OnlyEnforceIf(same_lab)

                model.Add(
                    current != scheduler_id
                ).OnlyEnforceIf(
                    same_lab.Not()
                )

                penalty = model.NewIntVar(
                    0,
                    1,
                    f"{day}_{period}_{scheduler_id}_penalty"
                )

                model.Add(
                    penalty == 1 - same_lab
                )

                penalties.append(penalty)

    return penalties


# -------------------------------------------------
# Combined Objective
# -------------------------------------------------

def apply_objective(
    model: cp_model.CpModel,
    variables: dict,
    assignment_map: dict,
    working_days: int,
    periods_per_day: int,
):
    """
    Combine all soft constraints into one objective.
    """

    penalties = []

    penalties.extend(
        calculate_morning_penalty(
            model,
            variables,
        )
    )

    penalties.extend(
        calculate_balanced_penalty(
            model,
            variables,
            assignment_map,
            working_days,
        )
    )

    penalties.extend(
        calculate_lab_penalty(
            model,
            variables,
            assignment_map,
            working_days,
            periods_per_day,
        )
    )

    model.Minimize(sum(penalties))