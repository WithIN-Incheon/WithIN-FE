import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import { useLocalization } from "../../contexts/LocalizationContext";
import "./MedicarePage.css";

const MedicarePage = () => {
    const navigate = useNavigate();
    const { resetFormData } = useFormData();
    const { t } = useLocalization();

    // 컴포넌트 마운트 시 폼 데이터와 currentStep 초기화
    useEffect(() => {
        resetFormData();
        sessionStorage.removeItem('medicareCurrentStep');
    }, []);

    const handleGuideStart = () => {
        navigate("/medicare-guide-flow");
    };

    const handleHome = () => {
        resetFormData();
        navigate("/home");
    };

    return (
        <div className="app">
            <Header title={t('guidePractice')} onBack={handleHome}/>
            <div className="medi-hero">
                <div className="medi-intro">
                    <div className="medi-intro-title">
                        최초 요양 급여 신청서<br/>
                        작성법을 연습해보세요!<br/>
                    </div>
                    <img className="medi-intro-img" src="/Medicare/medicare-apply.svg"/>
                </div>
            </div>
            <div className="medi-content">
                <div className="medi-content-buttons">
                    <div className="medi-content-button" onClick={handleGuideStart}>
                        <img className="medi-content-button-img" src="/Medicare/File.svg"/>
                        <span className="medi-content-button-text">{t('practiceWrite')}</span>
                    </div>
                    <div className="medi-content-description">
                        <div className="info-lines">
                            <div>✔️ {t('practiceExplain')}</div><br />
                            <div>✔️ {t('practicePass')}</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 저장하기 버튼을 하단에 고정 */}
            <BottomBar />
        </div>
    )
}

export default MedicarePage;