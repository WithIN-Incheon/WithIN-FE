// 지원 센터 정보
import Header from "../../../components/Header/Header";
import BottomBar from "../../../components/BottomBar/BottomBar";
import "./InfoCenterPage.css";

type CenterItemProps = {
  logoSrc: string;
  title: string;
  tel: string;
  web: string;
};

function CenterItem({ logoSrc, title, tel, web }: CenterItemProps) {
  return (
    <div className="center-item">
      <img className="center-item_logo" src={logoSrc} alt="" width={90} height={91} />
      <div className="center-item_text">
        <div className="center-item_title">{title}</div>
        <div className="center-item_meta">
          <div>Tel: {tel}</div>
          <div>
            Web:{" "}
            <a href={web} target="_blank" rel="noopener noreferrer">
              {web}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InfoCenterPage() {
  return (
    <div className="center-page">
      <Header title="지원센터 안내" />

      <main className="center-content">
        {/* 페이지 타이틀 */}
        <h1 className="center-title">인천 내 지원센터 안내</h1>

        {/* 섹션: 노동·법률 지원 */}
        <h2 className="section-title hl mt-37">지원센터(노동·법률 지원)</h2>
        <div className="center-list">
          <CenterItem
            logoSrc="/Info/iscfr-logo.svg"
            title="인천외국인종합지원센터"
            tel="1833-6333"
            web="https://www.iscfr.or.kr/"
          />
          <CenterItem
            logoSrc="/Info/icff-logo.svg"
            title="인천외국인근로자지원센터"
            tel="032-231-4545"
            web="https://www.icff.or.kr/"
          />
        </div>

        {/* 섹션: 생활·복지 */}
        <h2 className="section-title hl mt-35">지원센터(생활·복지)</h2>
        <div className="center-list">
          <CenterItem
            logoSrc="/Info/NoImage.svg"
            title="근로복지공단 경인본부"
            tel="1644-3185"
            web="https://www.comwel.or.kr/comwel/intr/orgn/totl.jsp"
          />
        </div>
      </main>

      <BottomBar />
    </div>
  );
}
