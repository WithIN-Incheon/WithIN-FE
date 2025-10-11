import { useState } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";

interface MediGuidePage3Props {
    onNext?: () => void;
    onBack?: () => void;
}

const MediGuidePage3 = ({ onNext, onBack }: MediGuidePage3Props) => {
    const { formData, updateFormData } = useFormData();
    
    const [applyCategory, setApplyCategory] = useState(formData.apply_category || "");
    const [compName, setCompName] = useState(formData.comp_name || "");
    const [bossName, setBossName] = useState(formData.boss_name || "");
    const [compContact, setCompContact] = useState(formData.comp_contact || "");
    const [businessNum, setBusinessNum] = useState(formData.bussiness_num || "");
    const [compAddr, setCompAddr] = useState(formData.comp_addr || "");

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

    return (
        <div className="app">
            <Header title="요양 급여 신청 가이드" onBack={onBack}/>
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
                            <option value="" disabled>신청 구분</option>
                            <option value="0">업무상 사고</option>
                            <option value="1">업무상 질병</option>
                            <option value="2">출퇴근 재해</option>
                        </select>
                    </div>
                    <div className="form-section">
                        <div className="form-label">
                            <label>사업장명</label>
                            <img src="/info_square.png" alt="info-icon" />
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
                            <img src="/info_square.png" alt="info-icon" />
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
                            <img src="/info_square.png" alt="info-icon" />
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
                            <img src="/info_square.png" alt="info-icon" />
                        </div>
                        <div className="address-input-container">
                            <input 
                                type="text" 
                                className="form-input address-input" 
                                placeholder="사업장관리번호를 입력하세요"
                                value={businessNum}
                                onChange={(e) => setBusinessNum(e.target.value)}
                            />
                            <button type="button" className="address-search-btn">번호 검색</button>
                        </div>
                    </div>
                    <div className="form-section">
                        <div className="form-label">
                            <label>사업장주소</label>
                            <img src="/info_square.png" alt="info-icon" />
                        </div>
                        <div className="address-input-container">
                            <input 
                                type="text" 
                                className="form-input address-input" 
                                placeholder="사업장주소를 입력하세요"
                                value={compAddr}
                                onChange={(e) => setCompAddr(e.target.value)}
                            />
                            <button type="button" className="address-search-btn">주소 검색</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="save-button-container">
                <ContinueButton text="다음" onClick={handleNext} />
            </div>
        </div>
    )
}

export default MediGuidePage3;