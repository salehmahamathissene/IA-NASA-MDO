from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from ...core.firebase import get_db
import uuid
from datetime import datetime

router = APIRouter()

class ProjectBase(BaseModel):
    name: str
    manufacturer: str = "IA-NASA"
    pax: int
    mtow: float
    range_km: float

class Project(ProjectBase):
    id: str
    status: str = "Draft"
    version: str = "v0.1"
    created_at: str


@router.get("/")
async def list_projects():
    projects = []
    docs = get_db().collection("projects").stream()
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        projects.append(data)
    return projects


@router.post("/")
async def create_project(project: ProjectBase):
    project_data = project.model_dump()
    project_id = str(uuid.uuid4())
    
    project_ref = get_db().collection("projects").document(project_id)
    project_ref.set({
        **project_data,
        "status": "Draft",
        "version": "v0.1",
        "created_at": datetime.utcnow().isoformat()
    })
    
    return {"id": project_id, **project_data, "status": "Draft", "version": "v0.1"}