from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.timetable_entry import (
    TimetableEntryCreate,
    TimetableEntryUpdate,
    TimetableEntryResponse
)
from app.services import timetable_entry as timetable_entry_service

router = APIRouter(
    prefix="/timetable-entries",
    tags=["Timetable Entries"]
)


@router.post("/", response_model=TimetableEntryResponse)
def create_timetable_entry(
    entry: TimetableEntryCreate,
    db: Session = Depends(get_db)
):
    return timetable_entry_service.create_timetable_entry(
        db,
        entry
    )


@router.get("/", response_model=list[TimetableEntryResponse])
def get_all_timetable_entries(
    db: Session = Depends(get_db)
):
    return timetable_entry_service.get_all_timetable_entries(db)


@router.get("/{entry_id}", response_model=TimetableEntryResponse)
def get_timetable_entry(
    entry_id: int,
    db: Session = Depends(get_db)
):
    entry = timetable_entry_service.get_timetable_entry(
        db,
        entry_id
    )

    if not entry:
        raise HTTPException(
            status_code=404,
            detail="Timetable Entry not found"
        )

    return entry


@router.put("/{entry_id}", response_model=TimetableEntryResponse)
def update_timetable_entry(
    entry_id: int,
    entry: TimetableEntryUpdate,
    db: Session = Depends(get_db)
):
    updated_entry = timetable_entry_service.update_timetable_entry(
        db,
        entry_id,
        entry
    )

    if not updated_entry:
        raise HTTPException(
            status_code=404,
            detail="Timetable Entry not found"
        )

    return updated_entry


@router.delete("/{entry_id}", response_model=TimetableEntryResponse)
def delete_timetable_entry(
    entry_id: int,
    db: Session = Depends(get_db)
):
    deleted_entry = timetable_entry_service.delete_timetable_entry(
        db,
        entry_id
    )

    if not deleted_entry:
        raise HTTPException(
            status_code=404,
            detail="Timetable Entry not found"
        )

    return deleted_entry