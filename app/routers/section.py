from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.section import (
    SectionCreate,
    SectionUpdate,
    SectionResponse
)
from app.services import section as section_service

router = APIRouter(
    prefix="/sections",
    tags=["Sections"]
)


@router.post("/", response_model=SectionResponse)
def create_section(
    section: SectionCreate,
    db: Session = Depends(get_db)
):
    return section_service.create_section(db, section)


@router.get("/", response_model=list[SectionResponse])
def get_all_sections(
    db: Session = Depends(get_db)
):
    return section_service.get_all_sections(db)


@router.get("/{section_id}", response_model=SectionResponse)
def get_section(
    section_id: int,
    db: Session = Depends(get_db)
):
    section = section_service.get_section(db, section_id)

    if not section:
        raise HTTPException(status_code=404, detail="Section not found")

    return section


@router.put("/{section_id}", response_model=SectionResponse)
def update_section(
    section_id: int,
    section: SectionUpdate,
    db: Session = Depends(get_db)
):
    updated_section = section_service.update_section(
        db,
        section_id,
        section
    )

    if not updated_section:
        raise HTTPException(status_code=404, detail="Section not found")

    return updated_section


@router.delete("/{section_id}", response_model=SectionResponse)
def delete_section(
    section_id: int,
    db: Session = Depends(get_db)
):
    deleted_section = section_service.delete_section(
        db,
        section_id
    )

    if not deleted_section:
        raise HTTPException(status_code=404, detail="Section not found")

    return deleted_section