import { useState } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import "./Medi-GuidePage-2.css";

interface MediGuidePage2Props {
    onNext?: () => void;
    onBack?: () => void;
}

const MediGuidePage2 = ({ onNext, onBack }: MediGuidePage2Props) => {
    const { formData, updateFormData } = useFormData();
    
    const [businessOwnerStatus, setBusinessOwnerStatus] = useState(formData.bussiness_owner_status || "");
    const [familyStatus, setFamilyStatus] = useState(formData.family_status || "");

    // 사업주 여부 옵션
    const businessOwnerOptions = [
        { value: "0", label: "해당없음" },
        { value: "1", label: "실제사업주(동업자포함)" },
        { value: "2", label: "하수급사업주" }
    ];

    // 친인척 여부 옵션
    const familyStatusOptions = [
        { value: "0", label: "해당없음" },
        { value: "1", label: "배우자" },
        { value: "2", label: "부모" },
        { value: "3", label: "자녀" },
        { value: "4", label: "형제자매" },
        { value: "5", label: "기타 친인척" }
    ];

    // 사업주 여부와 친인척 여부가 모두 선택되었는지 확인
    const isButtonDisabled = businessOwnerStatus === "" || familyStatus === "";

    const handleNext = () => {
        updateFormData({
            bussiness_owner_status: businessOwnerStatus,
            family_status: familyStatus,
        });
        
        onNext?.();
    };

    return (
        <div className="app">
            <Header title="최초 요양 급여 신청서 연습" onBack={onBack} showHomebtn={true}/>
            <div className="medi-guide-title">
                <h2>정보를 입력해 주세요.</h2>
            </div>
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

                    {/* 근로자유형 섹션 */}
                    {/* <div className="medi-2-form-section">
                        <div className="medi-2-form-sub-label">
                            <label>근로자유형</label>
                        </div>
                        <select 
                            className="medi-2-form-select"
                            value={workerType}
                            onChange={(e) => setWorkerType(e.target.value)}
                        >
                            <option value="" disabled>근로자 유형</option>
                            <option value="0">근로자</option>
                            <option value="1">노무제공자</option>
                            <option value="2">중소기업사업주</option>
                        </select>
                    </div> */}
                </form>
            </div>
            <div className="save-button-container">
                <ContinueButton 
                    text="다음" 
                    onClick={handleNext} 
                />
            </div>
        </div>
    )
}

export default MediGuidePage2;