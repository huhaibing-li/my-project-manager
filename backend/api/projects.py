from fastapi import APIRouter, Depends, Query, HTTPException
from sqlmodel import Session, select
from typing import List
from ..database import engine
from ..models import Project
from ..schemas import ProjectRead, ProjectListResponse

router = APIRouter()

def get_session():
    with Session(engine) as session:
        yield session

@router.get("/projects", response_model=ProjectListResponse)
def read_projects(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    session: Session = Depends(get_session)
):
    offset = (page - 1) * size
    projects = session.exec(select(Project).offset(offset).limit(size)).all()
    total = len(session.exec(select(Project)).all())
    return ProjectListResponse(total=total, data=projects)

@router.get("/projects/{project_id}", response_model=ProjectRead)
def read_project(project_id: int, session: Session = Depends(get_session)):
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="项目未找到")
    return project