from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Constraint(Base):
    __tablename__ = "constraints"

    constraint_id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    timetable_id = Column(
        Integer,
        ForeignKey("timetables.timetable_id"),
        nullable=False,
    )

    constraint_type = Column(
        String(100),
        nullable=False,
    )

    subject = Column(
        String(100),
        nullable=True,
    )

    day = Column(
        String(20),
        nullable=True,
    )

    period = Column(
        Integer,
        nullable=True,
    )

    timetable = relationship(
        "Timetable",
        back_populates="constraints",
    )

    def __repr__(self):
        return (
            f"<Constraint("
            f"id={self.constraint_id}, "
            f"type='{self.constraint_type}', "
            f"subject='{self.subject}', "
            f"day='{self.day}', "
            f"period={self.period}"
            f")>"
        )