import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import "./Medi-GuidePage-2.css";

interface MediGuidePage2Props {
    onNext?: () => void;
    onBack?: () => void;
}

const MediGuidePage2 = ({ onNext, onBack }: MediGuidePage2Props) => {
    return (
        <div className="app">
            <Header title="요양 급여 신청 가이드" />
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
                        <select className="medi-2-form-select">
                            <option value="" disabled selected>사업주 여부</option>
                            <option value="0">해당없음</option>
                            <option value="1">실제사업주(동업자포함)</option>
                            <option value="2">하수급사업주</option>
                        </select>
                    </div>

                    {/* 친인척여부 섹션 */}
                    <div className="medi-2-form-section">
                        <div className="medi-2-form-sub-label">
                            <label>친인척여부</label>
                        </div>
                        <select className="medi-2-form-select">
                            <option value="" disabled selected>친인척 여부</option>
                            <option value="0">해당없음</option>
                            <option value="1">실제사업주(동업자포함)</option>
                            <option value="2">하수급사업주</option>
                        </select>
                    </div>

                    {/* 근로자유형 섹션 */}
                    <div className="medi-2-form-section">
                        <div className="medi-2-form-sub-label">
                            <label>근로자유형</label>
                        </div>
                        <select className="medi-2-form-select">
                            <option value="" disabled selected>근로자 유형</option>
                            <option value="0">근로자</option>
                            <option value="1">노무제공자</option>
                            <option value="2">중소기업사업주</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="save-button-container">
                <ContinueButton text="다음" onClick={onNext || (() => {})} />
            </div>
        </div>
    )
}

export default MediGuidePage2;