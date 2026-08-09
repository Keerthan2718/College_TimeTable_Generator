from sqlalchemy.orm import Session

from app.models.timetable_entry import TimetableEntry
from app.schemas.timetable_entry import (
    TimetableEntryCreate,
    TimetableEntryUpdate
)


def create_timetable_entry(
    db: Session,
    entry: TimetableEntryCreate
):
    db_entry = TimetableEntry(
        timetable_id=entry.timetable_id,
        day=entry.day,
        period=entry.period,
        assignment_id=entry.assignment_id,
        room=entry.room
    )

    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)

    return db_entry


def get_timetable_entry(
    db: Session,
    entry_id: int
):
    return (
        db.query(TimetableEntry)
        .filter(TimetableEntry.entry_id == entry_id)
        .first()
    )


def get_all_timetable_entries(db: Session):
    return db.query(TimetableEntry).all()


def update_timetable_entry(
    db: Session,
    entry_id: int,
    entry: TimetableEntryUpdate
):
    db_entry = get_timetable_entry(db, entry_id)

    if not db_entry:
        return None

    update_data = entry.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_entry, key, value)

    db.commit()
    db.refresh(db_entry)

    return db_entry


def delete_timetable_entry(
    db: Session,
    entry_id: int
):
    db_entry = get_timetable_entry(db, entry_id)

    if not db_entry:
        return None

    db.delete(db_entry)
    db.commit()

    return db_entry