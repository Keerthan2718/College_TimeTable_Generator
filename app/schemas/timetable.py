from pydantic import BaseModel, ConfigDict, Field
from app.schemas.timetable_entry import TimetableEntryResponse


# ----------------------------
# Time Configuration
# ----------------------------

class TimeConfigurationCreate(BaseModel):
    working_days: int = Field(..., ge=1)
    periods_per_day: int = Field(..., ge=1)
    college_start_time: str
    college_end_time: str
    period_duration: int = Field(..., gt=0)
    lunch_start: str
    lunch_duration: int = Field(..., ge=0)


# ----------------------------
# Teaching Assignments
# ----------------------------

class TeachingAssignmentsCreate(BaseModel):
    theory_subjects: list[str]
    lab_subjects: list[str]

    theory_weekly_periods: dict[str, int]
    lab_weekly_periods: dict[str, int]

    faculty_assignments: dict[str, str]


# ----------------------------
# Constraints
# ----------------------------

class ConstraintCreate(BaseModel):
    constraint_type: str = Field(
        ...,
        min_length=1
    )

    subject: str | None = None

    day: str | None = None

    period: int | None = None


# ----------------------------
# Create Timetable
# ----------------------------

class TimetableCreate(BaseModel):
    title: str = Field(..., min_length=1)

    department: str = Field(..., min_length=1)

    semester: int = Field(..., ge=1, le=8)

    section: str = Field(..., min_length=1)

    academic_year: str = Field(..., min_length=1)

    

    time_configuration: TimeConfigurationCreate

    teaching_assignments: TeachingAssignmentsCreate

    constraints: list[ConstraintCreate]


# ----------------------------
# Update Timetable
# ----------------------------

class TimetableUpdate(BaseModel):
    title: str | None = Field(None, min_length=1)
    department: str | None = Field(None, min_length=1)
    semester: int | None = Field(None, ge=1, le=8)
    section: str | None = Field(None, min_length=1)
    academic_year: str | None = Field(None, min_length=1)

    time_configuration: TimeConfigurationCreate | None = None


# ----------------------------
# Response
# ----------------------------

class TimetableResponse(BaseModel):
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
    timetable_entries: list[TimetableEntryResponse]

    created_by: int

    model_config = ConfigDict(from_attributes=True)