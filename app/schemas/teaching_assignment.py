from pydantic import BaseModel, ConfigDict, Field


class TeachingAssignmentCreate(BaseModel):
    faculty_id: int
    subject_id: int
    section_id: int
    weekly_periods: int = Field(..., gt=0)


class TeachingAssignmentUpdate(BaseModel):
    faculty_id: int | None = None
    subject_id: int | None = None
    section_id: int | None = None
    weekly_periods: int | None = Field(None, gt=0)


class TeachingAssignmentResponse(BaseModel):
    assignment_id: int
    faculty_id: int
    subject_id: int
    section_id: int
    weekly_periods: int

    model_config = ConfigDict(from_attributes=True)