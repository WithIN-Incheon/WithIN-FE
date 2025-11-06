import { useState, useEffect } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import { useLocalization } from "../../contexts/LocalizationContext";
import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import MediPopup from "./Medi-popup";
import "./Medi-GuidePage-4.css";
import "./Medi-popup.css";

interface MediGuidePage4Props {
    onNext?: () => void;
    onBack?: () => void;
}

const MediGuidePage4 = ({ onNext, onBack }: MediGuidePage4Props) => {
    const { formData, updateFormData } = useFormData();
    const { t } = useLocalization();
    
    const [disasterDetails, setDisasterDetails] = useState(formData.acci_desc || "");
    const [policeReport, setPoliceReport] = useState<string>(formData.police_check || "");
    const [emergencyReport, setEmergencyReport] = useState<string>(formData.fire_check || "");
    const [insuranceReport, setInsuranceReport] = useState<string>(formData.insur_check || "");
    
    // 팝업 상태 관리
    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState("");
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    // 팝업이 표시되면 5초 후에 자동으로 사라지게 하기
    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 5000); // 5초 후 팝업 닫기

            return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
        }
    }, [showPopup]);

    // 모든 라디오 버튼이 선택되었는지 확인
    const isButtonDisabled = policeReport === "" || emergencyReport === "" || insuranceReport === "";

    const handleNext = () => {
        updateFormData({
            acci_desc: disasterDetails,
            police_check: policeReport,
            fire_check: emergencyReport,
            insur_check: insuranceReport
        });
        
        onNext?.();
    };

    // 팝업 핸들러
    const handleInfoClick = (text: string, event: React.MouseEvent<HTMLImageElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPopupPosition({
            top: rect.top - 10,
            left: rect.right + 10
        });
        setPopupText(text);
        setShowPopup(true);
    };

    // 팝업 닫기
    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="app">
            <Header title={t('guidePractice')} onBack={onBack} showHomebtn={true}/>
            <div className="medi-guide-title">
                <h2>{t('applyInfo2')}</h2>
            </div>
            
            <div className="medi-4-form-container">
                <div className="medi-4-section-header">
                    <h3>{t('applyReason')}</h3>
                    <img 
                        src="/info_square.png" 
                        alt="info-icon" 
                        onClick={(e) => handleInfoClick(t('popupReason'), e)}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <p className="medi-4-instruction-text">
                    {t('applyRecommend')}
                </p>
                
                <div className="medi-4-text-input-container">
                    <textarea
                        className="medi-4-disaster-details-input"
                        value={disasterDetails}
                        onChange={(e) => setDisasterDetails(e.target.value)}
                        placeholder=""
                        maxLength={1000}
                    />
                    <div className="medi-4-character-count">
                        {disasterDetails.length}/1000
                    </div>
                </div>

                <div className="medi-4-question-container">
                    <div className="medi-4-question">
                        <p>{t('applyFactPolice')}</p>
                        <div className="medi-4-radio-group">
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="policeReport"
                                    value="0"
                                    checked={policeReport === "0"}
                                    onChange={(e) => setPoliceReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">{t('applyYes')}</span>
                            </label>
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="policeReport"
                                    value="1"
                                    checked={policeReport === "1"}
                                    onChange={(e) => setPoliceReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">{t('applyNo')}</span>
                            </label>
                        </div>
                    </div>

                    <div className="medi-4-question">
                        <p>{t('applyFact119')}</p>
                        <div className="medi-4-radio-group">
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="emergencyReport"
                                    value="0"
                                    checked={emergencyReport === "0"}
                                    onChange={(e) => setEmergencyReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">{t('applyYes')}</span>
                            </label>
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="emergencyReport"
                                    value="1"
                                    checked={emergencyReport === "1"}
                                    onChange={(e) => setEmergencyReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">{t('applyNo')}</span>
                            </label>
                        </div>
                    </div>

                    <div className="medi-4-question">
                        <p>{t('applyFactCar')}</p>
                        <div className="medi-4-radio-group">
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="insuranceReport"
                                    value="0"
                                    checked={insuranceReport === "0"}
                                    onChange={(e) => setInsuranceReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">{t('applyYes')}</span>
                            </label>
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="insuranceReport"
                                    value="1"
                                    checked={insuranceReport === "1"}
                                    onChange={(e) => setInsuranceReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">{t('applyNo')}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="medi-4-save-button-container">
                <ContinueButton 
                    text={t('applyNext')} 
                    onClick={handleNext} 
                />
            </div>
            
            {/* 팝업 렌더링 */}
            {showPopup && (
                <div 
                    className="popup-overlay" 
                    onClick={handleClosePopup}
                >
                    <div 
                        className="popup-container"
                        style={{
                            position: 'fixed',
                            top: `${popupPosition.top}px`,
                            left: `${popupPosition.left}px`,
                            zIndex: 1000
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MediPopup text={popupText} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediGuidePage4;