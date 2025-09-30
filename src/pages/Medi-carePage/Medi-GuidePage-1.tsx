import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import "./Medi-GuidePage-1.css";

interface MediGuidePage1Props {
    onNext?: () => void;
    onBack?: () => void;
}

const MediGuidePage1 = ({ onNext, onBack }: MediGuidePage1Props) => {
    return (
        <div className="app">
            <Header title="요양 급여 신청 가이드" />
            <div className="medi-guide-title">
                <h2>정보를 입력해 주세요.</h2>
            </div>
            <div className="medi-guide-content">
                <form className="info-form">
                    {/* 이름 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>이름</label>
                            <div className="info-icon">ⓘ</div>
                        </div>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="이름을 입력하세요"
                            defaultValue="JOHN AJJOGU"
                        />
                    </div>

                    {/* 외국인등록번호 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>외국인등록번호</label>
                            <div className="info-icon">ⓘ</div>
                        </div>
                        <div className="registration-number-input">
                            <input 
                                type="text" 
                                className="form-input registration-part" 
                                defaultValue="02504938"
                                maxLength={8}
                            />
                            <span className="hyphen">-</span>
                            <input 
                                type="text" 
                                className="form-input registration-part" 
                                defaultValue="02504938"
                                maxLength={8}
                            />
                        </div>
                    </div>

                    {/* 전화번호 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>전화번호</label>
                            <div className="info-icon">ⓘ</div>
                        </div>
                        <input 
                            type="tel" 
                            className="form-input" 
                            placeholder="010-0000-0000"
                            defaultValue="010-3482-4009"
                        />
                    </div>

                    {/* 주소 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>주소</label>
                            <div className="info-icon">ⓘ</div>
                        </div>
                        <div className="address-input-container">
                            <input 
                                type="text" 
                                className="form-input address-input" 
                                placeholder="주소를 입력하세요"
                            />
                            <button type="button" className="address-search-btn">주소 검색</button>
                        </div>
                    </div>

                    {/* 재해발생일시 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>재해발생일시</label>
                            <div className="info-icon">ⓘ</div>
                        </div>
                        <div className="datetime-input">
                            <input 
                                type="date" 
                                className="form-input date-input" 
                                placeholder="YYYY-MM-DD"
                            />
                            <input 
                                type="time" 
                                className="form-input time-input" 
                                placeholder="00:00"
                            />
                        </div>
                    </div>

                    {/* 채용일자 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>채용일자</label>
                            <div className="info-icon">ⓘ</div>
                        </div>
                        <input 
                            type="date" 
                            className="form-input" 
                            placeholder="YYYY-MM-DD"
                        />
                    </div>

                    {/* 출근 시작/퇴근 시간 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>출근 시작/퇴근 시간</label>
                            <div className="info-icon">ⓘ</div>
                        </div>
                        <div className="work-time-input">
                            <input 
                                type="time" 
                                className="form-input time-input" 
                                placeholder="00:00"
                            />
                            <span className="hyphen">-</span>
                            <input 
                                type="time" 
                                className="form-input time-input" 
                                placeholder="00:00"
                            />
                        </div>
                    </div>

                    {/* 직종 섹션 */}
                    <div className="form-section">
                        <div className="form-label">
                            <label>직종</label>
                            <div className="info-icon">ⓘ</div>
                        </div>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="직종을 입력하세요"
                        />
                    </div>
                </form>
            </div>
            <div className="save-button-container">
                <ContinueButton text="다음" onClick={onNext || (() => {})} />
            </div>
        </div>
    )
}

export default MediGuidePage1;