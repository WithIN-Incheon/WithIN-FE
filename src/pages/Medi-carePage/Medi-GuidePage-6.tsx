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
import "./Medi-GuidePage-1.css";
import "./Medi-GuidePage-2.css";
import "./Medi-GuidePage-4.css";
import "./Medi-GuidePage-5.css";
import "./Medi-popup.css";

// occur_time(YYYYMMDDHHmm) → { date: "YYYY-MM-DD", time: "HH:mm" }
function parseOccurTime(occurTime?: string) {
    if (!occurTime || occurTime.length < 8) return { date: "", time: "" };
    const date = `${occurTime.slice(0, 4)}-${occurTime.slice(4, 6)}-${occurTime.slice(6, 8)}`;
    const time = occurTime.length >= 12
        ? `${occurTime.slice(8, 10)}:${occurTime.slice(10, 12)}`
        : "";
    return { date, time };
}

// employ_year/month/day → "YYYY-MM-DD"
function parseHireDate(year?: string, month?: string, day?: string) {
    if (!year || !month || !day) return "";
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

const MediGuidePage6 = ({ onNext, onBack, currentStep = 6 }: MediGuidePageProps) => {
    const { formData, updateFormData } = useFormData();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLocalization();
    const { showPopup, popupText, popupPosition, handleInfoClick, handleClosePopup } = usePopup();

    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

    // Page 1 필드들
    const { date: initDate, time: initTime } = parseOccurTime(formData.occur_time);
    const [name, setName] = useState(formData.name ?? "");
    const [foreignerRegNum1, setForeignerRegNum1] = useState(() => formData.rrn?.split("-")[0] ?? "");
    const [foreignerRegNum2, setForeignerRegNum2] = useState(() => formData.rrn?.split("-")[1] ?? "");
    const [phone, setPhone] = useState(formData.phone_person ?? "");
    const [address, setAddress] = useState(formData.addr ?? "");
    const [accidentDate, setAccidentDate] = useState(initDate);
    const [accidentTime, setAccidentTime] = useState(initTime);
    const [hireDate, setHireDate] = useState(
        () => parseHireDate(formData.employ_year, formData.employ_month, formData.employ_day)
    );
    const [workStartTime, setWorkStartTime] = useState(formData.work_starttime ?? "");
    const [workEndTime, setWorkEndTime] = useState(formData.work_endtime ?? "");
    const [jobType, setJobType] = useState(formData.job_type ?? "");

    // Page 2 필드들
    const [businessOwnerStatus, setBusinessOwnerStatus] = useState(formData.bussiness_owner_status ?? "");
    const [familyStatus, setFamilyStatus] = useState(formData.family_status ?? "");

    // Page 3 필드들
    const [applyCategory, setApplyCategory] = useState(formData.apply_category ?? "");
    const [compName, setCompName] = useState(formData.comp_name ?? "");
    const [bossName, setBossName] = useState(formData.boss_name ?? "");
    const [compContact, setCompContact] = useState(formData.comp_contact ?? "");
    const [businessNum, setBusinessNum] = useState(formData.bussiness_num ?? "");
    const [compAddr, setCompAddr] = useState(formData.comp_addr ?? "");

    // Page 4 필드들
    const [disasterDetails, setDisasterDetails] = useState(formData.acci_desc ?? "");
    const [policeReport, setPoliceReport] = useState<string>(formData.police_check ?? "");
    const [emergencyReport, setEmergencyReport] = useState<string>(formData.fire_check ?? "");
    const [insuranceReport, setInsuranceReport] = useState<string>(formData.insur_check ?? "");

    // Page 5 필드들
    const [witnessName, setWitnessName] = useState(formData.witness_name ?? "");
    const [witnessContact, setWitnessContact] = useState(formData.witness_contact ?? "");
    const [witnessRelation, setWitnessRelation] = useState(formData.witness_relation ?? "");
    const [medicalName, setMedicalName] = useState(formData.medical_name1 ?? "");
    const [medicalAddr, setMedicalAddr] = useState(formData.medical_addr1 ?? "");

    // 옵션 데이터
    const businessOwnerOptions = [
        { value: "0", label: t("applyNone") },
        { value: "1", label: t("applyRealBoss") },
        { value: "2", label: t("applyFakeBoss") },
    ];
    const familyStatusOptions = [
        { value: "0", label: t("applyNone") },
        { value: "1", label: t("applyMarry") },
        { value: "2", label: t("applyParents") },
        { value: "3", label: t("applySon") },
        { value: "4", label: t("applySilblings") },
        { value: "5", label: t("applyGuitar") },
    ];
    const applyCategoryOptions = [
        { value: "0", label: t("applyAccident") },
        { value: "1", label: t("applySick") },
        { value: "2", label: t("applyGo") },
    ];

    /** 전체 폼 데이터를 FormData 구조로 변환하는 헬퍼 */
    const buildPayload = () => {
        const occurTime =
            accidentDate && accidentTime
                ? accidentDate.replace(/-/g, "") + accidentTime.replace(/:/g, "")
                : "";
        const [ey = "", em = "", ed = ""] = hireDate ? hireDate.split("-") : [];
        return {
            name,
            rrn: `${foreignerRegNum1}-${foreignerRegNum2}`,
            phone_person: phone,
            addr: address,
            occur_time: occurTime,
            employ_year: ey,
            employ_month: em,
            employ_day: ed,
            work_starttime: workStartTime,
            work_endtime: workEndTime,
            job_type: jobType,
            bussiness_owner_status: businessOwnerStatus,
            family_status: familyStatus,
            apply_category: applyCategory,
            comp_name: compName,
            boss_name: bossName,
            comp_contact: compContact,
            bussiness_num: businessNum,
            comp_addr: compAddr,
            acci_desc: disasterDetails,
            police_check: policeReport,
            fire_check: emergencyReport,
            insur_check: insuranceReport,
            witness_name: witnessName,
            witness_contact: witnessContact,
            witness_relation: witnessRelation,
            medical_name1: medicalName,
            medical_addr1: medicalAddr,
        };
    };

    // 주소 검색에서 돌아왔을 때 주소 복원
    useEffect(() => {
        if (location.state?.address) {
            setAddress(location.state.address);
            updateFormData({ addr: location.state.address });
            window.history.replaceState({}, document.title);
        }
        if (location.state?.compAddr) {
            setCompAddr(location.state.compAddr);
            updateFormData({ comp_addr: location.state.compAddr });
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // 언마운트 시 현재 입력값 자동 저장
    useEffect(() => {
        return () => { updateFormData(buildPayload()); };
    }, [
        name, foreignerRegNum1, foreignerRegNum2, phone, address,
        accidentDate, accidentTime, hireDate, workStartTime, workEndTime, jobType,
        businessOwnerStatus, familyStatus,
        applyCategory, compName, bossName, compContact, businessNum, compAddr,
        disasterDetails, policeReport, emergencyReport, insuranceReport,
        witnessName, witnessContact, witnessRelation, medicalName, medicalAddr,
    ]);

    // 스크롤 감지 — 맨 하단 100px 이내 도달 시 버튼 활성화
    useEffect(() => {
        if (isScrolledToBottom) return;
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                setIsScrolledToBottom(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // 마운트 시 초기 체크
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isScrolledToBottom]);

    const handleAddressSearch = (fieldName: string) => {
        updateFormData(buildPayload());
        navigate("/medi-address-1", {
            state: { returnPath: "/medicare-guide-flow", returnToStep: currentStep, fieldName },
        });
    };

    const handleBusinessNumSearch = () => {
        window.open("https://www.comwel.or.kr/comwel/info/cont/cont.jsp", "_blank", "noopener,noreferrer");
    };

    const handleNext = () => onNext?.();

    return (
        <div className="app">
            <Header title={t("guidePractice")} showHomebtn={true} onBack={onBack} />
            <div className="medi-guide-title">
                <h2>{t("guidePreview")}</h2>
            </div>

            {/* ── 1페이지 요약 ── */}
            <div style={{ marginBottom: "-30px" }}>
                <div className="medi-guide-content">
                    <form className="info-form">
                        <div className="form-section">
                            <div className="form-label">
                                <label>{t("applyName")}</label>
                                <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                    onClick={(e) => handleInfoClick(t("popupName"), e)} />
                            </div>
                            <input type="text" className="form-input" placeholder={t("applyEnterName")}
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="form-section">
                            <div className="form-label">
                                <label>{t("applyForiegnNumber")}</label>
                                <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                    onClick={(e) => handleInfoClick(t("popupForiegnNumber"), e)} />
                            </div>
                            <div className="registration-number-input">
                                <input type="text" className="form-input registration-part" maxLength={8}
                                    value={foreignerRegNum1} onChange={(e) => setForeignerRegNum1(e.target.value)} />
                                <span className="hyphen">-</span>
                                <input type="text" className="form-input registration-part" maxLength={8}
                                    value={foreignerRegNum2} onChange={(e) => setForeignerRegNum2(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-label">
                                <label>{t("applyPhoneNumber")}</label>
                                <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                    onClick={(e) => handleInfoClick(t("popupNumber"), e)} />
                            </div>
                            <input type="tel" className="form-input" placeholder="010-0000-0000"
                                value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div className="form-section">
                            <div className="form-label">
                                <label>{t("applyAddr")}</label>
                                <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                    onClick={(e) => handleInfoClick(t("popupAddr"), e)} />
                            </div>
                            <div className="address-input-container">
                                <input type="text" className="form-input address-input" placeholder={t("applyEnterAddr")}
                                    value={address} onChange={(e) => setAddress(e.target.value)} />
                                <button type="button" className="address-search-btn"
                                    onClick={() => handleAddressSearch("address")}>
                                    {t("applyLookAddr")}
                                </button>
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-label">
                                <label>{t("applyHurt")}</label>
                                <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                    onClick={(e) => handleInfoClick(t("popupDate"), e)} />
                            </div>
                            <div className="datetime-input">
                                <input type="date" className="form-input date-input"
                                    value={accidentDate} onChange={(e) => setAccidentDate(e.target.value)} />
                                <input type="time" className="form-input time-input"
                                    value={accidentTime} onChange={(e) => setAccidentTime(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-label">
                                <label>{t("applyEmployed")}</label>
                                <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                    onClick={(e) => handleInfoClick(t("popupEmployed"), e)} />
                            </div>
                            <input type="date" className="form-input"
                                value={hireDate} onChange={(e) => setHireDate(e.target.value)} />
                        </div>

                        <div className="form-section">
                            <div className="form-label">
                                <label>{t("applyGo")}</label>
                                <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                    onClick={(e) => handleInfoClick(t("popupGo"), e)} />
                            </div>
                            <div className="work-time-input">
                                <input type="time" className="form-input time-input"
                                    value={workStartTime} onChange={(e) => setWorkStartTime(e.target.value)} />
                                <span className="hyphen">-</span>
                                <input type="time" className="form-input time-input"
                                    value={workEndTime} onChange={(e) => setWorkEndTime(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-label">
                                <label>{t("applyJob")}</label>
                                <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                    onClick={(e) => handleInfoClick(t("popupJob"), e)} />
                            </div>
                            <input type="text" className="form-input" placeholder={t("applyEnterJob")}
                                value={jobType} onChange={(e) => setJobType(e.target.value)} />
                        </div>
                    </form>
                </div>
            </div>

            {/* ── 2페이지 요약 ── */}
            <div style={{ marginBottom: "-60px" }}>
                <div className="medi-guide-content">
                    <form className="info-form">
                        <div className="medi-2-form-section">
                            <div className="medi-2-form-label">
                                <label>{t("applyBossRelation")}</label>
                            </div>
                            <div className="medi-2-form-sub-label">
                                <span>{t("applyBossRelation")}</span>
                            </div>
                            <CustomSelect options={businessOwnerOptions} value={businessOwnerStatus}
                                onChange={setBusinessOwnerStatus} placeholder={t("applyChooseBoss")}
                                className="medi-2-form-select" />
                        </div>
                        <div className="medi-2-form-section">
                            <div className="medi-2-form-sub-label">
                                <label>{t("applyFamily")}</label>
                            </div>
                            <CustomSelect options={familyStatusOptions} value={familyStatus}
                                onChange={setFamilyStatus} placeholder={t("applyChooseFamily")}
                                className="medi-2-form-select" />
                        </div>
                    </form>
                </div>
            </div>

            {/* ── 3페이지 요약 ── */}
            <div style={{ marginBottom: "-40px" }}>
                <div className="medi-guide-content">
                    <form className="info-form">
                        <div className="medi-2-form-section">
                            <div className="medi-2-form-sub-label">
                                <span>{t("applyApply")}</span>
                            </div>
                            <CustomSelect options={applyCategoryOptions} value={applyCategory}
                                onChange={setApplyCategory} placeholder={t("applyChooseApply")}
                                className="medi-2-form-select" />
                        </div>

                        <div className="form-section">
                            <div className="form-label">
                                <label>{t("applyPlace")}</label>
                                <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                    onClick={(e) => handleInfoClick(t("popupPlaceName"), e)} />
                            </div>
                            <input type="text" className="form-input" placeholder={t("applyEnterPlace")}
                                value={compName} onChange={(e) => setCompName(e.target.value)} />
                        </div>

                        <div className="form-section">
                            <div className="form-label">
                                <label>{t("applyBoss")}</label>
                                <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                    onClick={(e) => handleInfoClick(t("popupBossName"), e)} />
                            </div>
                            <input type="text" className="form-input" placeholder={t("applyEnterBoss")}
                                value={bossName} onChange={(e) => setBossName(e.target.value)} />
                        </div>

                        <div className="form-section">
                            <div className="form-label">
                                <label>{t("applyNumber")}</label>
                                <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                    onClick={(e) => handleInfoClick(t("popupBossNumber"), e)} />
                            </div>
                            <input type="text" className="form-input" placeholder={t("applyEnterNumber")}
                                value={compContact} onChange={(e) => setCompContact(e.target.value)} />
                        </div>

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
                                <button type="button" className="address-search-btn"
                                    onClick={() => handleAddressSearch("compAddr")}>
                                    {t("applyEnterAddr2")}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* ── 4페이지 요약 ── */}
            <div>
                <div className="medi-4-form-container">
                    <div className="medi-4-section-header">
                        <h3>{t("applyReason")}</h3>
                        <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                            onClick={(e) => handleInfoClick(t("popupReason"), e)} />
                    </div>
                    <p className="medi-4-instruction-text">{t("applyRecommend")}</p>

                    <div className="medi-4-text-input-container">
                        <textarea className="medi-4-disaster-details-input"
                            value={disasterDetails} onChange={(e) => setDisasterDetails(e.target.value)}
                            maxLength={1000} />
                        <div className="medi-4-character-count">{disasterDetails.length}/1000</div>
                    </div>

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
                                            <input type="radio" name={name} value={val}
                                                checked={value === val} onChange={(e) => setter(e.target.value)} />
                                            <span className="medi-4-radio-label">{text}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── 5페이지 요약 ── */}
            <div>
                <div className="medi-guide-content">
                    <form className="info-form">
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
            </div>

            <div className="save-button-container">
                <ContinueButton
                    text={t("applyCheck")}
                    onClick={handleNext}
                    disabled={!isScrolledToBottom}
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

export default MediGuidePage6;
