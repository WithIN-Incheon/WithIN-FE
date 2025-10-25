import { useState, useEffect } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import MediPopup from "./Medi-popup";
import "./Medi-GuidePage-5.css";
import "./Medi-popup.css";

interface MediGuidePage5Props {
    onNext?: () => void;
    onBack?: () => void;
}

const MediGuidePage5 = ({ onNext, onBack }: MediGuidePage5Props) => {
    const { formData, updateFormData } = useFormData();
    
    const [witnessName, setWitnessName] = useState(formData.witness_name || "");
    const [witnessContact, setWitnessContact] = useState(formData.witness_contact || "");
    const [witnessRelation, setWitnessRelation] = useState(formData.witness_relation || "");
    const [medicalName, setMedicalName] = useState(formData.medical_name1 || "");
    const [medicalAddr, setMedicalAddr] = useState(formData.medical_addr1 || "");
    
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

    const handleNext = () => {
        updateFormData({
            witness_name: witnessName,
            witness_contact: witnessContact,
            witness_relation: witnessRelation,
            medical_name1: medicalName,
            medical_addr1: medicalAddr
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
            <div className="save-button-container">
                <ContinueButton text="완료" onClick={handleNext} />
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

export default MediGuidePage5;