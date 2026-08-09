import Input from "../common/Input";
import Dropdown from "../common/Dropdown";

function Step2TimeConfig({
  wizardData,
  setWizardData,
  errors,
  setErrors,
}) {
  const workingDayOptions = [
    { value: "5", label: "5 Days" },
    { value: "6", label: "6 Days" },
    { value: "7", label: "7 Days" },
  ];

  const periodsOptions = [
    { value: "6", label: "6 Periods" },
    { value: "7", label: "7 Periods" },
    { value: "8", label: "8 Periods" },
    { value: "9", label: "9 Periods" },
  ];

  const handleChange = (field, value) => {
    setWizardData({
      ...wizardData,
      timeConfiguration: {
        ...wizardData.timeConfiguration,
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
        Time Configuration
      </h2>

      {/* Working Days */}

      <div>
        <Dropdown
          label="Working Days"
          options={workingDayOptions}
          value={wizardData.timeConfiguration.workingDays}
          onChange={(e) =>
            handleChange("workingDays", e.target.value)
          }
        />

        {errors.workingDays && (
          <p className="text-red-500 text-sm mt-1">
            {errors.workingDays}
          </p>
        )}
      </div>

      {/* Periods Per Day */}

      <div>
        <Dropdown
          label="Periods Per Day"
          options={periodsOptions}
          value={wizardData.timeConfiguration.periodsPerDay}
          onChange={(e) =>
            handleChange("periodsPerDay", e.target.value)
          }
        />

        {errors.periodsPerDay && (
          <p className="text-red-500 text-sm mt-1">
            {errors.periodsPerDay}
          </p>
        )}
      </div>

      {/* College Start Time */}

      <div>
        <Input
          label="College Start Time"
          type="time"
          value={wizardData.timeConfiguration.collegeStartTime}
          onChange={(e) =>
            handleChange("collegeStartTime", e.target.value)
          }
        />

        {errors.collegeStartTime && (
          <p className="text-red-500 text-sm mt-1">
            {errors.collegeStartTime}
          </p>
        )}
      </div>

      {/* College End Time */}

      <div>
        <Input
          label="College End Time"
          type="time"
          value={wizardData.timeConfiguration.collegeEndTime}
          onChange={(e) =>
            handleChange("collegeEndTime", e.target.value)
          }
        />

        {errors.collegeEndTime && (
          <p className="text-red-500 text-sm mt-1">
            {errors.collegeEndTime}
          </p>
        )}
      </div>

      {/* Period Duration */}

      <div>
        <Input
          label="Period Duration (Minutes)"
          type="number"
          value={wizardData.timeConfiguration.periodDuration}
          onChange={(e) =>
            handleChange("periodDuration", e.target.value)
          }
        />

        {errors.periodDuration && (
          <p className="text-red-500 text-sm mt-1">
            {errors.periodDuration}
          </p>
        )}
      </div>

      {/* Lunch Break Start */}

      <div>
        <Input
          label="Lunch Break Start"
          type="time"
          value={wizardData.timeConfiguration.lunchStart}
          onChange={(e) =>
            handleChange("lunchStart", e.target.value)
          }
        />

        {errors.lunchStart && (
          <p className="text-red-500 text-sm mt-1">
            {errors.lunchStart}
          </p>
        )}
      </div>

      {/* Lunch Break Duration */}

      <div>
        <Input
          label="Lunch Break Duration (Minutes)"
          type="number"
          value={wizardData.timeConfiguration.lunchDuration}
          onChange={(e) =>
            handleChange("lunchDuration", e.target.value)
          }
        />

        {errors.lunchDuration && (
          <p className="text-red-500 text-sm mt-1">
            {errors.lunchDuration}
          </p>
        )}
      </div>

    </div>
  );
}

export default Step2TimeConfig;