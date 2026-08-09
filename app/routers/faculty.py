from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.faculty import (
    FacultyCreate,
    FacultyUpdate,
    FacultyResponse
)
from app.services import faculty as faculty_service

router = APIRouter(
    prefix="/faculties",
    tags=["Faculties"]
)


@router.post("/", response_model=FacultyResponse)
def create_faculty(
    faculty: FacultyCreate,
    db: Session = Depends(get_db)
):
    return faculty_service.create_faculty(db, faculty)


@router.get("/", response_model=list[FacultyResponse])
def get_all_faculties(db: Session = Depends(get_db)):
    return faculty_service.get_all_faculties(db)


@router.get("/{faculty_id}", response_model=FacultyResponse)
def get_faculty(
    faculty_id: int,
    db: Session = Depends(get_db)
):
    faculty = faculty_service.get_faculty(db, faculty_id)

    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")

    return faculty


@router.put("/{faculty_id}", response_model=FacultyResponse)
def update_faculty(
    faculty_id: int,
    faculty: FacultyUpdate,
    db: Session = Depends(get_db)
):
    updated_faculty = faculty_service.update_faculty(
        db,
        faculty_id,
        faculty
    )

    if not updated_faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")

    return updated_faculty


@router.delete("/{faculty_id}", response_model=FacultyResponse)
def delete_faculty(
    faculty_id: int,
    db: Session = Depends(get_db)
):
    deleted_faculty = faculty_service.delete_faculty(db, faculty_id)

    if not deleted_faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")

    return deleted_faculty