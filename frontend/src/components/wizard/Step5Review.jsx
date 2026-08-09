import Card from "../common/Card";
import Button from "../common/Button";
import { useState } from "react";

import { createTimetablePayload } from "../../services/timetablePayload";
import { createTimetable } from "../../services/timetableService";

import {

  generateTimetable,
} from "../../services/timetableService";
import { useNavigate } from "react-router-dom";

function Step5Review({ wizardData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });
  const {
    generalInfo,
    timeConfiguration,
    teachingAssignments,
    constraints,
  } = wizardData;
  const handleGenerateTimetable = async () => {
    try {


      const payload = createTimetablePayload(wizardData);

      const timetable = await createTimetable(payload);

      await generateTimetable(timetable.timetable_id);

      navigate(
        `/generated?id=${timetable.timetable_id}`
      );




    } catch (error) {
      console.error("Error generating timetable:", error);
      alert("Failed to generate timetable.");


    }
  };
  return (
    <div className="space-y-8">

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        Review
      </h2>

      {/* General Information */}

      <Card>

        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          General Information
        </h3>

        <div className="space-y-2">

          <p>
            <strong>Title:</strong>{" "}
            {generalInfo.title || "Not Provided"}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {generalInfo.department || "Not Provided"}
          </p>

          <p>
            <strong>Semester:</strong>{" "}
            {generalInfo.semester || "Not Provided"}
          </p>

          <p>
            <strong>Academic Year:</strong>{" "}
            {generalInfo.academicYear || "Not Provided"}
          </p>

        </div>

      </Card>

      {/* Time Configuration */}

      <Card>

        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Time Configuration
        </h3>

        <div className="space-y-2">

          <p>
            <strong>Working Days:</strong>{" "}
            {timeConfiguration.workingDays || "Not Provided"}
          </p>

          <p>
            <strong>Periods Per Day:</strong>{" "}
            {timeConfiguration.periodsPerDay || "Not Provided"}
          </p>

          <p>
            <strong>College Start Time:</strong>{" "}
            {timeConfiguration.collegeStartTime || "Not Provided"}
          </p>

          <p>
            <strong>Period Duration:</strong>{" "}
            {timeConfiguration.periodDuration || "Not Provided"}
          </p>

          <p>
            <strong>Lunch Start:</strong>{" "}
            {timeConfiguration.lunchStart || "Not Provided"}
          </p>

          <p>
            <strong>Lunch Duration:</strong>{" "}
            {timeConfiguration.lunchDuration || "Not Provided"}
          </p>

        </div>

      </Card>

      {/* Teaching Assignments */}

      <Card>

        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Teaching Assignments
        </h3>

        <table className="w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">

          <thead>

            <tr className="bg-gray-100 dark:bg-gray-700">

              <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">
                Subject
              </th>

              <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">
                Faculty
              </th>

              <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">
                Weekly Periods
              </th>

            </tr>

          </thead>

          <tbody>

            {[
              ...teachingAssignments.theorySubjects,
              ...teachingAssignments.labSubjects,
            ].map((subject) => (

              <tr key={subject}>

                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  {subject}
                </td>

                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  {teachingAssignments.facultyAssignments[
                    subject
                  ] || "-"}
                </td>

                <td className="border border-gray-300 dark:border-gray-600 p-2">

                  {teachingAssignments.theoryWeeklyPeriods[
                    subject
                  ] ||

                    teachingAssignments.labWeeklyPeriods[
                    subject
                    ] ||

                    "-"}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </Card>

      {/* Constraints */}

      <Card>

        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Constraints
        </h3>

        {constraints.length === 0 ? (

          <p className="text-gray-600 dark:text-gray-400">
            No Constraints Added
          </p>

        ) : (

          <div className="space-y-3">

            {constraints.map((constraint) => (

              <div
                key={constraint.id}
                className="
                  border
                  border-gray-300
                  dark:border-gray-600
                  rounded-lg
                  p-4
                  bg-white
                  dark:bg-gray-800
                  "
              >
                <p className="font-semibold">
                  Subject unavailable at specific time
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {constraint.subject}
                  {" → "}
                  {constraint.day}
                  {" → "}
                  Period {constraint.period}
                </p>
              </div>









            ))}

          </div>

        ) }

          </Card>
      {message.text && (
          <div
            className={`rounded-lg p-4 text-sm font-medium ${message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
              }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex justify-end">

          <Button
            onClick={handleGenerateTimetable}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Timetable"}
          </Button>

        </div>

    </div>
  );
}

export default Step5Review;