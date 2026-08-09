import Button from "../common/Button";

function WizardNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
}) {
  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="secondary"
        onClick={onPrevious}
        disabled={currentStep === 1}
      >
        ← Previous
      </Button>

      <Button onClick={onNext}>
        {currentStep === totalSteps ? "Finish" : "Next →"}
      </Button>
    </div>
  );
}

export default WizardNavigation;