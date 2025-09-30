import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";

interface MediGuidePage3Props {
    onNext?: () => void;
    onBack?: () => void;
}

const MediGuidePage3 = ({ onNext, onBack }: MediGuidePage3Props) => {
    return (
        <div className="app">
            <Header title="요양 급여 신청 가이드" />
            <div className="medi-guide-title">
                <h2>정보를 입력해 주세요.</h2>
            </div>
            <div className="medi-guide-content">
                <form className="info-form">
                    <div className="medi-2-form-section">
                        <div className="medi-2-form-sub-label">
                            <span>신청 구분</span>
                        </div>
                        <select className="medi-2-form-select">
                            <option value="" disabled selected>신청 구분</option>
                            <option value="0">업무상 사고</option>
                            <option value="1">업무상 질병</option>
                            <option value="2">출퇴근 재해</option>
                        </select>
                    </div>
                    <div className="form-section">
                        <div className="form-label">
                            <label>사업장명</label>
                            <div className="info-icon">ⓘ</div>
                        </div>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="사업장명을 입력하세요"
                        />
                    </div>
                    <div className="form-section">
                        <div className="form-label">
                            <label>사업주명</label>
                            <div className="info-icon">ⓘ</div>
                        </div>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="사업주명을 입력하세요"
                        />
                    </div>
                    <div className="form-section">
                        <div className="form-label">
                            <label>연락처</label>
                            <div className="info-icon">ⓘ</div>
                        </div>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="연락처를 입력하세요"
                        />
                    </div>
                    <div className="form-section">
                        <div className="form-label">
                            <label>사업장관리번호</label>
                            <div className="info-icon">ⓘ</div>
                        </div>
                        <div className="address-input-container">
                            <input 
                                type="text" 
                                className="form-input address-input" 
                                placeholder="사업장관리번호를 입력하세요"
                            />
                            <button type="button" className="address-search-btn">번호 검색</button>
                        </div>
                    </div>
                    <div className="form-section">
                        <div className="form-label">
                            <label>사업장주소</label>
                            <div className="info-icon">ⓘ</div>
                        </div>
                        <div className="address-input-container">
                            <input 
                                type="text" 
                                className="form-input address-input" 
                                placeholder="사업장주소를 입력하세요"
                            />
                            <button type="button" className="address-search-btn">주소 검색</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="save-button-container">
                <ContinueButton text="다음" onClick={onNext || (() => {})} />
            </div>
        </div>
    )
}

export default MediGuidePage3;