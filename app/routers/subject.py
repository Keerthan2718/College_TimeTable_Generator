from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.subject import (
    SubjectCreate,
    SubjectUpdate,
    SubjectResponse
)
from app.services import subject as subject_service

router = APIRouter(
    prefix="/subjects",
    tags=["Subjects"]
)


@router.post("/", response_model=SubjectResponse)
def create_subject(
    subject: SubjectCreate,
    db: Session = Depends(get_db)
):
    return subject_service.create_subject(db, subject)


@router.get("/", response_model=list[SubjectResponse])
def get_all_subjects(db: Session = Depends(get_db)):
    return subject_service.get_all_subjects(db)


@router.get("/{subject_id}", response_model=SubjectResponse)
def get_subject(
    subject_id: int,
    db: Session = Depends(get_db)
):
    subject = subject_service.get_subject(db, subject_id)

    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    return subject


@router.put("/{subject_id}", response_model=SubjectResponse)
def update_subject(
    subject_id: int,
    subject: SubjectUpdate,
    db: Session = Depends(get_db)
):
    updated_subject = subject_service.update_subject(
        db,
        subject_id,
        subject
    )

    if not updated_subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    return updated_subject


@router.delete("/{subject_id}", response_model=SubjectResponse)
def delete_subject(
    subject_id: int,
    db: Session = Depends(get_db)
):
    deleted_subject = subject_service.delete_subject(db, subject_id)

    if not deleted_subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    return deleted_subject