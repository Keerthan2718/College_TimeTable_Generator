from pydantic import BaseModel, ConfigDict, Field


class FacultyCreate(BaseModel):
    timetable_id: int
    faculty_name: str = Field(..., min_length=1)
    max_periods_per_week: int = Field(..., gt=0)

class FacultyUpdate(BaseModel):
    faculty_name: str | None = Field(None, min_length=1)
    max_periods_per_week: int | None = Field(None, gt=0)

class FacultyResponse(BaseModel):
    faculty_id: int
    timetable_id: int
    faculty_name: str
    max_periods_per_week: int

    model_config = ConfigDict(from_attributes=True)