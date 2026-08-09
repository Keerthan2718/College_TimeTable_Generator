from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Faculty(Base):
    __tablename__ = "faculties"

    faculty_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    timetable_id = Column(
        Integer,
        ForeignKey("timetables.timetable_id"),
        nullable=False
    )

    faculty_name = Column(
        String(100),
        nullable=False
    )

    max_periods_per_week = Column(
        Integer,
        nullable=False,
        default=30
    )

    # Relationship with Timetable
    timetable = relationship(
        "Timetable",
        back_populates="faculties"
    )

    # Relationship with TeachingAssignment
    teaching_assignments = relationship(
        "TeachingAssignment",
        back_populates="faculty",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return (
            f"<Faculty("
            f"id={self.faculty_id}, "
            f"name='{self.faculty_name}'"
            f")>"
        )