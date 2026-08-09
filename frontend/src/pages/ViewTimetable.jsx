import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TimetableGrid from "../components/timetable/TimetableGrid";

import Card from "../components/common/Card";
import { getTimetableDetails } from "../services/timetableService";
import ExportButtons from "../components/timetable/ExportButtons";

function ViewTimetable() {
  const [searchParams] = useSearchParams();

  const timetableId = searchParams.get("id");

  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const data = await getTimetableDetails(timetableId);
      setTimetable(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
        Loading...
      </div>
    );
  }

  if (!timetable) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
        Timetable not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">

      <h1 className="text-4xl font-bold">
        {timetable.title}
      </h1>
       <ExportButtons timetable={timetable} />
      </div>

      <Card>

        <h2 className="text-2xl font-semibold mb-4">
          General Information
        </h2>

        <div className="space-y-2">
          <p>
            <strong>Department:</strong> {timetable.department}
          </p>

          <p>
            <strong>Semester:</strong> {timetable.semester}
          </p>

          <p>
            <strong>Section:</strong> {timetable.section}
          </p>

          <p>
            <strong>Academic Year:</strong> {timetable.academic_year}
          </p>
        </div>

      </Card>

      <Card>

        <h2 className="text-2xl font-semibold mb-4">
          Time Configuration
        </h2>

        <div className="space-y-2">
          <p>
            <strong>Working Days:</strong> {timetable.working_days}
          </p>

          <p>
            <strong>Periods Per Day:</strong> {timetable.periods_per_day}
          </p>

          <p>
            <strong>College Start:</strong> {timetable.college_start_time}
          </p>

          <p>
            <strong>College End:</strong> {timetable.college_end_time}
          </p>

          <p>
            <strong>Period Duration:</strong> {timetable.period_duration}
          </p>

          <p>
            <strong>Lunch Start:</strong> {timetable.lunch_start}
          </p>

          <p>
            <strong>Lunch Duration:</strong> {timetable.lunch_duration}
          </p>
        </div>

      </Card>

      <Card>

        <h2 className="text-2xl font-semibold mb-4">
          Subjects
        </h2>

        <ul className="space-y-2">

          {timetable.subjects.map((subject) => (
            <li key={subject.subject_id}>
              {subject.subject_name} ({subject.subject_type})
            </li>
          ))}

        </ul>

      </Card>

      <Card>

        <h2 className="text-2xl font-semibold mb-4">
          Faculties
        </h2>

        <ul className="space-y-2">

          {timetable.faculties.map((faculty) => (
            <li key={faculty.faculty_id}>
              {faculty.faculty_name}
            </li>
          ))}

        </ul>

      </Card>

      <Card>

        <h2 className="text-2xl font-semibold mb-4">
          Constraints
        </h2>

        {timetable.constraints.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No Constraints
          </p>
        ) : (
          <div className="space-y-2">

            {timetable.constraints.map((constraint) => (
              <div
                key={constraint.constraint_id}
                className="border border-gray-300 dark:border-gray-600 rounded-lg p-4"
                >
                  <p className="font-semibold">
                    {constraint.constraint_type}
                  </p>
                           {constraint.constraint_type === "SUBJECT_UNAVAILABLE" && (
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {constraint.subject} cannot be scheduled on{" "}
                            {constraint.day}, Period {constraint.period}
                          </p>
                        )}
                        </div>
            ))}
            </div>
        )}
        

 

      </Card>

      <Card className="overflow-x-auto">
        <TimetableGrid
          workingDays={timetable.working_days}
          periodsPerDay={timetable.periods_per_day}
          collegeStartTime={timetable.college_start_time}
          periodDuration={timetable.period_duration}
          lunchStart={timetable.lunch_start}
          lunchDuration={timetable.lunch_duration}
          entries={timetable.timetable_entries || []}
        />
      </Card>

    </div>
  );
}

export default ViewTimetable;