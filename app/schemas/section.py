from pydantic import BaseModel, ConfigDict, Field


class SectionCreate(BaseModel):
    timetable_id: int
    section_name: str = Field(..., min_length=1)
    strength: int = Field(..., gt=0)

class SectionUpdate(BaseModel):
    section_name: str | None = Field(None, min_length=1)
    strength: int | None = Field(None, gt=0)

class SectionResponse(BaseModel):
    section_id: int
    timetable_id: int
    section_name: str
    strength: int

    model_config = ConfigDict(from_attributes=True)