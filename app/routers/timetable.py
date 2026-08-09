from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.timetable_details import TimetableDetailsResponse

from app.database import get_db
from app.schemas.timetable import (
    TimetableCreate,
    TimetableUpdate,
    TimetableResponse,
)
from app.services import timetable as timetable_service

from app.routers.auth import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/timetables",
    tags=["Timetables"]
)

@router.post("/{timetable_id}/generate")
def generate_timetable(
    timetable_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return timetable_service.generate_timetable(
        db=db,
        timetable_id=timetable_id,
        user_id=current_user.user_id,

    )

@router.post("/", response_model=TimetableResponse)
def create_timetable(
    timetable: TimetableCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return timetable_service.create_timetable(
        db,
        timetable,
        current_user.user_id
    )


@router.get("/", response_model=list[TimetableResponse])
def get_all_timetables(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return timetable_service.get_all_timetables(
        db,
        current_user.user_id
        )


@router.get("/{timetable_id}", response_model=TimetableResponse)
def get_timetable(
    timetable_id: int,
    db: Session = Depends(get_db)
):
    timetable = timetable_service.get_timetable(
        db,
        timetable_id
    )

    if not timetable:
        raise HTTPException(
            status_code=404,
            detail="Timetable not found"
        )

    return timetable
@router.get(
    "/{timetable_id}/details",
    response_model=TimetableDetailsResponse
)
def get_timetable_details(
    timetable_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    timetable = timetable_service.get_timetable_details(
        db,
        timetable_id,
        current_user.user_id
    )

    if not timetable:
        raise HTTPException(
            status_code=404,
            detail="Timetable not found"
        )

    return timetable


@router.put("/{timetable_id}", response_model=TimetableResponse)
def update_timetable(
    timetable_id: int,
    timetable: TimetableUpdate,
    db: Session = Depends(get_db)
):
    updated_timetable = timetable_service.update_timetable(
        db,
        timetable_id,
        timetable
    )

    if not updated_timetable:
        raise HTTPException(
            status_code=404,
            detail="Timetable not found"
        )

    return updated_timetable


@router.delete("/{timetable_id}", response_model=TimetableResponse)
def delete_timetable(
    timetable_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted_timetable = timetable_service.delete_timetable(
        db,
        timetable_id,
        current_user.user_id,
    )

    if not deleted_timetable:
        raise HTTPException(
            status_code=404,
            detail="Timetable not found"
        )
    

    return deleted_timetable