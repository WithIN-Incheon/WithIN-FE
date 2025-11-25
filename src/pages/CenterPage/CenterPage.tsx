import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import "./CenterPage.css";

export default function CenterPage() {
  return (
    <div className="center-page">
      <Header title="센터 소개" />

      <main className="center-content">
        {/* 메인 타이틀 */}
        <h1 className="main-title">센터 소개 (Center Info)</h1>

        {/* 인천외국인종합지원센터 */}
        <h2 className="center-subtitle hl">인천외국인종합지원센터</h2>

        {/* 로고 및 설명 */}
        <div className="center-logo-wrap">
          <img
            src="/Logo-Center.svg"
            alt="인천외국인종합지원센터 로고"
            className="center-logo"
          />
          <p className="center-desc">
            Incheon Support Center for Foreign Residents
          </p>
        </div>

        {/* 센터 정보 안내 */}
        <h2 className="center-subtitle hl">센터 정보 안내</h2>

        {/* 정보 박스들 */}
        <div className="info-box">
          <p className="info-text">TEL: 1833-6333</p>
        </div>

        <div className="info-box">
          <p className="info-text">
            주소: 인천광역시 남동구 예술로 192번길 40, 8층 <br />
            Address: 8F, 40, Yesul-ro 192beon-gil, Namdong-gu, Incheon, Republic of Korea
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=인천광역시 남동구 구월동 인천외국인종합지원센터"
            target="_blank"
            rel="noreferrer"
            className="icon-link"
          >
            <img src="/link-icon.svg" alt="링크 아이콘" />
          </a>
        </div>

        <div className="info-box">
          <p className="info-text">Web: https://www.icff.or.kr/</p>
          <a
            href="https://www.icff.or.kr/"
            target="_blank"
            rel="noreferrer"
            className="icon-link"
          >
            <img src="/link-icon.svg" alt="링크 아이콘" />
          </a>
        </div>

        <div className="bottom-spacer" />
      </main>

      <BottomBar />
    </div>
  );
}
