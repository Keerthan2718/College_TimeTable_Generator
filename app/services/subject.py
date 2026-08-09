from sqlalchemy.orm import Session

from app.models.subject import Subject
from app.schemas.subject import SubjectCreate, SubjectUpdate


def create_subject(db: Session, subject: SubjectCreate):
    db_subject = Subject(
        timetable_id=subject.timetable_id,
        subject_name=subject.subject_name,
        subject_type=subject.subject_type
    )

    db.add(db_subject)
    db.commit()
    db.refresh(db_subject)

    return db_subject


def get_subject(db: Session, subject_id: int):
    return db.query(Subject).filter(Subject.subject_id == subject_id).first()


def get_all_subjects(db: Session):
    return db.query(Subject).all()


def update_subject(db: Session, subject_id: int, subject: SubjectUpdate):
    db_subject = get_subject(db, subject_id)

    if not db_subject:
        return None

    update_data = subject.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_subject, key, value)

    db.commit()
    db.refresh(db_subject)

    return db_subject


def delete_subject(db: Session, subject_id: int):
    db_subject = get_subject(db, subject_id)

    if not db_subject:
        return None

    db.delete(db_subject)
    db.commit()

    return db_subject