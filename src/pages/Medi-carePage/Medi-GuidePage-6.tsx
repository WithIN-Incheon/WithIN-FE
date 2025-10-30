import { useState, useEffect } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import MediPopup from "./Medi-popup";
import "./Medi-GuidePage-1.css";
import "./Medi-GuidePage-2.css";
import "./Medi-GuidePage-4.css";
import "./Medi-GuidePage-5.css";
import "./Medi-popup.css";

interface MediGuidePage6Props {
    onNext?: () => void;
    onBack?: () => void;
    currentStep?: number;
}

const MediGuidePage6 = ({ onNext, onBack, currentStep = 6 }: MediGuidePage6Props) => {
    const { formData, updateFormData } = useFormData();
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

    // Page 1 필드들
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
        if (formData.occur_time && formData.occur_time.length >= 8) {
            const year = formData.occur_time.substring(0, 4);
            const month = formData.occur_time.substring(4, 6);
            const day = formData.occur_time.substring(6, 8);
            return `${year}-${month}-${day}`;
        }
        return "";
    });
    const [accidentTime, setAccidentTime] = useState(() => {
        if (formData.occur_time && formData.occur_time.length >= 12) {
            const hour = formData.occur_time.substring(8, 10);
            const minute = formData.occur_time.substring(10, 12);
            return `${hour}:${minute}`;
        }
        return "";
    });
    const [hireDate, setHireDate] = useState(() => {
        if (formData.employ_year && formData.employ_month && formData.employ_day) {
            return `${formData.employ_year}-${formData.employ_month.padStart(2, '0')}-${formData.employ_day.padStart(2, '0')}`;
        }
        return "";
    });
    const [workStartTime, setWorkStartTime] = useState(formData.work_starttime || "");
    const [workEndTime, setWorkEndTime] = useState(formData.work_endtime || "");
    const [jobType, setJobType] = useState(formData.job_type || "");

    // Page 2 필드들
    const [businessOwnerStatus, setBusinessOwnerStatus] = useState(formData.bussiness_owner_status || "");
    const [familyStatus, setFamilyStatus] = useState(formData.family_status || "");

    // Page 3 필드들
    const [applyCategory, setApplyCategory] = useState(formData.apply_category || "");
    const [compName, setCompName] = useState(formData.comp_name || "");
    const [bossName, setBossName] = useState(formData.boss_name || "");
    const [compContact, setCompContact] = useState(formData.comp_contact || "");
    const [businessNum, setBusinessNum] = useState(formData.bussiness_num || "");
    const [compAddr, setCompAddr] = useState(formData.comp_addr || "");

    // Page 4 필드들
    const [disasterDetails, setDisasterDetails] = useState(formData.acci_desc || "");
    const [policeReport, setPoliceReport] = useState<string>(formData.police_check || "");
    const [emergencyReport, setEmergencyReport] = useState<string>(formData.fire_check || "");
    const [insuranceReport, setInsuranceReport] = useState<string>(formData.insur_check || "");

    // Page 5 필드들
    const [witnessName, setWitnessName] = useState(formData.witness_name || "");
    const [witnessContact, setWitnessContact] = useState(formData.witness_contact || "");
    const [witnessRelation, setWitnessRelation] = useState(formData.witness_relation || "");
    const [medicalName, setMedicalName] = useState(formData.medical_name1 || "");
    const [medicalAddr, setMedicalAddr] = useState(formData.medical_addr1 || "");

    // 옵션 데이터들
    const businessOwnerOptions = [
        { value: "0", label: "해당없음" },
        { value: "1", label: "실제사업주(동업자포함)" },
        { value: "2", label: "하수급사업주" }
    ];

    const familyStatusOptions = [
        { value: "0", label: "해당없음" },
        { value: "1", label: "배우자" },
        { value: "2", label: "부모" },
        { value: "3", label: "자녀" },
        { value: "4", label: "형제자매" },
        { value: "5", label: "기타 친인척" }
    ];

    const applyCategoryOptions = [
        { value: "0", label: "업무상 사고" },
        { value: "1", label: "업무상 질병" },
        { value: "2", label: "출퇴근 재해" }
    ];

    // 팝업 상태 관리
    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState("");
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    // 팝업이 표시되면 5초 후에 자동으로 사라지게 하기
    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showPopup]);

    // 주소 검색에서 돌아왔을 때 주소 설정
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

    // 컴포넌트가 언마운트될 때 현재 입력값을 context에 저장
    useEffect(() => {
        return () => {
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
                medical_addr1: medicalAddr
            });
        };
    }, [name, foreignerRegNum1, foreignerRegNum2, phone, address, accidentDate, accidentTime, hireDate, workStartTime, workEndTime, jobType, businessOwnerStatus, familyStatus, applyCategory, compName, bossName, compContact, businessNum, compAddr, disasterDetails, policeReport, emergencyReport, insuranceReport, witnessName, witnessContact, witnessRelation, medicalName, medicalAddr]);

    // 스크롤 감지 useEffect
    useEffect(() => {
        const handleScroll = () => {
            // 이미 한 번 스크롤했다면 더 이상 체크하지 않음
            if (isScrolledToBottom) return;
            
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // 맨 하단에서 100px 이내에 도달했을 때 활성화
            const isAtBottom = scrollTop + windowHeight >= documentHeight - 100;
            if (isAtBottom) {
                setIsScrolledToBottom(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        // 컴포넌트 마운트 시 초기 체크
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrolledToBottom]);

    // 주소 검색 버튼 핸들러
    const handleAddressSearch = (fieldName: string) => {
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
            job_type: jobType,
            apply_category: applyCategory,
            comp_name: compName,
            boss_name: bossName,
            comp_contact: compContact,
            bussiness_num: businessNum,
            comp_addr: compAddr
        });

        navigate('/medi-address-1', {
            state: {
                returnPath: '/medicare-guide-flow',
                returnToStep: currentStep,
                fieldName: fieldName
            }
        });
    };

    const handleBusinessNumSearch = () => {
        window.open('https://www.comwel.or.kr/comwel/info/cont/cont.jsp', '_blank', 'noopener,noreferrer');
    };

    const handleNext = () => {
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
            <Header title="최초 요양 급여 신청서 연습" showHomebtn={true} onBack={onBack}/>
            <div className="medi-guide-title">
                <h2>모든 정보를 꼼꼼히 확인해주세요.</h2>
            </div>
            
            <div>
                {/* 1페이지 폼 요소들 */}
                <div style={{ marginBottom: '-30px' }}>
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
                                        value={foreignerRegNum1}
                                        onChange={(e) => setForeignerRegNum1(e.target.value)}
                                        maxLength={8}
                                    />
                                    <span className="hyphen">-</span>
                                    <input 
                                        type="text" 
                                        className="form-input registration-part" 
                                        value={foreignerRegNum2}
                                        onChange={(e) => setForeignerRegNum2(e.target.value)}
                                        maxLength={8}
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
                                        onClick={() => handleAddressSearch('address')}
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
                </div>

                {/* 2페이지 폼 요소들 */}
                <div style={{ marginBottom: '-60px' }}>
                    <div className="medi-guide-content">
                        <form className="info-form">
                            {/* 보험가입자(사업주)와의 관계 섹션 */}
                            <div className="medi-2-form-section">
                                <div className="medi-2-form-label">
                                    <label>보험가입자(사업주)와의 관계</label>
                                </div>
                                <div className="medi-2-form-sub-label">
                                    <span>사업주여부</span>
                                </div>
                                <CustomSelect
                                    options={businessOwnerOptions}
                                    value={businessOwnerStatus}
                                    onChange={setBusinessOwnerStatus}
                                    placeholder="사업주 여부를 선택해 주세요."
                                    className="medi-2-form-select"
                                />
                            </div>

                            {/* 친인척여부 섹션 */}
                            <div className="medi-2-form-section">
                                <div className="medi-2-form-sub-label">
                                    <label>친인척여부</label>
                                </div>
                                <CustomSelect
                                    options={familyStatusOptions}
                                    value={familyStatus}
                                    onChange={setFamilyStatus}
                                    placeholder="친인척 여부를 선택해 주세요."
                                    className="medi-2-form-select"
                                />
                            </div>
                        </form>
                    </div>
                </div>

                {/* 3페이지 폼 요소들 */}
                <div style={{ marginBottom: '-40px' }}>
                    <div className="medi-guide-content">
                        <form className="info-form">
                            <div className="medi-2-form-section">
                                <div className="medi-2-form-sub-label">
                                    <span>신청 구분</span>
                                </div>
                                <CustomSelect
                                    options={applyCategoryOptions}
                                    value={applyCategory}
                                    onChange={setApplyCategory}
                                    placeholder="신청 구분을 선택해 주세요."
                                    className="medi-2-form-select"
                                />
                            </div>
                            <div className="form-section">
                                <div className="form-label">
                                    <label>사업장명</label>
                                    <img 
                                        src="/info_square.png" 
                                        alt="info-icon"
                                        onClick={(e) => handleInfoClick("사업장명을 입력해주세요!", e)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="사업장명을 입력하세요"
                                    value={compName}
                                    onChange={(e) => setCompName(e.target.value)}
                                />
                            </div>
                            <div className="form-section">
                                <div className="form-label">
                                    <label>사업주명</label>
                                    <img 
                                        src="/info_square.png" 
                                        alt="info-icon"
                                        onClick={(e) => handleInfoClick("사업주명을 입력해주세요!", e)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="사업주명을 입력하세요"
                                    value={bossName}
                                    onChange={(e) => setBossName(e.target.value)}
                                />
                            </div>
                            <div className="form-section">
                                <div className="form-label">
                                    <label>연락처</label>
                                    <img 
                                        src="/info_square.png" 
                                        alt="info-icon"
                                        onClick={(e) => handleInfoClick("연락처를 입력해주세요!", e)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="연락처를 입력하세요"
                                    value={compContact}
                                    onChange={(e) => setCompContact(e.target.value)}
                                />
                            </div>
                            <div className="form-section">
                                <div className="form-label">
                                    <label>사업장관리번호</label>
                                    <img 
                                        src="/info_square.png" 
                                        alt="info-icon"
                                        onClick={(e) => handleInfoClick("사업장관리번호를 입력해주세요!", e)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <div className="address-input-container">
                                    <input 
                                        type="text" 
                                        className="form-input address-input" 
                                        placeholder="사업장관리번호를 입력하세요"
                                        value={businessNum}
                                        onChange={(e) => setBusinessNum(e.target.value)}
                                    />
                                    <button 
                                        type="button" 
                                        className="address-search-btn" 
                                        onClick={handleBusinessNumSearch}
                                    >
                                        번호 검색
                                    </button>
                                </div>
                            </div>
                            <div className="form-section">
                                <div className="form-label">
                                    <label>사업장주소</label>
                                    <img 
                                        src="/info_square.png" 
                                        alt="info-icon"
                                        onClick={(e) => handleInfoClick("사업장주소를 입력해주세요!", e)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <div className="address-input-container">
                                    <input 
                                        type="text" 
                                        className="form-input address-input" 
                                        placeholder="사업장주소를 입력하세요"
                                        value={compAddr}
                                        onChange={(e) => setCompAddr(e.target.value)}
                                    />
                                    <button 
                                        type="button" 
                                        className="address-search-btn"
                                        onClick={() => handleAddressSearch('compAddr')}
                                    >
                                        주소 검색
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* 4페이지 폼 요소들 */}
                <div>
                    <div className="medi-4-form-container">
                        <div className="medi-4-section-header">
                            <h3>재해 발생 경위</h3>
                            <img 
                                src="/info_square.png" 
                                alt="info-icon"
                                onClick={(e) => handleInfoClick("재해 발생 경위를 자세히 입력해주세요!", e)}
                                style={{ cursor: 'pointer' }}
                            />
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
                </div>

                {/* 5페이지 폼 요소들 */}
                <div>
                    <div className="medi-guide-content">
                        <form className="info-form">
                            <div className="medi-5-form-sub-label">
                                <span>목격자가 있는 경우</span>
                            </div>
                            <div className="form-section">
                                <div className="form-label">
                                    <label>이름</label>
                                    <img 
                                        src="/info_square.png" 
                                        alt="info-icon"
                                        onClick={(e) => handleInfoClick("목격자의 이름을 입력해주세요!", e)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="이름을 입력하세요"
                                    value={witnessName}
                                    onChange={(e) => setWitnessName(e.target.value)}
                                />
                            </div>
                            <div className="form-section">
                                <div className="form-label">
                                    <label>연락처</label>
                                    <img 
                                        src="/info_square.png" 
                                        alt="info-icon"
                                        onClick={(e) => handleInfoClick("목격자의 연락처를 입력해주세요!", e)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="연락처를 입력하세요"
                                    value={witnessContact}
                                    onChange={(e) => setWitnessContact(e.target.value)}
                                />
                            </div>
                            <div className="form-section">
                                <div className="form-label">
                                    <label>재해자와의 관계</label>
                                    <img 
                                        src="/info_square.png" 
                                        alt="info-icon"
                                        onClick={(e) => handleInfoClick("재해자와의 관계를 입력해주세요!", e)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="재해자와의 관계를 입력하세요"
                                    value={witnessRelation}
                                    onChange={(e) => setWitnessRelation(e.target.value)}
                                />
                            </div>
                            <div className="medi-5-form-sub-label">
                                <span>재해 발생 후 현재 요양 중인 의료기관 전에 진료(치료)받은 의료기관</span>
                            </div>
                            <div className="form-section">
                                <div className="form-label">
                                    <label>의료기관명</label>
                                    <img 
                                        src="/info_square.png" 
                                        alt="info-icon"
                                        onClick={(e) => handleInfoClick("의료기관명을 입력해주세요!", e)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="의료기관명을 입력하세요"
                                    value={medicalName}
                                    onChange={(e) => setMedicalName(e.target.value)}
                                />
                            </div>
                            <div className="form-section">
                                <div className="form-label">
                                    <label>소재지</label>
                                    <img 
                                        src="/info_square.png" 
                                        alt="info-icon"
                                        onClick={(e) => handleInfoClick("의료기관 소재지를 입력해주세요!", e)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="소재지를 입력하세요"
                                    value={medicalAddr}
                                    onChange={(e) => setMedicalAddr(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="save-button-container">
                <ContinueButton 
                    text={isScrolledToBottom ? "확인 완료" : "내용을 모두 확인해주세요"} 
                    onClick={handleNext}
                    disabled={!isScrolledToBottom}
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
    )
}

export default MediGuidePage6;
