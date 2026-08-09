from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Subject(Base):
    __tablename__ = "subjects"

    # Subject Types
    THEORY = "THEORY"
    LAB = "LAB"

    subject_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    timetable_id = Column(
        Integer,
        ForeignKey("timetables.timetable_id"),
        nullable=False
    )

    subject_name = Column(
        String(100),
        nullable=False
    )

    subject_type = Column(
        String(20),
        nullable=False
    )

    # Relationship with Timetable
    timetable = relationship(
        "Timetable",
        back_populates="subjects"
    )

    # Relationship with TeachingAssignment
    teaching_assignments = relationship(
        "TeachingAssignment",
        back_populates="subject",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return (
            f"<Subject("
            f"id={self.subject_id}, "
            f"name='{self.subject_name}', "
            f"type='{self.subject_type}'"
            f")>"
        )