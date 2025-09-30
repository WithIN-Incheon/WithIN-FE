import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import "./Medi-GuidePage-1.css";
import "./Medi-GuidePage-2.css";
import "./Medi-GuidePage-4.css";
import "./Medi-GuidePage-5.css";

interface MediGuidePage6Props {
    onNext?: () => void;
    onBack?: () => void;
}

const MediGuidePage6 = ({ onNext, onBack }: MediGuidePage6Props) => {
    return (
        <div className="app">
            <Header title="요양 급여 신청 가이드" />
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
                </div>

                {/* 3페이지 폼 요소들 */}
                <div style={{ marginBottom: '-40px' }}>
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
                </div>

                {/* 4페이지 폼 요소들 */}
                <div>
                    <div className="medi-4-form-container">
                        <div className="medi-4-section-header">
                            <h3>재해 발생 경위</h3>
                            <div className="medi-4-info-icon">i</div>
                        </div>
                        <p className="medi-4-instruction-text">
                            내용이 많은 경우 다른 종이에 적으시는 걸 추천드립니다.
                        </p>
                        
                        <div className="medi-4-text-input-container">
                            <textarea
                                className="medi-4-disaster-details-input"
                                placeholder=""
                                maxLength={1000}
                            />
                            <div className="medi-4-character-count">
                                0/1000
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
                                            value="yes"
                                        />
                                        <span className="medi-4-radio-label">예</span>
                                    </label>
                                    <label className="medi-4-radio-option">
                                        <input
                                            type="radio"
                                            name="policeReport"
                                            value="no"
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
                                            value="yes"
                                        />
                                        <span className="medi-4-radio-label">예</span>
                                    </label>
                                    <label className="medi-4-radio-option">
                                        <input
                                            type="radio"
                                            name="emergencyReport"
                                            value="no"
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
                                            value="yes"
                                        />
                                        <span className="medi-4-radio-label">예</span>
                                    </label>
                                    <label className="medi-4-radio-option">
                                        <input
                                            type="radio"
                                            name="insuranceReport"
                                            value="no"
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
                                    <div className="info-icon">ⓘ</div>
                                </div>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="이름을 입력하세요"
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
                                    <label>재해자와의 관계</label>
                                    <div className="info-icon">ⓘ</div>
                                </div>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="재해자와의 관계를 입력하세요"
                                />
                            </div>
                            <div className="medi-5-form-sub-label">
                                <span>재해 발생 후 현재 요양 중인 의료기관 전에 진료(치료)받은 의료기관</span>
                            </div>
                            <div className="form-section">
                                <div className="form-label">
                                    <label>의료기관명</label>
                                    <div className="info-icon">ⓘ</div>
                                </div>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="의료기관명을 입력하세요"
                                />
                            </div>
                            <div className="form-section">
                                <div className="form-label">
                                    <label>소재지</label>
                                    <div className="info-icon">ⓘ</div>
                                </div>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="소재지를 입력하세요"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="save-button-container">
                <ContinueButton text="확인 완료" onClick={onNext || (() => {})} />
            </div>
        </div>
    )
}

export default MediGuidePage6;
