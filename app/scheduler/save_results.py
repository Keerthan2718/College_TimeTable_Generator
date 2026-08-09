from sqlalchemy.orm import Session

from app.models.timetable_entry import TimetableEntry


def save_timetable_entries(
    db: Session,
    timetable_id: int,
    variables: dict,
    solver,
    scheduler_to_db: dict,
):
    """
    Save OR-Tools solution into timetable_entries table.
    """

    # Remove previous generated timetable
    db.query(TimetableEntry).filter(
        TimetableEntry.timetable_id == timetable_id
    ).delete()

    entries = []

    for (day, period), variable in variables.items():

        scheduler_id = solver.Value(variable)

        # Skip FREE periods
        if scheduler_id == 0:
            continue

        assignment_id = scheduler_to_db[scheduler_id]

        entry = TimetableEntry(
            timetable_id=timetable_id,
            day=day,
            period=period,
            assignment_id=assignment_id,
        )

        entries.append(entry)

    db.add_all(entries)

    db.commit()

    return entries