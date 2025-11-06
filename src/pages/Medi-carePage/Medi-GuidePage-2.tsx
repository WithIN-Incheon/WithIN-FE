import { useState } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import { useLocalization } from "../../contexts/LocalizationContext";
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
    const { t } = useLocalization();
    
    const [businessOwnerStatus, setBusinessOwnerStatus] = useState(formData.bussiness_owner_status || "");
    const [familyStatus, setFamilyStatus] = useState(formData.family_status || "");

    // 사업주 여부 옵션
    const businessOwnerOptions = [
        { value: "0", label: t('applyNone') },
        { value: "1", label: t('applyRealBoss') },
        { value: "2", label: t('applyFakeBoss') }
    ];

    // 친인척 여부 옵션
    const familyStatusOptions = [
        { value: "0", label: t('applyNone') },
        { value: "1", label: t('applyMarry') },
        { value: "2", label: t('applyParents') },
        { value: "3", label: t('applySon') },
        { value: "4", label: t('applySilblings') },
        { value: "5", label: t('applyGuitar') }
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
            <Header title={t('guidePractice')} onBack={onBack} showHomebtn={true}/>
            <div className="medi-guide-title">
                <h2>{t('applyInfo2')}</h2>
            </div>
            <div className="medi-guide-content">
                <form className="info-form">
                    {/* 보험가입자(사업주)와의 관계 섹션 */}
                    <div className="medi-2-form-section">
                        <div className="medi-2-form-label">
                            <label>{t('applyBossRelation')}</label>
                        </div>
                        <div className="medi-2-form-sub-label">
                            <span>{t('applyBossRelation')}</span>
                        </div>
                        <CustomSelect
                            options={businessOwnerOptions}
                            value={businessOwnerStatus}
                            onChange={setBusinessOwnerStatus}
                            placeholder={t('applyChooseBoss')}
                            className="medi-2-form-select"
                        />
                    </div>

                    {/* 친인척여부 섹션 */}
                    <div className="medi-2-form-section">
                        <div className="medi-2-form-sub-label">
                            <label>{t('applyFamily')}</label>
                        </div>
                        <CustomSelect
                            options={familyStatusOptions}
                            value={familyStatus}
                            onChange={setFamilyStatus}
                            placeholder={t('applyChooseFamily')}
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
                    text={t('applyNext')} 
                    onClick={handleNext} 
                />
            </div>
        </div>
    )
}

export default MediGuidePage2;