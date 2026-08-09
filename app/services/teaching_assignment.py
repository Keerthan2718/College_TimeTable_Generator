from sqlalchemy.orm import Session

from app.models.teaching_assignment import TeachingAssignment
from app.schemas.teaching_assignment import (
    TeachingAssignmentCreate,
    TeachingAssignmentUpdate
)


def create_teaching_assignment(
    db: Session,
    assignment: TeachingAssignmentCreate
):
    db_assignment = TeachingAssignment(
        faculty_id=assignment.faculty_id,
        subject_id=assignment.subject_id,
        section_id=assignment.section_id,
        weekly_periods=assignment.weekly_periods
    )

    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)

    return db_assignment


def get_teaching_assignment(
    db: Session,
    assignment_id: int
):
    return (
        db.query(TeachingAssignment)
        .filter(
            TeachingAssignment.assignment_id == assignment_id
        )
        .first()
    )


def get_all_teaching_assignments(db: Session):
    return db.query(TeachingAssignment).all()


def update_teaching_assignment(
    db: Session,
    assignment_id: int,
    assignment: TeachingAssignmentUpdate
):
    db_assignment = get_teaching_assignment(
        db,
        assignment_id
    )

    if not db_assignment:
        return None

    update_data = assignment.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_assignment, key, value)

    db.commit()
    db.refresh(db_assignment)

    return db_assignment


def delete_teaching_assignment(
    db: Session,
    assignment_id: int
):
    db_assignment = get_teaching_assignment(
        db,
        assignment_id
    )

    if not db_assignment:
        return None

    db.delete(db_assignment)
    db.commit()

    return db_assignment