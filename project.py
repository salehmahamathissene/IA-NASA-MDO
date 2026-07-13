from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..core.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    manufacturer = Column(String, default="IA-NASA")
    pax = Column(Integer)
    mtow = Column(Float)          # tons
    range_km = Column(Float)
    status = Column(String, default="Draft")
    version = Column(String, default="v0.1")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    simulations = relationship("Simulation", back_populates="project")


class Simulation(Base):
    __tablename__ = "simulations"

    id = Column(String, primary_key=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"))
    name = Column(String)
    type = Column(String)  # CFD, MDO, etc.
    status = Column(String)
    progress = Column(Float, default=0.0)
    started_at = Column(DateTime(timezone=True), server_default=func.now())

    project = relationship("Project", back_populates="simulations")