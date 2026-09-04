# 📅 College Timetable Generator

A full-stack web application designed to help college timetable coordinators create, manage, and generate timetables based on academic requirements, faculty assignments, working hours, and scheduling constraints.

The application provides a guided timetable creation workflow so coordinators can enter their requirements, generate a timetable, view previously created timetables, and export the final schedule.

---

## 🚀 Features

### 📋 Guided Timetable Creation

The application uses a multi-step wizard to collect timetable requirements.

The coordinator can enter:

* Department
* Semester
* Section
* Working days
* Start and end time
* Period duration
* Lunch break
* Short breaks
* Theory subjects
* Laboratory subjects
* Faculty details
* Weekly periods required for each subject
* Scheduling constraints

---

### 🧩 Constraint-Based Scheduling

The timetable generation process considers scheduling requirements and constraints such as:

* Faculty availability
* Section conflicts
* Subject requirements
* Weekly period requirements
* Break and lunch periods
* Custom scheduling restrictions

The goal is to generate a timetable that satisfies the provided requirements while avoiding scheduling conflicts.

---

### 📊 Timetable Management

Users can:

* Create new timetables
* View previously generated timetables
* Open individual timetables
* Review generated schedules
* Export the timetable

---

## 🔄 Application Workflow

```text
                    User
                     │
                     ▼
              ┌──────────────┐
              │   Dashboard  │
              └──────┬───────┘
                     │
            ┌────────┴────────┐
            ▼                 ▼
     Create Timetable    View Timetables
            │                 │
            ▼                 ▼
       Wizard              Select
            │              Timetable
            ▼                 │
       Requirements           │
            │                 │
            ▼                 ▼
        Validation       Timetable View
            │
            ▼
   Timetable Generation
            │
            ▼
    Generated Timetable
            │
            ▼
          Export
```

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │        User         │
                         │ Timetable Coordinator│
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │                     │
                         │  Dashboard          │
                         │  Wizard             │
                         │  Timetable View     │
                         │  Export             │
                         └──────────┬──────────┘
                                    │
                                  REST API
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   FastAPI Backend   │
                         │                     │
                         │ API Routes           │
                         │ Services             │
                         │ Validation           │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Scheduling Engine   │
                         │                     │
                         │ Constraints         │
                         │ Conflict Handling   │
                         │ Schedule Generation │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     PostgreSQL      │
                         │      Database       │
                         └─────────────────────┘
```

---

# 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic

### Database

* PostgreSQL

### Scheduling

* Google OR-Tools

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: PostgreSQL

---

# 📝 Timetable Creation Wizard

The timetable creation process is divided into multiple steps.

### Step 1 – General Information

The coordinator enters:

* Department
* Semester
* Section

### Step 2 – Time Configuration

The coordinator defines:

* Start time
* End time
* Period duration
* Lunch break
* Short breaks

### Step 3 – Subjects & Faculty

The coordinator enters:

* Theory subjects
* Laboratory subjects
* Faculty details
* Weekly periods required for each subject

### Step 4 – Constraints

The coordinator specifies scheduling restrictions such as faculty or class availability.

### Step 5 – Review

All entered information is summarized before timetable generation.

The coordinator can then generate the timetable.

---

# 🗄️ Database Design

The application uses PostgreSQL to store timetable-related information.

Main entities include:

```text
User
Timetable
Section
Faculty
Subject
TeachingAssignment
Constraint
TimetableEntry
```

### Teaching Assignment

The `TeachingAssignment` entity connects the major scheduling components:

```text
Faculty
   +
Subject
   +
Section
   +
Weekly Period Requirement
```

For example:

```text
Professor John
      │
      ▼
     DBMS
      │
      ▼
   Section A
      │
      ▼
5 periods / week
```

This structure allows the scheduler to work with actual teaching assignments when generating the timetable.

---

# 💻 Getting Started

## Prerequisites

Make sure you have installed:

* Python 3.x
* Node.js
* PostgreSQL
* Git

---

# ⚙️ Backend Setup

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file and configure the required environment variables:

```env
DATABASE_URL=your_database_url
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

The FastAPI development server will start locally.

---

# 🎨 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite.

---


# 🔮 Future Improvements

Potential future improvements include:

* AI-powered natural-language timetable modifications
* Drag-and-drop timetable editing
* Automatic conflict resolution suggestions
* Classroom and laboratory allocation
* Faculty workload analysis
* Student timetable generation
* Timetable comparison
* Version history and undo/redo
* Advanced soft-constraint optimization
* Role-based access control
* Notifications
* Mobile-friendly timetable views

> **Note:** AI-powered timetable modification is currently a planned future feature and is **not implemented in the current version**.

---

# 🎯 Learning Outcomes

This project provided practical experience with:

* Full-stack web application development
* REST API development
* Database design
* PostgreSQL
* SQLAlchemy ORM
* FastAPI
* React
* Pydantic validation
* Constraint-based scheduling
* Scheduling algorithms
* Frontend and backend integration
* API communication
* Deployment
* Git and GitHub

---

# 👨‍💻 Project Summary

**College Timetable Generator** is a full-stack scheduling application built to simplify the process of creating college timetables.

The project combines:

**React + FastAPI + PostgreSQL + Constraint-Based Scheduling**

The main objective is to reduce the manual effort involved in timetable creation while respecting faculty, section, subject, time, and scheduling constraints.
