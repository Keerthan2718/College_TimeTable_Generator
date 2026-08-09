from pydantic import BaseModel, ConfigDict, Field


class ConstraintCreate(BaseModel):
    timetable_id: int

    constraint_type: str = Field(
        ...,
        min_length=1
    )

    subject: str | None = None

    day: str | None = None

    period: int | None = None


class ConstraintUpdate(BaseModel):

    constraint_type: str | None = Field(
        None,
        min_length=1
    )

    subject: str | None = None

    day: str | None = None

    period: int | None = None


class ConstraintResponse(BaseModel):

    constraint_id: int

    timetable_id: int

    constraint_type: str

    subject: str | None = None

    day: str | None = None

    period: int | None = None

    model_config = ConfigDict(
        from_attributes=True
    )