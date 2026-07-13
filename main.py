from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .core.config import settings
from .core.database import Base, engine
from .api.v1.api import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 IA-NASA-MDO Backend starting...")
    Base.metadata.create_all(bind=engine)   # Create tables
    yield
    print("⏹️ IA-NASA-MDO Backend shutting down...")


app = FastAPI(title="IA-NASA-MDO API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"message": "IA-NASA-MDO API is running"}