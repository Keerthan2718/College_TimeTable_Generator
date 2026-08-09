from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.constraint import (
    ConstraintCreate,
    ConstraintUpdate,
    ConstraintResponse
)
from app.services import constraint as constraint_service

router = APIRouter(
    prefix="/constraints",
    tags=["Constraints"]
)


@router.post("/", response_model=ConstraintResponse)
def create_constraint(
    constraint: ConstraintCreate,
    db: Session = Depends(get_db)
):
    return constraint_service.create_constraint(
        db,
        constraint
    )


@router.get("/", response_model=list[ConstraintResponse])
def get_all_constraints(
    db: Session = Depends(get_db)
):
    return constraint_service.get_all_constraints(db)


@router.get("/{constraint_id}", response_model=ConstraintResponse)
def get_constraint(
    constraint_id: int,
    db: Session = Depends(get_db)
):
    constraint = constraint_service.get_constraint(
        db,
        constraint_id
    )

    if not constraint:
        raise HTTPException(
            status_code=404,
            detail="Constraint not found"
        )

    return constraint


@router.put("/{constraint_id}", response_model=ConstraintResponse)
def update_constraint(
    constraint_id: int,
    constraint: ConstraintUpdate,
    db: Session = Depends(get_db)
):
    updated_constraint = constraint_service.update_constraint(
        db,
        constraint_id,
        constraint
    )

    if not updated_constraint:
        raise HTTPException(
            status_code=404,
            detail="Constraint not found"
        )

    return updated_constraint


@router.delete("/{constraint_id}", response_model=ConstraintResponse)
def delete_constraint(
    constraint_id: int,
    db: Session = Depends(get_db)
):
    deleted_constraint = constraint_service.delete_constraint(
        db,
        constraint_id
    )

    if not deleted_constraint:
        raise HTTPException(
            status_code=404,
            detail="Constraint not found"
        )

    return deleted_constraint