import Input from "../common/Input";
import Dropdown from "../common/Dropdown";

function Step1GeneralInfo({
  wizardData,
  setWizardData,
  errors,
  setErrors,
}) {
  const semesterOptions = [
    { value: "1", label: "Semester 1" },
    { value: "2", label: "Semester 2" },
    { value: "3", label: "Semester 3" },
    { value: "4", label: "Semester 4" },
    { value: "5", label: "Semester 5" },
    { value: "6", label: "Semester 6" },
    { value: "7", label: "Semester 7" },
    { value: "8", label: "Semester 8" },
  ];

const handleChange = (field, value) => {
  setWizardData({
    ...wizardData,
    generalInfo: {
      ...wizardData.generalInfo,
      [field]: value,
    },
  });

  if (errors[field]) {
    setErrors({
      ...errors,
      [field]: "",
    });
  }
};
  

  return (
    <div className="space-y-6">

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        General Information
      </h2>

      {/* Timetable Title */}

      <div>
        <Input
          label="Timetable Title"
          placeholder="Enter timetable title"
          value={wizardData.generalInfo.title}
          onChange={(e) =>
            handleChange("title", e.target.value)
          }
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title}
          </p>
        )}
      </div>

      {/* Department */}

      <div>
        <Input
          label="Department"
          placeholder="Enter department"
          value={wizardData.generalInfo.department}
          onChange={(e) =>
            handleChange("department", e.target.value)
          }
        />

        {errors.department && (
          <p className="text-red-500 text-sm mt-1">
            {errors.department}
          </p>
        )}
      </div>

      {/* Semester */}

      <div>
        <Dropdown
          label="Semester"
          options={semesterOptions}
          value={wizardData.generalInfo.semester}
          onChange={(e) =>
            handleChange("semester", e.target.value)
          }
        />

        {errors.semester && (
          <p className="text-red-500 text-sm mt-1">
            {errors.semester}
          </p>
        )}
      </div>

      {/* Section */}

      <div>
        <Input
          label="Section"
          placeholder="Enter section"
          value={wizardData.generalInfo.section}
          onChange={(e) =>
            handleChange("section", e.target.value)
          }
        />

        {errors.section && (
          <p className="text-red-500 text-sm mt-1">
            {errors.section}
          </p>
        )}
      </div>

      {/* Academic Year */}

      <div>
        <Input
          label="Academic Year"
          placeholder="Example: 2026-2027"
          value={wizardData.generalInfo.academicYear}
          onChange={(e) =>
            handleChange("academicYear", e.target.value)
          }
        />

        {errors.academicYear && (
          <p className="text-red-500 text-sm mt-1">
            {errors.academicYear}
          </p>
        )}
      </div>

    </div>
  );
}

export default Step1GeneralInfo;