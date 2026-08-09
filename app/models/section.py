from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Section(Base):
    __tablename__ = "sections"

    section_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    timetable_id = Column(
        Integer,
        ForeignKey("timetables.timetable_id"),
        nullable=False
    )

    section_name = Column(
        String(50),
        nullable=False
    )

    # Optional for now
    strength = Column(
        Integer,
        nullable=True
    )

    # Relationship with Timetable
    timetable = relationship(
        "Timetable",
        back_populates="sections"
    )

    # Relationship with TeachingAssignment
    teaching_assignments = relationship(
        "TeachingAssignment",
        back_populates="section",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return (
            f"<Section("
            f"id={self.section_id}, "
            f"name='{self.section_name}', "
            f"strength={self.strength}"
            f")>"
        )