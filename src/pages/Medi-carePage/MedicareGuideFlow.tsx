import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormData } from "../../contexts/FormDataContext";
import MediGuidePage1 from "./Medi-GuidePage-1";
import MediGuidePage2 from "./Medi-GuidePage-2";
import MediGuidePage3 from "./Medi-GuidePage-3";
import MediGuidePage4 from "./Medi-GuidePage-4";
import MediGuidePage5 from "./Medi-GuidePage-5";
import MediResult from "./Medicare-result";

const MedicareGuideFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // sessionStorage에서 현재 step 복원
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = sessionStorage.getItem('medicareCurrentStep');
    return saved ? parseInt(saved) : 1;
  });

  const { getJsonData } = useFormData();

  // currentStep이 변경될 때마다 sessionStorage에 저장
  useEffect(() => {
    sessionStorage.setItem('medicareCurrentStep', currentStep.toString());
  }, [currentStep]);

  // location.state에서 step 정보가 있으면 복원
  useEffect(() => {
    if (location.state?.returnToStep) {
      setCurrentStep(location.state.returnToStep);
      // state 초기화 (재사용 방지)
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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
      // 처음 페이지로 돌아갈 때 sessionStorage 초기화
      sessionStorage.removeItem('medicareCurrentStep');
      navigate("/medicare");
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <MediGuidePage1 onNext={handleNext} onBack={handleBack} currentStep={currentStep} />;
      case 2:
        return <MediGuidePage2 onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <MediGuidePage3 onNext={handleNext} onBack={handleBack} currentStep={currentStep} />;
      case 4:
        return <MediGuidePage4 onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <MediGuidePage5 onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <MediResult onBack={handleBack} />;
      default:
        return <MediGuidePage1 onNext={handleNext} onBack={handleBack} currentStep={currentStep} />;
    }
  };

  return renderCurrentStep();
};

export default MedicareGuideFlow;
