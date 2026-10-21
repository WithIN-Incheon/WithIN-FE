import { useState, useEffect } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalization } from "../../contexts/LocalizationContext";
import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import InfoPopupOverlay from "../../components/InfoPopupOverlay/InfoPopupOverlay";
import { usePopup } from "../../hooks/usePopup";
import type { MediGuidePageProps } from "../../types/mediGuide";
import "./Medi-GuidePage-1.css";
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

const MediGuidePage1 = ({ onNext, onBack, currentStep = 1 }: MediGuidePageProps) => {
    const { formData, updateFormData } = useFormData();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLocalization();
    const { showPopup, popupText, popupPosition, handleInfoClick, handleClosePopup } = usePopup();

    const { date: initDate, time: initTime } = parseOccurTime(formData.occur_time);

    const [name, setName] = useState(formData.name ?? "");
    const [foreignerRegNum1, setForeignerRegNum1] = useState(
        () => formData.rrn?.split("-")[0] ?? ""
    );
    const [foreignerRegNum2, setForeignerRegNum2] = useState(
        () => formData.rrn?.split("-")[1] ?? ""
    );
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

    /** 현재 입력값을 FormData 구조로 변환하는 헬퍼 */
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
        };
    };

    // 주소 검색에서 돌아왔을 때 주소 복원
    useEffect(() => {
        if (location.state?.address) {
            setAddress(location.state.address);
            updateFormData({ addr: location.state.address });
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // 언마운트 시 현재 입력값 자동 저장
    useEffect(() => {
        return () => { updateFormData(buildPayload()); };
    }, [name, foreignerRegNum1, foreignerRegNum2, phone, address,
        accidentDate, accidentTime, hireDate, workStartTime, workEndTime, jobType]);

    const handleAddressSearch = () => {
        updateFormData(buildPayload());
        navigate("/medi-address-1", {
            state: { returnPath: "/medicare-guide-flow", returnToStep: currentStep, fieldName: "address" },
        });
    };

    const handleNext = () => {
        updateFormData(buildPayload());
        onNext?.();
    };

    return (
        <div className="app">
            <Header title={t("guidePractice")} onBack={onBack} showHomebtn={true} />
            <div className="medi-guide-title">
                <h2>{t("applyInfo")}</h2>
            </div>
            <div className="medi-guide-content">
                <form className="info-form">
                    {/* 이름 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>{t("applyName")}</label>
                            <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                onClick={(e) => handleInfoClick(t("popupName"), e)} />
                        </div>
                        <input type="text" className="form-input" placeholder={t("applyEnterName")}
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    {/* 외국인등록번호 */}
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

                    {/* 전화번호 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>{t("applyPhoneNumber")}</label>
                            <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                onClick={(e) => handleInfoClick(t("popupNumber"), e)} />
                        </div>
                        <input type="tel" className="form-input" placeholder="010-0000-0000"
                            value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    {/* 주소 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>{t("applyAddr")}</label>
                            <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                onClick={(e) => handleInfoClick(t("popupAddr"), e)} />
                        </div>
                        <div className="address-input-container">
                            <input type="text" className="form-input address-input" placeholder={t("applyEnterAddr")}
                                value={address} onChange={(e) => setAddress(e.target.value)} />
                            <button type="button" className="address-search-btn" onClick={handleAddressSearch}>
                                {t("applyLookAddr")}
                            </button>
                        </div>
                    </div>

                    {/* 재해발생일시 */}
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

                    {/* 채용일자 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>{t("applyEmployed")}</label>
                            <img src="/info_square.png" alt="info-icon" style={{ cursor: "pointer" }}
                                onClick={(e) => handleInfoClick(t("popupEmployed"), e)} />
                        </div>
                        <input type="date" className="form-input"
                            value={hireDate} onChange={(e) => setHireDate(e.target.value)} />
                    </div>

                    {/* 출퇴근 시간 */}
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

                    {/* 직종 */}
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

export default MediGuidePage1;
