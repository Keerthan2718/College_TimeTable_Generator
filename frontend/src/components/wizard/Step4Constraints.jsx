import { useState } from "react";

import Button from "../common/Button";
import Card from "../common/Card";
import Dropdown from "../common/Dropdown";
import Modal from "../common/Modal";

function Step4Constraints({
  wizardData,
  setWizardData,
}) {
  const [open, setOpen] = useState(false);

  const [constraintType, setConstraintType] = useState("");
  const [subject, setSubject] = useState("");
  const [day, setDay] = useState("");
  const [period, setPeriod] = useState("");

  const [editingId, setEditingId] = useState(null);

  // --------------------------------
  // Constraint Type
  // --------------------------------

  const constraintTypeOptions = [
    {
      value: "SUBJECT_UNAVAILABLE",
      label: "Subject unavailable at specific time",
    },
  ];

  // --------------------------------
  // Subjects from Step 3
  // --------------------------------

  const subjects = [
    ...wizardData.teachingAssignments.theorySubjects,
    ...wizardData.teachingAssignments.labSubjects,
  ];

  const subjectOptions = subjects.map((subject) => ({
    value: subject,
    label: subject,
  }));

  // --------------------------------
  // Working Days from Step 2
  // --------------------------------

  const allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const workingDays = Number(
    wizardData.timeConfiguration.workingDays || 0
  );

  const dayOptions = allDays
    .slice(0, workingDays)
    .map((day) => ({
      value: day,
      label: day,
    }));

  // --------------------------------
  // Periods from Step 2
  // --------------------------------

  const periodsPerDay = Number(
    wizardData.timeConfiguration.periodsPerDay || 0
  );

  const periodOptions = Array.from(
    { length: periodsPerDay },
    (_, index) => ({
      value: String(index + 1),
      label: `Period ${index + 1}`,
    })
  );

  // --------------------------------
  // Reset Form
  // --------------------------------

  const resetForm = () => {
    setConstraintType("");
    setSubject("");
    setDay("");
    setPeriod("");
    setEditingId(null);
  };

  // --------------------------------
  // Save Constraint
  // --------------------------------

  const saveConstraint = () => {
    if (
      !constraintType ||
      !subject ||
      !day ||
      !period
    ) {
      alert("Please fill all fields");
      return;
    }

    // Prevent duplicate constraint
    const duplicate = wizardData.constraints.some(
      (constraint) =>
        constraint.type === constraintType &&
        constraint.subject === subject &&
        constraint.day === day &&
        Number(constraint.period) === Number(period) &&
        constraint.id !== editingId
    );

    if (duplicate) {
      alert("This constraint already exists.");
      return;
    }

    const newConstraint = {
      id:
        editingId !== null
          ? editingId
          : Date.now(),

      type: constraintType,

      subject: subject,

      day: day,

      period: Number(period),
    };

    // --------------------------------
    // Update Existing Constraint
    // --------------------------------

    if (editingId !== null) {
      setWizardData({
        ...wizardData,

        constraints:
          wizardData.constraints.map(
            (constraint) =>
              constraint.id === editingId
                ? newConstraint
                : constraint
          ),
      });
    }

    // --------------------------------
    // Add New Constraint
    // --------------------------------

    else {
      setWizardData({
        ...wizardData,

        constraints: [
          ...wizardData.constraints,
          newConstraint,
        ],
      });
    }

    resetForm();
    setOpen(false);
  };

  // --------------------------------
  // Edit Constraint
  // --------------------------------

  const editConstraint = (constraint) => {
    setConstraintType(
      constraint.type
    );

    setSubject(
      constraint.subject
    );

    setDay(
      constraint.day
    );

    setPeriod(
      String(constraint.period)
    );

    setEditingId(
      constraint.id
    );

    setOpen(true);
  };

  // --------------------------------
  // Delete Constraint
  // --------------------------------

  const deleteConstraint = (id) => {
    setWizardData({
      ...wizardData,

      constraints:
        wizardData.constraints.filter(
          (constraint) =>
            constraint.id !== id
        ),
    });
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Constraints
        </h2>

        <Button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
        >
          + Add Constraint
        </Button>

      </div>

      {/* Constraint List */}

      <Card>

        {wizardData.constraints.length === 0 ? (

          <p className="text-gray-500 dark:text-gray-400 text-center">
            No constraints added yet.
          </p>

        ) : (

          <div className="space-y-4">

            {wizardData.constraints.map(
              (constraint) => (

                <div
                  key={constraint.id}
                  className="
                    border
                    border-gray-300
                    dark:border-gray-600
                    bg-white
                    dark:bg-gray-800
                    text-gray-900
                    dark:text-gray-100
                    rounded-lg
                    p-4
                    flex
                    justify-between
                    items-center
                  "
                >

                  <div>

                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      Subject unavailable at specific time
                    </h4>

                    <p className="text-gray-600 dark:text-gray-400">
                      {constraint.subject}
                      {" → "}
                      {constraint.day}
                      {" → "}
                      Period {constraint.period}
                    </p>

                  </div>

                  <div className="flex gap-2">

                    <Button
                      variant="secondary"
                      onClick={() =>
                        editConstraint(
                          constraint
                        )
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() =>
                        deleteConstraint(
                          constraint.id
                        )
                      }
                    >
                      Delete
                    </Button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </Card>

      {/* Constraint Modal */}

      <Modal
        isOpen={open}
        title={
          editingId === null
            ? "Add Constraint"
            : "Edit Constraint"
        }
        onClose={() => {
          resetForm();
          setOpen(false);
        }}
      >

        <div className="space-y-4">

          {/* Constraint Type */}

          <Dropdown
            label="Constraint Type"
            value={constraintType}
            onChange={(e) =>
              setConstraintType(
                e.target.value
              )
            }
            options={
              constraintTypeOptions
            }
            placeholder="Select constraint type"
          />

          {/* Subject */}

          <Dropdown
            label="Subject"
            value={subject}
            onChange={(e) =>
              setSubject(
                e.target.value
              )
            }
            options={subjectOptions}
            placeholder="Select subject"
          />

          {/* Day */}

          <Dropdown
            label="Day"
            value={day}
            onChange={(e) =>
              setDay(
                e.target.value
              )
            }
            options={dayOptions}
            placeholder="Select day"
          />

          {/* Period */}

          <Dropdown
            label="Period"
            value={period}
            onChange={(e) =>
              setPeriod(
                e.target.value
              )
            }
            options={periodOptions}
            placeholder="Select period"
          />

          {/* Modal Buttons */}

          <div className="flex justify-end gap-3">

            <Button
              variant="secondary"
              onClick={() => {
                resetForm();
                setOpen(false);
              }}
            >
              Cancel
            </Button>

            <Button onClick={saveConstraint}>
              {editingId === null
                ? "Save"
                : "Update"}
            </Button>

          </div>

        </div>

      </Modal>

    </div>
  );
}

export default Step4Constraints;