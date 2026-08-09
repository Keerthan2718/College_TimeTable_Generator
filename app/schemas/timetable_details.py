from pydantic import BaseModel, ConfigDict

from app.schemas.subject import SubjectResponse
from app.schemas.faculty import FacultyResponse
from app.schemas.constraint import ConstraintResponse
from app.schemas.teaching_assignment import TeachingAssignmentResponse
from app.schemas.section import SectionResponse
from app.schemas.timetable_entry import TimetableDisplayEntryResponse, TimetableEntryResponse


class TimetableDetailsResponse(BaseModel):
    timetable_id: int
    title: str
    department: str
    semester: int
    section: str
    academic_year: str

    working_days: int
    periods_per_day: int
    college_start_time: str
    college_end_time: str
    period_duration: int
    lunch_start: str
    lunch_duration: int

    sections: list[SectionResponse]
    subjects: list[SubjectResponse]
    faculties: list[FacultyResponse]
    teaching_assignments: list[TeachingAssignmentResponse]
    constraints: list[ConstraintResponse]
    timetable_entries: list[TimetableDisplayEntryResponse]

    model_config = ConfigDict(from_attributes=True)