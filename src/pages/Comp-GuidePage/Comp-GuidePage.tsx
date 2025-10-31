// 산재신청가이드페이지
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { useNavigate } from "react-router-dom";
import "./Comp-GuidePage.css";

export default function GuidePage() {
  const navigate = useNavigate();

  return (
    <div className="guide-page">
      <Header title="산재 신청 가이드" />

<main className="guide-content">
  <div className="guide-header">
    <h2 className="guide-title">산업재해와 관련된<br/>어떤 도움이 필요하세요?</h2>
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



