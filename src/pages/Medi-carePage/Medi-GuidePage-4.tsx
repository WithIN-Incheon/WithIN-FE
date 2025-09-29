import { useState } from "react";
import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import "./Medi-GuidePage-4.css";

interface MediGuidePage4Props {
    onNext?: () => void;
    onBack?: () => void;
}

const MediGuidePage4 = ({ onNext, onBack }: MediGuidePage4Props) => {
    const [disasterDetails, setDisasterDetails] = useState("");
    const [policeReport, setPoliceReport] = useState<string>("");
    const [emergencyReport, setEmergencyReport] = useState<string>("");
    const [insuranceReport, setInsuranceReport] = useState<string>("");

    return (
        <div className="app">
            <Header title="요양 급여 신청 가이드" />
            <div className="medi-guide-title">
                <h2>정보를 입력해 주세요.</h2>
            </div>
            
            <div className="medi-4-form-container">
                <div className="medi-4-section-header">
                    <h3>재해 발생 경위</h3>
                    <div className="medi-4-info-icon">i</div>
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
                                    value="yes"
                                    checked={policeReport === "yes"}
                                    onChange={(e) => setPoliceReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">예</span>
                            </label>
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="policeReport"
                                    value="no"
                                    checked={policeReport === "no"}
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
                                    value="yes"
                                    checked={emergencyReport === "yes"}
                                    onChange={(e) => setEmergencyReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">예</span>
                            </label>
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="emergencyReport"
                                    value="no"
                                    checked={emergencyReport === "no"}
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
                                    value="yes"
                                    checked={insuranceReport === "yes"}
                                    onChange={(e) => setInsuranceReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">예</span>
                            </label>
                            <label className="medi-4-radio-option">
                                <input
                                    type="radio"
                                    name="insuranceReport"
                                    value="no"
                                    checked={insuranceReport === "no"}
                                    onChange={(e) => setInsuranceReport(e.target.value)}
                                />
                                <span className="medi-4-radio-label">아니오</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="medi-4-save-button-container">
                <ContinueButton text="다음" onClick={onNext || (() => {})} />
            </div>
        </div>
    );
};

export default MediGuidePage4;