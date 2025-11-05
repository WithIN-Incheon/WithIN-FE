// 산재신청가이드페이지
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { useNavigate } from "react-router-dom";
import "./Comp-GuidePage.css";
import { useLocalization } from "../../contexts/LocalizationContext";

export default function GuidePage() {
  const navigate = useNavigate();
  const { t } = useLocalization();
  return (
    <div className="guide-page">
      <Header title="산재 신청 가이드" />

<main className="guide-content">
  <div className="guide-header">
    <h2 className="guide-title">{t('guideHelp1')}<br/>{t('guideHelp2')}</h2>
  </div>

  <div className="guide-cards">
    {/* 이미지가 아닌걸로 수정해야함 일단 */}
    <img
      className="guide-card"
      src="/Guide/Information-box.svg"
      alt="산재 정보"
      onClick={() => navigate("/info")}
    />
    <img
      className="guide-card"
      src="/Guide/Guide-box.svg"
      alt="요양 급여 신청 가이드"
      onClick={() => navigate("/medicare")}
    />
  </div>
</main>


      <BottomBar />
    </div>
  );
}



