from pydantic import BaseModel, ConfigDict, Field


class TimetableEntryCreate(BaseModel):
    timetable_id: int
    day: str = Field(..., min_length=1)
    period: int = Field(..., gt=0)
    assignment_id: int
    room: str | None = None

class TimetableEntryUpdate(BaseModel):
    day: str | None = Field(None, min_length=1)
    period: int | None = Field(None, gt=0)
    assignment_id: int | None = None
    room: str | None = None

class TimetableEntryResponse(BaseModel):
    entry_id: int
    day: str
    period: int
    timetable_id: int
    assignment_id: int

    room: str | None

    model_config = ConfigDict(from_attributes=True)

class TimetableDisplayEntryResponse(BaseModel):
    entry_id: int
    day: str
    period: int
    subject: str
    faculty: str
    room: str | None