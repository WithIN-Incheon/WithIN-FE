import { useState } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import { useLocalization } from "../../contexts/LocalizationContext";
import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import InfoPopupOverlay from "../../components/InfoPopupOverlay/InfoPopupOverlay";
import { usePopup } from "../../hooks/usePopup";
import type { MediGuidePageProps } from "../../types/mediGuide";
import "./Medi-GuidePage-4.css";
import "./Medi-popup.css";

const MediGuidePage4 = ({ onNext, onBack }: MediGuidePageProps) => {
    const { formData, updateFormData } = useFormData();
    const { t } = useLocalization();
    const { showPopup, popupText, popupPosition, handleInfoClick, handleClosePopup } = usePopup();

    const [disasterDetails, setDisasterDetails] = useState(formData.acci_desc ?? "");
    const [policeReport, setPoliceReport] = useState<string>(formData.police_check ?? "");
    const [emergencyReport, setEmergencyReport] = useState<string>(formData.fire_check ?? "");
    const [insuranceReport, setInsuranceReport] = useState<string>(formData.insur_check ?? "");

    const isButtonDisabled =
        policeReport === "" || emergencyReport === "" || insuranceReport === "";

    const handleNext = () => {
        updateFormData({
            acci_desc: disasterDetails,
            police_check: policeReport,
            fire_check: emergencyReport,
            insur_check: insuranceReport,
        });
        onNext?.();
    };

    return (
        <div className="app">
            <Header title={t("guidePractice")} onBack={onBack} showHomebtn={true} />
            <div className="medi-guide-title">
                <h2>{t("applyInfo2")}</h2>
            </div>

            <div className="medi-4-form-container">
                {/* 재해 경위 */}
                <div className="medi-4-section-header">
                    <h3>{t("applyReason")}</h3>
                    <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                        onClick={(e) => handleInfoClick(t("popupReason"), e)} />
                </div>
                <p className="medi-4-instruction-text">{t("applyRecommend")}</p>

                <div className="medi-4-text-input-container">
                    <textarea
                        className="medi-4-disaster-details-input"
                        value={disasterDetails}
                        onChange={(e) => setDisasterDetails(e.target.value)}
                        maxLength={1000}
                    />
                    <div className="medi-4-character-count">{disasterDetails.length}/1000</div>
                </div>

                {/* 라디오 그룹 */}
                <div className="medi-4-question-container">
                    {[
                        { label: t("applyFactPolice"), name: "policeReport", value: policeReport, setter: setPoliceReport },
                        { label: t("applyFact119"), name: "emergencyReport", value: emergencyReport, setter: setEmergencyReport },
                        { label: t("applyFactCar"), name: "insuranceReport", value: insuranceReport, setter: setInsuranceReport },
                    ].map(({ label, name, value, setter }) => (
                        <div className="medi-4-question" key={name}>
                            <p>{label}</p>
                            <div className="medi-4-radio-group">
                                {[{ val: "0", text: t("applyYes") }, { val: "1", text: t("applyNo") }].map(({ val, text }) => (
                                    <label className="medi-4-radio-option" key={val}>
                                        <input
                                            type="radio"
                                            name={name}
                                            value={val}
                                            checked={value === val}
                                            onChange={(e) => setter(e.target.value)}
                                        />
                                        <span className="medi-4-radio-label">{text}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="medi-4-save-button-container">
                <ContinueButton
                    text={t("applyNext")}
                    onClick={handleNext}
                    disabled={isButtonDisabled}
                />
            </div>

            {showPopup && (
                <InfoPopupOverlay
                    text={popupText}
                    position={popupPosition}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
};

export default MediGuidePage4;
