from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Timetable(Base):
    __tablename__ = "timetables"

    timetable_id = Column(Integer, primary_key=True, index=True)

    title = Column(String(100), nullable=False)

    department = Column(String(100), nullable=False)

    semester = Column(Integer, nullable=False)

    section = Column(String(20), nullable=False)

    academic_year = Column(String(20), nullable=False)

    working_days = Column(Integer, nullable=False)

    periods_per_day = Column(Integer, nullable=False)

    college_start_time = Column(String(10), nullable=False)

    college_end_time = Column(String(10), nullable=False)

    period_duration = Column(Integer, nullable=False)

    lunch_start = Column(String(10), nullable=False)

    lunch_duration = Column(Integer, nullable=False)

    created_by = Column(
        Integer,
        ForeignKey("users.user_id"),
        nullable=False,
        index=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    user = relationship("User", back_populates="timetables")

    sections = relationship(
        "Section",
        back_populates="timetable",
        cascade="all, delete-orphan",
    )

    faculties = relationship(
        "Faculty",
        back_populates="timetable",
        cascade="all, delete-orphan",
    )

    subjects = relationship(
        "Subject",
        back_populates="timetable",
        cascade="all, delete-orphan",
    )

    constraints = relationship(
        "Constraint",
        back_populates="timetable",
        cascade="all, delete-orphan",
    )

    timetable_entries = relationship(
        "TimetableEntry",
        back_populates="timetable",
        cascade="all, delete-orphan",
    )