from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    CheckConstraint,
)
from sqlalchemy.orm import relationship

from app.database import Base


class TeachingAssignment(Base):
    __tablename__ = "teaching_assignments"

    __table_args__ = (
        CheckConstraint(
            "weekly_periods > 0",
            name="check_weekly_periods_positive",
        ),
    )

    assignment_id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    faculty_id = Column(
        Integer,
        ForeignKey("faculties.faculty_id"),
        nullable=False,
        index=True,
    )

    subject_id = Column(
        Integer,
        ForeignKey("subjects.subject_id"),
        nullable=False,
        index=True,
    )

    section_id = Column(
        Integer,
        ForeignKey("sections.section_id"),
        nullable=False,
        index=True,
    )

    weekly_periods = Column(
        Integer,
        nullable=False,
    )

    faculty = relationship(
        "Faculty",
        back_populates="teaching_assignments",
    )

    subject = relationship(
        "Subject",
        back_populates="teaching_assignments",
    )

    section = relationship(
        "Section",
        back_populates="teaching_assignments",
    )

    timetable_entries = relationship(
        "TimetableEntry",
        back_populates="assignment",
        cascade="all, delete-orphan",
    )

    def __repr__(self):
        return (
            f"<TeachingAssignment("
            f"id={self.assignment_id}, "
            f"faculty_id={self.faculty_id}, "
            f"subject_id={self.subject_id}, "
            f"section_id={self.section_id}, "
            f"weekly_periods={self.weekly_periods}"
            f")>"
        )