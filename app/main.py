from fastapi import FastAPI
from sqlalchemy import text
import app.models
from app.database import Base,engine
from app.routers import auth
from app.routers.user import router as user_router
from app.routers.faculty import router as faculty_router
from app.routers.subject import router as subject_router
from app.routers.section import router as section_router
from app.routers.timetable import router as timetable_router
from app.routers.teaching_assignment import router as teaching_assignment_router
from app.routers.constraint import router as constraint_router
from app.routers.timetable_entry import router as timetable_entry_router
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()
app.include_router(user_router)
app.include_router(faculty_router)
app.include_router(subject_router)
app.include_router(section_router)
app.include_router(timetable_router)
app.include_router(auth.router)
app.include_router(teaching_assignment_router)
app.include_router(constraint_router)
app.include_router(timetable_entry_router)
print("Registered tables:")
print(Base.metadata.tables.keys())
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "https://college-time-table-generator.vercel.app",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/")
def home():
    return {"message": "Welcome to AI Timetable Generator"}


@app.get("/test-db")
def test_database():

    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {"message": "Database Connected Successfully"}