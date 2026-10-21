import { useState, useEffect } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalization } from "../../contexts/LocalizationContext";
import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import InfoPopupOverlay from "../../components/InfoPopupOverlay/InfoPopupOverlay";
import { usePopup } from "../../hooks/usePopup";
import type { MediGuidePageProps } from "../../types/mediGuide";
import "./Medi-popup.css";

const MediGuidePage3 = ({ onNext, onBack, currentStep = 3 }: MediGuidePageProps) => {
    const { formData, updateFormData } = useFormData();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLocalization();
    const { showPopup, popupText, popupPosition, handleInfoClick, handleClosePopup } = usePopup();

    const [applyCategory, setApplyCategory] = useState(formData.apply_category ?? "");
    const [compName, setCompName] = useState(formData.comp_name ?? "");
    const [bossName, setBossName] = useState(formData.boss_name ?? "");
    const [compContact, setCompContact] = useState(formData.comp_contact ?? "");
    const [businessNum, setBusinessNum] = useState(formData.bussiness_num ?? "");
    const [compAddr, setCompAddr] = useState(formData.comp_addr ?? "");

    const applyCategoryOptions = [
        { value: "0", label: t("applyAccident") },
        { value: "1", label: t("applySick") },
        { value: "2", label: t("applyGo") },
    ];

    /** 현재 입력값을 FormData 구조로 변환하는 헬퍼 */
    const buildPayload = () => ({
        apply_category: applyCategory,
        comp_name: compName,
        boss_name: bossName,
        comp_contact: compContact,
        bussiness_num: businessNum,
        comp_addr: compAddr,
    });

    // 주소 검색에서 돌아왔을 때 사업장 주소 복원
    useEffect(() => {
        if (location.state?.compAddr) {
            setCompAddr(location.state.compAddr);
            updateFormData({ comp_addr: location.state.compAddr });
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // 언마운트 시 현재 입력값 자동 저장
    useEffect(() => {
        return () => { updateFormData(buildPayload()); };
    }, [applyCategory, compName, bossName, compContact, businessNum, compAddr]);

    const handleAddressSearch = () => {
        updateFormData(buildPayload());
        navigate("/medi-address-1", {
            state: { returnPath: "/medicare-guide-flow", returnToStep: currentStep, fieldName: "compAddr" },
        });
    };

    const handleBusinessNumSearch = () => {
        window.open("https://www.comwel.or.kr/comwel/info/cont/cont.jsp", "_blank", "noopener,noreferrer");
    };

    const handleNext = () => {
        updateFormData(buildPayload());
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
                    {/* 신청 구분 */}
                    <div className="medi-2-form-section">
                        <div className="medi-2-form-sub-label">
                            <span>{t("applyApply")}</span>
                        </div>
                        <CustomSelect
                            options={applyCategoryOptions}
                            value={applyCategory}
                            onChange={setApplyCategory}
                            placeholder={t("applyChooseApply")}
                            className="medi-2-form-select"
                        />
                    </div>

                    {/* 사업장 명칭 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>{t("applyPlace")}</label>
                            <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                onClick={(e) => handleInfoClick(t("popupPlaceName"), e)} />
                        </div>
                        <input type="text" className="form-input" placeholder={t("applyEnterPlace")}
                            value={compName} onChange={(e) => setCompName(e.target.value)} />
                    </div>

                    {/* 사업주 성명 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>{t("applyBoss")}</label>
                            <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                onClick={(e) => handleInfoClick(t("popupBossName"), e)} />
                        </div>
                        <input type="text" className="form-input" placeholder={t("applyEnterBoss")}
                            value={bossName} onChange={(e) => setBossName(e.target.value)} />
                    </div>

                    {/* 사업장 전화번호 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>{t("applyNumber")}</label>
                            <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                onClick={(e) => handleInfoClick(t("popupBossNumber"), e)} />
                        </div>
                        <input type="text" className="form-input" placeholder={t("applyEnterNumber")}
                            value={compContact} onChange={(e) => setCompContact(e.target.value)} />
                    </div>

                    {/* 사업자등록번호 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>{t("applyPlaceNumber")}</label>
                            <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                onClick={(e) => handleInfoClick(t("popupPlaceNumber"), e)} />
                        </div>
                        <div className="address-input-container">
                            <input type="text" className="form-input address-input"
                                placeholder={t("applyEnterPlaceNumber")}
                                value={businessNum} onChange={(e) => setBusinessNum(e.target.value)} />
                            <button type="button" className="address-search-btn" onClick={handleBusinessNumSearch}>
                                {t("applyLookNumber")}
                            </button>
                        </div>
                    </div>

                    {/* 사업장 주소 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>{t("applyPlaceAddr")}</label>
                            <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                onClick={(e) => handleInfoClick(t("popupPlaceAddr"), e)} />
                        </div>
                        <div className="address-input-container">
                            <input type="text" className="form-input address-input"
                                placeholder={t("applyEnterPlaceAddr")}
                                value={compAddr} onChange={(e) => setCompAddr(e.target.value)} />
                            <button type="button" className="address-search-btn" onClick={handleAddressSearch}>
                                {t("applyEnterAddr2")}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="save-button-container">
                <ContinueButton text={t("applyNext")} onClick={handleNext} />
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

export default MediGuidePage3;
