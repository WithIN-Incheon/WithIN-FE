import { useState } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import "./Medi-GuidePage-4.css";

interface MediGuidePage4Props {
    onNext?: () => void;
    onBack?: () => void;
}

const MediGuidePage4 = ({ onNext, onBack }: MediGuidePage4Props) => {
    const { formData, updateFormData } = useFormData();
    
    const [disasterDetails, setDisasterDetails] = useState(formData.acci_desc || "");
    const [policeReport, setPoliceReport] = useState<string>(formData.police_check || "");
    const [emergencyReport, setEmergencyReport] = useState<string>(formData.fire_check || "");
    const [insuranceReport, setInsuranceReport] = useState<string>(formData.insur_check || "");

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

    return (
        <div className="app">
            <Header title="최초 요양 급여 신청서 연습" onBack={onBack} showHomebtn={true}/>
            <div className="medi-guide-title">
                <h2>정보를 입력해 주세요.</h2>
            </div>
            
            <div className="medi-4-form-container">
                <div className="medi-4-section-header">
                    <h3>재해 발생 경위 </h3>
                    <img src="/info_square.png" alt="info-icon" />
                </div>
                <p className="medi-4-instruction-text">
                    내용이 많은 경우 다른 종이에 적으시는 걸 추천드립니다.
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
                        <p>① 위 재해와 관련하여 교통사고, 음주, 폭행 등의 사유로 경찰서에 신고(접수)된 사실이 있습니까?</p>
                        <div className="medi-4-radio-group">
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="policeReport"
                                    value="0"
                                    checked={policeReport === "0"}
                                    onChange={(e) => setPoliceReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">예</span>
                            </label>
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="policeReport"
                                    value="1"
                                    checked={policeReport === "1"}
                                    onChange={(e) => setPoliceReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">아니오</span>
                            </label>
                        </div>
                    </div>

                    <div className="medi-4-question">
                        <p>② 위 재해와 관련하여 119 또는 소방서에 구조구급 재난 신고 (접수)된 사실이 있습니까?</p>
                        <div className="medi-4-radio-group">
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="emergencyReport"
                                    value="0"
                                    checked={emergencyReport === "0"}
                                    onChange={(e) => setEmergencyReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">예</span>
                            </label>
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="emergencyReport"
                                    value="1"
                                    checked={emergencyReport === "1"}
                                    onChange={(e) => setEmergencyReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">아니오</span>
                            </label>
                        </div>
                    </div>

                    <div className="medi-4-question">
                        <p>③ 위 재해와 관련하여 자동차 보험사에 사고를 신고한 사실이 있습니까?</p>
                        <div className="medi-4-radio-group">
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="insuranceReport"
                                    value="0"
                                    checked={insuranceReport === "0"}
                                    onChange={(e) => setInsuranceReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">예</span>
                            </label>
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="insuranceReport"
                                    value="1"
                                    checked={insuranceReport === "1"}
                                    onChange={(e) => setInsuranceReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">아니오</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="medi-4-save-button-container">
                <ContinueButton 
                    text="다음" 
                    onClick={handleNext} 
                    disabled={isButtonDisabled}
                />
            </div>
        </div>
    );
};

export default MediGuidePage4;