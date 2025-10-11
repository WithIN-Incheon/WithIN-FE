import { useState } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import "./Medi-GuidePage-1.css";

interface MediGuidePage1Props {
    onNext?: () => void;
    onBack?: () => void;
}

const MediGuidePage1 = ({ onNext, onBack }: MediGuidePage1Props) => {
    const { formData, updateFormData } = useFormData();
    
    // 로컬 상태로 입력값 관리
    const [name, setName] = useState(formData.name || "");
    const [foreignerRegNum1, setForeignerRegNum1] = useState("");
    const [foreignerRegNum2, setForeignerRegNum2] = useState("");
    const [phone, setPhone] = useState(formData.phone_person || "");
    const [address, setAddress] = useState(formData.addr || "");
    const [accidentDate, setAccidentDate] = useState("");
    const [accidentTime, setAccidentTime] = useState("");
    const [hireDate, setHireDate] = useState("");
    const [workStartTime, setWorkStartTime] = useState(formData.work_starttime || "");
    const [workEndTime, setWorkEndTime] = useState(formData.work_endtime || "");
    const [jobType, setJobType] = useState(formData.job_type || "");

    const handleNext = () => {
        // 재해발생시간 포맷: YYYYMMDDHHmm
        // date: "2003-02-07" → "20030207"
        // time: "13:22" → "1322"
        const formattedOccurTime = accidentDate && accidentTime 
            ? accidentDate.replace(/-/g, '') + accidentTime.replace(/:/g, '')
            : '';

        // 채용일자 분리: "2023-12-04" → year: "2023", month: "12", day: "4"
        const hireDateParts = hireDate ? hireDate.split('-') : ['', '', ''];
        const employYear = hireDateParts[0] || '';
        const employMonth = hireDateParts[1] || '';
        const employDay = hireDateParts[2] || '';

        // Context에 데이터 저장
        updateFormData({
            name,
            rrn: `${foreignerRegNum1}-${foreignerRegNum2}`,
            phone_person: phone,
            addr: address,
            occur_time: formattedOccurTime,
            employ_year: employYear,
            employ_month: employMonth,
            employ_day: employDay,
            work_starttime: workStartTime,
            work_endtime: workEndTime,
            job_type: jobType
        });
        
        onNext?.();
    };

    return (
        <div className="app">
            <Header title="요양 급여 신청 가이드" onBack={onBack}/>
            <div className="medi-guide-title">
                <h2>정보를 입력해 주세요.</h2>
            </div>
            <div className="medi-guide-content">
                <form className="info-form">
                    {/* 이름 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>이름</label>
                            <img src="/info_square.png" alt="info-icon" />
                        </div>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="이름을 입력하세요"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* 외국인등록번호 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>외국인등록번호</label>
                            <img src="/info_square.png" alt="info-icon" />
                        </div>
                        <div className="registration-number-input">
                            <input 
                                type="text" 
                                className="form-input registration-part" 
                                defaultValue="02504938"
                                maxLength={8}
                                value={foreignerRegNum1}
                                onChange={(e) => setForeignerRegNum1(e.target.value)}
                            />
                            <span className="hyphen">-</span>
                            <input 
                                type="text" 
                                className="form-input registration-part" 
                                defaultValue="02504938"
                                maxLength={8}
                                value={foreignerRegNum2}
                                onChange={(e) => setForeignerRegNum2(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 전화번호 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>전화번호</label>
                            <img src="/info_square.png" alt="info-icon" />
                        </div>
                        <input 
                            type="tel" 
                            className="form-input" 
                            placeholder="010-0000-0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    {/* 주소 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>주소</label>
                            <img src="/info_square.png" alt="info-icon" />
                        </div>
                        <div className="address-input-container">
                            <input 
                                type="text" 
                                className="form-input address-input" 
                                placeholder="주소를 입력하세요"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <button type="button" className="address-search-btn">주소 검색</button>
                        </div>
                    </div>

                    {/* 재해발생일시 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>재해발생일시</label>
                            <img src="/info_square.png" alt="info-icon" />
                        </div>
                        <div className="datetime-input">
                            <input 
                                type="date" 
                                className="form-input date-input" 
                                placeholder="YYYY-MM-DD"
                                value={accidentDate}
                                onChange={(e) => setAccidentDate(e.target.value)}
                            />
                            <input 
                                type="time" 
                                className="form-input time-input" 
                                placeholder="00:00"
                                value={accidentTime}
                                onChange={(e) => setAccidentTime(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 채용일자 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>채용일자</label>
                            <img src="/info_square.png" alt="info-icon" />
                        </div>
                        <input 
                            type="date" 
                            className="form-input" 
                            placeholder="YYYY-MM-DD"
                            value={hireDate}
                            onChange={(e) => setHireDate(e.target.value)}
                        />
                    </div>

                    {/* 출근 시작/퇴근 시간 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>출근 시작/퇴근 시간</label>
                            <img src="/info_square.png" alt="info-icon" />
                        </div>
                        <div className="work-time-input">
                            <input 
                                type="time" 
                                className="form-input time-input" 
                                placeholder="00:00"
                                value={workStartTime}
                                onChange={(e) => setWorkStartTime(e.target.value)}
                            />
                            <span className="hyphen">-</span>
                            <input 
                                type="time" 
                                className="form-input time-input" 
                                placeholder="00:00"
                                value={workEndTime}
                                onChange={(e) => setWorkEndTime(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 직종 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>직종</label>
                            <img src="/info_square.png" alt="info-icon" />
                        </div>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="직종을 입력하세요"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        />
                    </div>
                </form>
            </div>
            <div className="save-button-container">
                <ContinueButton text="다음" onClick={handleNext} />
            </div>
        </div>
    )
}

export default MediGuidePage1;