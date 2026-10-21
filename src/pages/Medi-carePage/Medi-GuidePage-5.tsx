import { useState } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import { useLocalization } from "../../contexts/LocalizationContext";
import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import InfoPopupOverlay from "../../components/InfoPopupOverlay/InfoPopupOverlay";
import { usePopup } from "../../hooks/usePopup";
import type { MediGuidePageProps } from "../../types/mediGuide";
import "./Medi-GuidePage-5.css";
import "./Medi-popup.css";

const MediGuidePage5 = ({ onNext, onBack }: MediGuidePageProps) => {
    const { formData, updateFormData } = useFormData();
    const { t } = useLocalization();
    const { showPopup, popupText, popupPosition, handleInfoClick, handleClosePopup } = usePopup();

    const [witnessName, setWitnessName] = useState(formData.witness_name ?? "");
    const [witnessContact, setWitnessContact] = useState(formData.witness_contact ?? "");
    const [witnessRelation, setWitnessRelation] = useState(formData.witness_relation ?? "");
    const [medicalName, setMedicalName] = useState(formData.medical_name1 ?? "");
    const [medicalAddr, setMedicalAddr] = useState(formData.medical_addr1 ?? "");

    const handleNext = () => {
        updateFormData({
            witness_name: witnessName,
            witness_contact: witnessContact,
            witness_relation: witnessRelation,
            medical_name1: medicalName,
            medical_addr1: medicalAddr,
        });
        onNext?.();
    };

    return (
        <div className="app">
            <Header title={t("guidePractice")} onBack={onBack} showHomebtn={true} />
            <div className="medi-guide-title">
                <h2>{t("applyInfo2")}</h2>
            </div>
            <div className="medi-guide-content">
                <form className="info-form">
                    {/* 목격자 섹션 */}
                    <div className="medi-5-form-sub-label">
                        <span>{t("applyWitness")}</span>
                    </div>

                    <div className="form-section">
                        <div className="form-label">
                            <label>{t("applyName")}</label>
                            <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                onClick={(e) => handleInfoClick(t("popupWitnessName"), e)} />
                        </div>
                        <input type="text" className="form-input" placeholder={t("applyEnterName")}
                            value={witnessName} onChange={(e) => setWitnessName(e.target.value)} />
                    </div>

                    <div className="form-section">
                        <div className="form-label">
                            <label>{t("applyNumber")}</label>
                            <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                onClick={(e) => handleInfoClick(t("popupWitnessNumber"), e)} />
                        </div>
                        <input type="text" className="form-input" placeholder={t("applyEnterNumber")}
                            value={witnessContact} onChange={(e) => setWitnessContact(e.target.value)} />
                    </div>

                    <div className="form-section">
                        <div className="form-label">
                            <label>{t("applyWitnessRelate")}</label>
                            <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                onClick={(e) => handleInfoClick(t("popupWithnessRelate"), e)} />
                        </div>
                        <input type="text" className="form-input" placeholder={t("applyEnterWitness")}
                            value={witnessRelation} onChange={(e) => setWitnessRelation(e.target.value)} />
                    </div>

                    {/* 의료기관 섹션 */}
                    <div className="medi-5-form-sub-label">
                        <span>{t("applyHospital")}</span>
                    </div>

                    <div className="form-section">
                        <div className="form-label">
                            <label>{t("applyHospitalName")}</label>
                            <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                onClick={(e) => handleInfoClick(t("popupHospitalName"), e)} />
                        </div>
                        <input type="text" className="form-input" placeholder={t("applyEnterHospitalName")}
                            value={medicalName} onChange={(e) => setMedicalName(e.target.value)} />
                    </div>

                    <div className="form-section">
                        <div className="form-label">
                            <label>{t("applyHospitalPlace")}</label>
                            <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                onClick={(e) => handleInfoClick(t("popupHospitalPlace"), e)} />
                        </div>
                        <input type="text" className="form-input" placeholder={t("applyEnterHospitalPlace")}
                            value={medicalAddr} onChange={(e) => setMedicalAddr(e.target.value)} />
                    </div>
                </form>
            </div>

            <div className="save-button-container">
                <ContinueButton text={t("applyPDF")} onClick={handleNext} />
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

export default MediGuidePage5;
