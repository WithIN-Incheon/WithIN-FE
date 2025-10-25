import { useState, useEffect } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import MediPopup from "./Medi-popup";
import "./Medi-popup.css";

interface MediGuidePage3Props {
    onNext?: () => void;
    onBack?: () => void;
    currentStep?: number;
}

const MediGuidePage3 = ({ onNext, onBack, currentStep = 3 }: MediGuidePage3Props) => {
    const { formData, updateFormData } = useFormData();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [applyCategory, setApplyCategory] = useState(formData.apply_category || "");
    const [compName, setCompName] = useState(formData.comp_name || "");
    const [bossName, setBossName] = useState(formData.boss_name || "");
    const [compContact, setCompContact] = useState(formData.comp_contact || "");
    const [businessNum, setBusinessNum] = useState(formData.bussiness_num || "");
    const [compAddr, setCompAddr] = useState(formData.comp_addr || "");
    
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

    // 신청 구분이 선택되었는지 확인
    const isButtonDisabled = applyCategory === "";

    // 주소 검색에서 돌아왔을 때 주소 설정
    useEffect(() => {
        if (location.state?.compAddr) {
            setCompAddr(location.state.compAddr);
            // 주소가 설정되면 즉시 context에도 저장
            updateFormData({ comp_addr: location.state.compAddr });
            // state 초기화 (재사용 방지)
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // 컴포넌트가 언마운트될 때 현재 입력값을 context에 저장
    useEffect(() => {
        return () => {
            updateFormData({
                apply_category: applyCategory,
                comp_name: compName,
                boss_name: bossName,
                comp_contact: compContact,
                bussiness_num: businessNum,
                comp_addr: compAddr
            });
        };
    }, [applyCategory, compName, bossName, compContact, businessNum, compAddr]);

    // 주소 검색 버튼 핸들러
    const handleAddressSearch = () => {
        // 주소 검색 페이지로 이동하기 전에 현재 입력값을 context에 저장
        updateFormData({
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
                fieldName: 'compAddr'
            }
        });
    };

    const handleNext = () => {
        updateFormData({
            apply_category: applyCategory,
            comp_name: compName,
            boss_name: bossName,
            comp_contact: compContact,
            bussiness_num: businessNum,
            comp_addr: compAddr
        });
        
        onNext?.();
    };

    const handleBusinessNumSearch = () => {
        window.open('https://www.comwel.or.kr/comwel/info/cont/cont.jsp', '_blank', 'noopener,noreferrer');
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
                    <div className="medi-2-form-section">
                        <div className="medi-2-form-sub-label">
                            <span>신청 구분</span>
                        </div>
                        <select 
                            className="medi-2-form-select"
                            value={applyCategory}
                            onChange={(e) => setApplyCategory(e.target.value)}
                        >
                            <option value="" disabled>신청 구분을 선택해 주세요.</option>
                            <option value="0">업무상 사고</option>
                            <option value="1">업무상 질병</option>
                            <option value="2">출퇴근 재해</option>
                        </select>
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
                            <button type="button" className="address-search-btn" onClick={handleBusinessNumSearch}>번호 검색</button>
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
                                onClick={handleAddressSearch}
                            >
                                주소 검색
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="save-button-container">
                <ContinueButton 
                    text="다음" 
                    onClick={handleNext} 
                    disabled={isButtonDisabled}
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

export default MediGuidePage3;