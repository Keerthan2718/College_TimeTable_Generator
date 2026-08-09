from pydantic import BaseModel, ConfigDict, Field


class SubjectCreate(BaseModel):
    timetable_id: int
    subject_name: str = Field(..., min_length=1)
    subject_type: str = Field(..., min_length=1)


class SubjectUpdate(BaseModel):
    subject_name: str | None = Field(None, min_length=1)
    subject_type: str | None = Field(None, min_length=1)

class SubjectResponse(BaseModel):
    subject_id: int
    timetable_id: int
    subject_name: str
    subject_type: str

    model_config = ConfigDict(from_attributes=True)