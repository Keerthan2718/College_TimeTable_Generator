import { useState } from "react";

import Input from "../common/Input";
import Button from "../common/Button";

function Step3TeachingAssignments({
  wizardData,
  setWizardData,
  errors,
  setErrors,
}) {
  const [theoryInput, setTheoryInput] = useState("");
  const [labInput, setLabInput] = useState("");

  const addTheorySubject = () => {


    const subject = theoryInput.trim();

    if (!subject) return;

    if (
      wizardData.teachingAssignments.theorySubjects.includes(subject)
    ) {
      alert("Theory Subject already exists");
      return;
    }

    setWizardData({
      ...wizardData,
      teachingAssignments: {
        ...wizardData.teachingAssignments,
        theorySubjects: [
          ...wizardData.teachingAssignments.theorySubjects,
          subject,
        ],
      },
    });

    setTheoryInput("");
    if (errors.theorySubjects) {
      setErrors({
        ...errors,
        theorySubjects: "",
      });
    }
  };
  const deleteTheorySubject = (subjectToDelete) => {
    setWizardData({
      ...wizardData,
      teachingAssignments: {
        ...wizardData.teachingAssignments,
        theorySubjects:
          wizardData.teachingAssignments.theorySubjects.filter(
            (subject) => subject !== subjectToDelete
          ),
      },
    });
  };

  const addLabSubject = () => {

    const subject = labInput.trim();

    if (!subject) return;

    if (
      wizardData.teachingAssignments.labSubjects.includes(subject)
    ) {
      alert("Lab Subject already exists");
      return;
    }

    setWizardData({
      ...wizardData,
      teachingAssignments: {
        ...wizardData.teachingAssignments,
        labSubjects: [
          ...wizardData.teachingAssignments.labSubjects,
          subject,
        ],
      },
    });

    setLabInput("");
  };
  const deleteLabSubject = (subjectToDelete) => {
    setWizardData({
      ...wizardData,
      teachingAssignments: {
        ...wizardData.teachingAssignments,
        labSubjects:
          wizardData.teachingAssignments.labSubjects.filter(
            (subject) => subject !== subjectToDelete
          ),
      },
    });
  };
  const handleTheoryPeriods = (subject, value) => {
    setWizardData({
      ...wizardData,
      teachingAssignments: {
        ...wizardData.teachingAssignments,
        theoryWeeklyPeriods: {
          ...wizardData.teachingAssignments.theoryWeeklyPeriods,
          [subject]: value,
        },
      },
    });

    const key = `theoryWeeklyPeriods.${subject}`;

    if (errors[key]) {
      setErrors({
        ...errors,
        [key]: "",
      });
    }
  };
  const handleLabPeriods = (subject, value) => {
    setWizardData({
      ...wizardData,
      teachingAssignments: {
        ...wizardData.teachingAssignments,
        labWeeklyPeriods: {
          ...wizardData.teachingAssignments.labWeeklyPeriods,
          [subject]: value,
        },
      },
    });

    const key = `labWeeklyPeriods.${subject}`;

    if (errors[key]) {
      setErrors({
        ...errors,
        [key]: "",
      });
    }
  };
  const handleFaculty = (subject, value) => {
    setWizardData({
      ...wizardData,
      teachingAssignments: {
        ...wizardData.teachingAssignments,
        facultyAssignments: {
          ...wizardData.teachingAssignments.facultyAssignments,
          [subject]: value,
        },
      },
    });

    const key = `facultyAssignments.${subject}`;

    if (errors[key]) {
      setErrors({
        ...errors,
        [key]: "",
      });
    }
  };

  return (
    <div className="space-y-10">

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        Teaching Assignments
      </h2>

      {/* Theory Subjects */}

      <div className="space-y-4">

        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Theory Subjects
        </h3>

        <div className="flex gap-3">

          <Input
            placeholder="Enter Theory Subject"
            value={theoryInput}
            onChange={(e) => setTheoryInput(e.target.value)}
          />

          <Button onClick={addTheorySubject}>
            Add
          </Button>
          {errors.theorySubjects && (
            <p className="text-red-500 text-sm">
              {errors.theorySubjects}
            </p>
          )}

        </div>

        <ul className="space-y-2">

          {wizardData.teachingAssignments.theorySubjects.map((subject) => (

            <li
              key={subject}
              className="flex justify-between border rounded-lg p-3"
            >
              {subject}

              <Button
                variant="danger"
                onClick={() => deleteTheorySubject(subject)}
              >
                Delete
              </Button>

            </li>

          ))}

        </ul>

      </div>

      {/* Lab Subjects */}

      <div className="space-y-4">

        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Lab Subjects
        </h3>

        <div className="flex gap-3">

          <Input
            placeholder="Enter Lab Subject"
            value={labInput}
            onChange={(e) => setLabInput(e.target.value)}
          />

          <Button onClick={addLabSubject}>
            Add
          </Button>

        </div>

        <ul className="space-y-2">

          {wizardData.teachingAssignments.labSubjects.map((subject) => (

            <li
              key={subject}
              className="flex justify-between border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-3"
            >
              {subject}

              <Button
                variant="danger"
                onClick={() => deleteLabSubject(subject)}
              >
                Delete
              </Button>

            </li>

          ))}

        </ul>

      </div>

      {/* Weekly Periods */}

      <div className="space-y-4">

        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
         Theory Weekly Periods
        </h3>

        {wizardData.teachingAssignments.theorySubjects.map((subject) => (

          <div
            key={subject}
            className="grid grid-cols-2 gap-4"
          >

            <p className="font-medium text-gray-900 dark:text-gray-100">
              {subject}
            </p>

            <Input
              type="number"
              placeholder="Periods"
              value={
                wizardData.teachingAssignments.theoryWeeklyPeriods[subject] || ""
              }
              onChange={(e) =>
                handleTheoryPeriods(subject, e.target.value)
              }
            />
            {errors[`theoryWeeklyPeriods.${subject}`] && (
              <p className="text-red-500 text-sm">
                {errors[`theoryWeeklyPeriods.${subject}`]}
              </p>
            )}

          </div>

        ))}

      </div>

      {/* Lab Weekly Periods */}

      <div className="space-y-4">

        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Lab Weekly Periods
        </h3>

        {wizardData.teachingAssignments.labSubjects.map((subject) => (

          <div
            key={subject}
            className="grid grid-cols-2 gap-4"
          >

            <p className="font-medium text-gray-900 dark:text-gray-100">
              {subject}
            </p>

            <Input
              type="number"
              placeholder="Periods"
              value={
                wizardData.teachingAssignments.labWeeklyPeriods[subject] || ""
              }
              onChange={(e) =>
                handleLabPeriods(subject, e.target.value)
              }
            />
            {errors[`labWeeklyPeriods.${subject}`] && (
              <p className="text-red-500 text-sm">
                {errors[`labWeeklyPeriods.${subject}`]}
              </p>
            )}
          </div>

        ))}

      </div>

      {/* Faculty Assignment */}

      <div className="space-y-4">

        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Faculty Assignment
        </h3>

        {[
          ...wizardData.teachingAssignments.theorySubjects,
          ...wizardData.teachingAssignments.labSubjects,
        ].map((subject) => (

          <div
            key={subject}
            className="grid grid-cols-2 gap-4"
          >

            <p className="font-medium text-gray-900 dark:text-gray-100">
              {subject}
            </p>

            <Input
              placeholder="Faculty Name"
              value={
                wizardData.teachingAssignments.facultyAssignments[subject] || ""
              }
              onChange={(e) =>
                handleFaculty(
                  subject, e.target.value)
              }
            />
            {errors[`facultyAssignments.${subject}`] && (
              <p className="text-red-500 text-sm">
                {errors[`facultyAssignments.${subject}`]}
              </p>
            )}
          </div>

        ))}

      </div>

    </div>
  );
}

export default Step3TeachingAssignments;