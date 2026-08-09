from sqlalchemy.orm import Session

from app.models.constraint import Constraint
from app.schemas.constraint import (
    ConstraintCreate,
    ConstraintUpdate,
)


def create_constraint(
    db: Session,
    constraint: ConstraintCreate,
):
    db_constraint = Constraint(
        timetable_id=constraint.timetable_id,
        constraint_type=constraint.constraint_type,
        subject=constraint.subject,
        day=constraint.day,
        period=constraint.period,
    )

    db.add(db_constraint)
    db.commit()
    db.refresh(db_constraint)

    return db_constraint


def get_constraint(
    db: Session,
    constraint_id: int,
):
    return (
        db.query(Constraint)
        .filter(
            Constraint.constraint_id == constraint_id
        )
        .first()
    )


def get_all_constraints(
    db: Session,
):
    return db.query(Constraint).all()


def update_constraint(
    db: Session,
    constraint_id: int,
    constraint: ConstraintUpdate,
):
    db_constraint = get_constraint(
        db,
        constraint_id,
    )

    if not db_constraint:
        return None

    update_data = constraint.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            db_constraint,
            key,
            value,
        )

    db.commit()
    db.refresh(db_constraint)

    return db_constraint


def delete_constraint(
    db: Session,
    constraint_id: int,
):
    db_constraint = get_constraint(
        db,
        constraint_id,
    )

    if not db_constraint:
        return None

    db.delete(db_constraint)
    db.commit()

    return db_constraint