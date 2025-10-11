import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormDataProvider, useFormData } from "../../contexts/FormDataContext";
import MediGuidePage1 from "./Medi-GuidePage-1";
import MediGuidePage2 from "./Medi-GuidePage-2";
import MediGuidePage3 from "./Medi-GuidePage-3";
import MediGuidePage4 from "./Medi-GuidePage-4";
import MediGuidePage5 from "./Medi-GuidePage-5";
import MediResult from "./Medicare-result";

const MedicareGuideFlowContent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { getJsonData } = useFormData();

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      // 마지막 단계로 이동
      setCurrentStep(6);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/medicare");
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <MediGuidePage1 onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <MediGuidePage2 onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <MediGuidePage3 onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <MediGuidePage4 onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <MediGuidePage5 onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <MediResult />;
      default:
        return <MediGuidePage1 onNext={handleNext} onBack={handleBack} />;
    }
  };

  return renderCurrentStep();
};

const MedicareGuideFlow = () => {
  return (
    <FormDataProvider>
      <MedicareGuideFlowContent />
    </FormDataProvider>
  );
};

export default MedicareGuideFlow;
