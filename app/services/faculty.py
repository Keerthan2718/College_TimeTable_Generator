from sqlalchemy.orm import Session

from app.models.faculty import Faculty
from app.schemas.faculty import FacultyCreate, FacultyUpdate


def create_faculty(db: Session, faculty: FacultyCreate):
    db_faculty = Faculty(
        timetable_id=faculty.timetable_id,
        faculty_name=faculty.faculty_name,
        max_periods_per_week=faculty.max_periods_per_week
    )

    db.add(db_faculty)
    db.commit()
    db.refresh(db_faculty)

    return db_faculty


def get_faculty(db: Session, faculty_id: int):
    return db.query(Faculty).filter(Faculty.faculty_id == faculty_id).first()


def get_all_faculties(db: Session):
    return db.query(Faculty).all()


def update_faculty(db: Session, faculty_id: int, faculty: FacultyUpdate):
    db_faculty = get_faculty(db, faculty_id)

    if not db_faculty:
        return None

    update_data = faculty.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_faculty, key, value)

    db.commit()
    db.refresh(db_faculty)

    return db_faculty


def delete_faculty(db: Session, faculty_id: int):
    db_faculty = get_faculty(db, faculty_id)

    if not db_faculty:
        return None

    db.delete(db_faculty)
    db.commit()

    return db_faculty