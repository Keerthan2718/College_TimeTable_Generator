function WizardProgress( { currentStep } ) {
  const steps = [
    "General",
    "Time",
    "Teaching",
    "Constraints",
    "Review",
  ];

  return (
    <div className="flex items-center justify-between mb-10">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        return (
          <div
            key={step}
            className="flex items-center flex-1"
          >
            {/* Circle + Label */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-12
                  h-12
                  rounded-full
                  flex
                  items-center
                  justify-center
                  font-semibold
                  transition-all
                  duration-300
                  ${
                    currentStep >= stepNumber
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }
                `}
              >
                {stepNumber}
              </div>

              <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {step}
              </span>
            </div>

            {/* Connecting Line */}
            {index !== steps.length - 1 && (
              <div
                className={`
                  flex-1
                  h-1
                  mx-3
                  rounded
                  transition-all
                  duration-300
                  ${
                    currentStep > stepNumber
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default WizardProgress;