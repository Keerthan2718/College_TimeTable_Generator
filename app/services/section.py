from sqlalchemy.orm import Session

from app.models.section import Section
from app.schemas.section import SectionCreate, SectionUpdate


def create_section(db: Session, section: SectionCreate):
    db_section = Section(
        timetable_id=section.timetable_id,
        section_name=section.section_name,
        strength=section.strength
    )

    db.add(db_section)
    db.commit()
    db.refresh(db_section)

    return db_section


def get_section(db: Session, section_id: int):
    return db.query(Section).filter(Section.section_id == section_id).first()


def get_all_sections(db: Session):
    return db.query(Section).all()


def update_section(db: Session, section_id: int, section: SectionUpdate):
    db_section = get_section(db, section_id)

    if not db_section:
        return None

    update_data = section.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_section, key, value)

    db.commit()
    db.refresh(db_section)

    return db_section


def delete_section(db: Session, section_id: int):
    db_section = get_section(db, section_id)

    if not db_section:
        return None

    db.delete(db_section)
    db.commit()

    return db_section