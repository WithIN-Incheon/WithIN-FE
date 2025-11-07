// src/pages/Comp-GuidePage/GuidePage.tsx
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
        <div className="guide-photo-group">
          {/* 카드 1 */}
          <div
            className="guide-photo-item"
            onClick={() => navigate("/info")}
          >
            <img
              className="guide-shadow-img"
              src="/Guide/Information-box.svg"
              alt="산업재해 정보 가이드"
            />
            <div className="guide-photo-text">
              <div className="guide-comp-title">{t("guideInfo")}</div>
              <div className="guide-comp-subtitle">{t("guideIntroduce")}</div>
            </div>
          </div>

          {/* 카드 2 */}
          <div
            className="guide-photo-item"
            onClick={() => navigate("/medicare")}
          >
            <img
              className="guide-shadow-img"
              src="/Guide/Guide-box.svg"
              alt="최초 요양 급여 신청서 연습"
            />
            <div className="guide-photo-text">
              <div className="guide-comp-title">{t("guidePractice")}</div>
              <div className="guide-comp-subtitle">
                {t("guidePreview")}
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomBar />
    </div>
  );
}
