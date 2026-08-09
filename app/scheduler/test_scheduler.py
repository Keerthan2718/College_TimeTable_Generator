from app.database import SessionLocal
from app.scheduler.scheduler import TimetableScheduler

db = SessionLocal()

scheduler = TimetableScheduler(
    db=db,
    timetable_id=62,  # Replace with the actual timetable_id you want to test
)

scheduler.generate()

db.close()