from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class TimetableEntry(Base):
    __tablename__ = "timetable_entries"

    entry_id = Column(Integer, primary_key=True, index=True)

    timetable_id = Column(
        Integer,
        ForeignKey("timetables.timetable_id"),
        nullable=False,
        index=True,
    )

    day = Column(String(20), nullable=False)

    period = Column(Integer, nullable=False)

    assignment_id = Column(
        Integer,
        ForeignKey("teaching_assignments.assignment_id"),
        nullable=False,
        index=True,
    )

    room = Column(String(50), nullable=True)

    # Relationship with Timetable
    timetable = relationship(
        "Timetable",
        back_populates="timetable_entries"
    )

    # Relationship with TeachingAssignment
    assignment = relationship(
        "TeachingAssignment",
        back_populates="timetable_entries"
    )