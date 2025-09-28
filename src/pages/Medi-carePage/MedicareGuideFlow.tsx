import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MediGuidePage1 from "./Medi-GuidePage-1";
import MediGuidePage2 from "./Medi-GuidePage-2";
import MediGuidePage3 from "./Medi-GuidePage-3";
import MediGuidePage4 from "./Medi-GuidePage-4";
import MediGuidePage5 from "./Medi-GuidePage-5";
import MediGuidePage6 from "./Medi-GuidePage-6";
import MediResult from "./Medicare-result";
const MedicareGuideFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      // 모든 단계 완료
      navigate("/medicare");
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
        return <MediGuidePage6 onNext={handleNext} onBack={handleBack} />;
      case 7:
        return <MediResult />;
      default:
        return <MediGuidePage1 onNext={handleNext} onBack={handleBack} />;
    }
  };

  return renderCurrentStep();
};

export default MedicareGuideFlow;
