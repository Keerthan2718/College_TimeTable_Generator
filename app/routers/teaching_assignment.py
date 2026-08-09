from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.teaching_assignment import (
    TeachingAssignmentCreate,
    TeachingAssignmentUpdate,
    TeachingAssignmentResponse
)
from app.services import (
    teaching_assignment as teaching_assignment_service
)

router = APIRouter(
    prefix="/teaching-assignments",
    tags=["Teaching Assignments"]
)


@router.post("/", response_model=TeachingAssignmentResponse)
def create_teaching_assignment(
    assignment: TeachingAssignmentCreate,
    db: Session = Depends(get_db)
):
    return teaching_assignment_service.create_teaching_assignment(
        db,
        assignment
    )


@router.get(
    "/",
    response_model=list[TeachingAssignmentResponse]
)
def get_all_teaching_assignments(
    db: Session = Depends(get_db)
):
    return teaching_assignment_service.get_all_teaching_assignments(
        db
    )


@router.get(
    "/{assignment_id}",
    response_model=TeachingAssignmentResponse
)
def get_teaching_assignment(
    assignment_id: int,
    db: Session = Depends(get_db)
):
    assignment = (
        teaching_assignment_service.get_teaching_assignment(
            db,
            assignment_id
        )
    )

    if not assignment:
        raise HTTPException(
            status_code=404,
            detail="Teaching Assignment not found"
        )

    return assignment


@router.put(
    "/{assignment_id}",
    response_model=TeachingAssignmentResponse
)
def update_teaching_assignment(
    assignment_id: int,
    assignment: TeachingAssignmentUpdate,
    db: Session = Depends(get_db)
):
    updated_assignment = (
        teaching_assignment_service.update_teaching_assignment(
            db,
            assignment_id,
            assignment
        )
    )

    if not updated_assignment:
        raise HTTPException(
            status_code=404,
            detail="Teaching Assignment not found"
        )

    return updated_assignment


@router.delete(
    "/{assignment_id}",
    response_model=TeachingAssignmentResponse
)
def delete_teaching_assignment(
    assignment_id: int,
    db: Session = Depends(get_db)
):
    deleted_assignment = (
        teaching_assignment_service.delete_teaching_assignment(
            db,
            assignment_id
        )
    )

    if not deleted_assignment:
        raise HTTPException(
            status_code=404,
            detail="Teaching Assignment not found"
        )

    return deleted_assignment