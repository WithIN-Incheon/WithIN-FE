import { useState, useEffect } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import "./Medi-GuidePage-1.css";
import MediPopup from "./Medi-popup";

interface MediGuidePage1Props {
    onNext?: () => void;
    onBack?: () => void;
    currentStep?: number;
}

const MediGuidePage1 = ({ onNext, onBack, currentStep = 1 }: MediGuidePage1Props) => {
    const { formData, updateFormData } = useFormData();
    const navigate = useNavigate();
    const location = useLocation();
    
    // 로컬 상태로 입력값 관리 - context에서 초기값 복원
    const [name, setName] = useState(formData.name || "");
    const [foreignerRegNum1, setForeignerRegNum1] = useState(() => {
        return formData.rrn ? formData.rrn.split('-')[0] : "";
    });
    const [foreignerRegNum2, setForeignerRegNum2] = useState(() => {
        return formData.rrn ? formData.rrn.split('-')[1] : "";
    });
    const [phone, setPhone] = useState(formData.phone_person || "");
    const [address, setAddress] = useState(formData.addr || "");
    const [accidentDate, setAccidentDate] = useState(() => {
        // occur_time이 "202312041530" 형식이면 "2023-12-04"로 변환
        if (formData.occur_time && formData.occur_time.length >= 8) {
            const year = formData.occur_time.substring(0, 4);
            const month = formData.occur_time.substring(4, 6);
            const day = formData.occur_time.substring(6, 8);
            return `${year}-${month}-${day}`;
        }
        return "";
    });
    const [accidentTime, setAccidentTime] = useState(() => {
        // occur_time이 "202312041530" 형식이면 "15:30"으로 변환
        if (formData.occur_time && formData.occur_time.length >= 12) {
            const hour = formData.occur_time.substring(8, 10);
            const minute = formData.occur_time.substring(10, 12);
            return `${hour}:${minute}`;
        }
        return "";
    });
    const [hireDate, setHireDate] = useState(() => {
        // employ_year, employ_month, employ_day를 합쳐서 복원
        if (formData.employ_year && formData.employ_month && formData.employ_day) {
            return `${formData.employ_year}-${formData.employ_month.padStart(2, '0')}-${formData.employ_day.padStart(2, '0')}`;
        }
        return "";
    });
    const [workStartTime, setWorkStartTime] = useState(formData.work_starttime || "");
    const [workEndTime, setWorkEndTime] = useState(formData.work_endtime || "");
    const [jobType, setJobType] = useState(formData.job_type || "");
    
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

    // 주소 검색에서 돌아왔을 때 주소 설정
    useEffect(() => {
        if (location.state?.address) {
            setAddress(location.state.address);
            // 주소가 설정되면 즉시 context에도 저장
            updateFormData({ addr: location.state.address });
            // state 초기화 (재사용 방지)
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // 컴포넌트가 언마운트될 때 현재 입력값을 context에 저장
    useEffect(() => {
        return () => {
            // cleanup 함수: 페이지를 벗어날 때 자동 저장
            const formattedOccurTime = accidentDate && accidentTime 
                ? accidentDate.replace(/-/g, '') + accidentTime.replace(/:/g, '')
                : '';

            const hireDateParts = hireDate ? hireDate.split('-') : ['', '', ''];
            
            updateFormData({
                name,
                rrn: `${foreignerRegNum1}-${foreignerRegNum2}`,
                phone_person: phone,
                addr: address,
                occur_time: formattedOccurTime,
                employ_year: hireDateParts[0] || '',
                employ_month: hireDateParts[1] || '',
                employ_day: hireDateParts[2] || '',
                work_starttime: workStartTime,
                work_endtime: workEndTime,
                job_type: jobType
            });
        };
    }, [name, foreignerRegNum1, foreignerRegNum2, phone, address, accidentDate, accidentTime, hireDate, workStartTime, workEndTime, jobType]);

    // 주소 검색 버튼 핸들러
    const handleAddressSearch = () => {
        // 주소 검색 페이지로 이동하기 전에 현재 입력값을 context에 저장
        const formattedOccurTime = accidentDate && accidentTime 
            ? accidentDate.replace(/-/g, '') + accidentTime.replace(/:/g, '')
            : '';

        const hireDateParts = hireDate ? hireDate.split('-') : ['', '', ''];
        
        updateFormData({
            name,
            rrn: `${foreignerRegNum1}-${foreignerRegNum2}`,
            phone_person: phone,
            addr: address,
            occur_time: formattedOccurTime,
            employ_year: hireDateParts[0] || '',
            employ_month: hireDateParts[1] || '',
            employ_day: hireDateParts[2] || '',
            work_starttime: workStartTime,
            work_endtime: workEndTime,
            job_type: jobType
        });

        navigate('/medi-address-1', {
            state: {
                returnPath: '/medicare-guide-flow',
                returnToStep: currentStep,
                fieldName: 'address'
            }
        });
    };

    const handleNext = () => {
        // 재해발생시간 포맷: YYYYMMDDHHmm
        const formattedOccurTime = accidentDate && accidentTime 
            ? accidentDate.replace(/-/g, '') + accidentTime.replace(/:/g, '')
            : '';

        // 채용일자 분리
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
            <Header title="최초 요양 급여 신청서 연습" onBack={onBack} showHomebtn={true}/>
            <div className="medi-guide-title">
                <h2>정보를 입력해 주세요.</h2>
            </div>
            <div className="medi-guide-content">
                <form className="info-form">
                    {/* 이름 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>이름</label>
                            <img 
                                src="/info_square.png" 
                                alt="info-icon" 
                                onClick={(e) => handleInfoClick("이름을 입력해주세요!", e)}
                                style={{ cursor: 'pointer' }}
                            />
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
                            <img 
                                src="/info_square.png" 
                                alt="info-icon" 
                                onClick={(e) => handleInfoClick("외국인 등록증 발급 시 받은 번호를 입력해주세요!", e)}
                                style={{ cursor: 'pointer' }}
                            />
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
                            <img 
                                src="/info_square.png" 
                                alt="info-icon" 
                                onClick={(e) => handleInfoClick("휴대폰 번호를 입력해주세요.", e)}
                                style={{ cursor: 'pointer' }}
                            />
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
                            <img 
                                src="/info_square.png" 
                                alt="info-icon" 
                                onClick={(e) => handleInfoClick("현재 거주하는 위치를 적어주세요.", e)}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                        <div className="address-input-container">
                            <input 
                                type="text" 
                                className="form-input address-input" 
                                placeholder="주소를 입력하세요"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <button 
                                type="button" 
                                className="address-search-btn"
                                onClick={handleAddressSearch}
                            >
                                주소 검색
                            </button>
                        </div>
                    </div>

                    {/* 재해발생일시 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>재해발생일시</label>
                            <img 
                                src="/info_square.png" 
                                alt="info-icon" 
                                onClick={(e) => handleInfoClick("다친 날짜를 입력해주세요!", e)}
                                style={{ cursor: 'pointer' }}
                            />
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
                            <img 
                                src="/info_square.png" 
                                alt="info-icon" 
                                onClick={(e) => handleInfoClick("채용일자를 입력해주세요!", e)}
                                style={{ cursor: 'pointer' }}
                            />
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
                            <img 
                                src="/info_square.png" 
                                alt="info-icon" 
                                onClick={(e) => handleInfoClick("일 시작/끝나는 시간을 입력해주세요.", e)}
                                style={{ cursor: 'pointer' }}
                            />
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
                            <img 
                                src="/info_square.png" 
                                alt="info-icon" 
                                onClick={(e) => handleInfoClick("하시는 일의 분야를 적어주세요!", e)}
                                style={{ cursor: 'pointer' }}
                            />
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
    )
}

export default MediGuidePage1;