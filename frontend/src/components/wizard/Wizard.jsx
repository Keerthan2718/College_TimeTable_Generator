import { useState } from "react";

import Card from "../common/Card";
import WizardProgress from "./WizardProgress";
import WizardNavigation from "./WizardNavigation";

import Step1GeneralInfo from "./Step1GeneralInfo";
import Step2TimeConfig from "./Step2TimeConfig";
import Step3TeachingAssignments from "./Step3TeachingAssignments";
import Step4Constraints from "./Step4Constraints";
import Step5Review from "./Step5Review";

import { generalInfoSchema } from "../../validation/generalInfoSchema";
import { timeConfigurationSchema } from "../../validation/timeConfigurationSchema";
import { teachingAssignmentSchema } from "../../validation/teachingAssignmentSchema";


function Wizard() {
  const totalSteps = 5;

  const [currentStep, setCurrentStep] = useState(1);

  const [errors, setErrors] = useState({});

  const [wizardData, setWizardData] = useState({
    generalInfo: {
      title: "",
      department: "",
      semester: "",
      section: "",
      academicYear: "",
    },

    timeConfiguration: {
      workingDays: "",
      periodsPerDay: "",
      collegeStartTime: "",
      collegeEndTime: "",
      periodDuration: "",
      lunchStart: "",
      lunchDuration: "",
    },

    teachingAssignments: {
      theorySubjects: [],
      labSubjects: [],
      theoryWeeklyPeriods: {},
      labWeeklyPeriods: {},
      facultyAssignments: {},
    },

    constraints: [],
  });

  const nextStep = () => {

    // STEP 1 VALIDATION

    if (currentStep === 1) {

      const result = generalInfoSchema.safeParse(
        wizardData.generalInfo
      );

      if (!result.success) {

        const formattedErrors = {};

        result.error.issues.forEach((issue) => {
          formattedErrors[issue.path[0]] = issue.message;
        });

        setErrors(formattedErrors);
        return;
      }

      setErrors({});
    }

    // STEP 2 VALIDATION

    if (currentStep === 2) {

      const result = timeConfigurationSchema.safeParse(
        wizardData.timeConfiguration
      );

      if (!result.success) {

        const formattedErrors = {};

        result.error.issues.forEach((issue) => {
          formattedErrors[issue.path[0]] = issue.message;
        });

        setErrors(formattedErrors);
        return;
      }

      setErrors({});
    }

    // STEP 3 VALIDATION

    if (currentStep === 3) {

      const result = teachingAssignmentSchema.safeParse(
        wizardData.teachingAssignments
      );

      if (!result.success) {

        const formattedErrors = {};

        result.error.issues.forEach((issue) => {
          const key = issue.path.join(".");
          formattedErrors[key] = issue.message;
        });

        setErrors(formattedErrors);
        return;
      }

      setErrors({});
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {

    switch (currentStep) {

      case 1:
        return (
          <Step1GeneralInfo
            wizardData={wizardData}
            setWizardData={setWizardData}
            errors={errors}
            setErrors={setErrors}
          />
        );

      case 2:
        return (
          <Step2TimeConfig
            wizardData={wizardData}
            setWizardData={setWizardData}
            errors={errors}
            setErrors={setErrors}
          />
        );

      case 3:
        return (
          <Step3TeachingAssignments
            wizardData={wizardData}
            setWizardData={setWizardData}
            errors={errors}
            setErrors={setErrors}
          />
        );

      case 4:
        return (
          <Step4Constraints
    wizardData={wizardData}
    setWizardData={setWizardData}

/>
        );

      case 5:
        return (
          <Step5Review
            wizardData={wizardData}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card >

      <WizardProgress currentStep={currentStep} />

      {renderStep()}

      <WizardNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={nextStep}
        onPrevious={previousStep}
      />

    </Card>
  );
}


export default Wizard;