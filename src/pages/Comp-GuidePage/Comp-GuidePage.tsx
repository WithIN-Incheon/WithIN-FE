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
      <Header title={t("mainIndustry")} />

      <main className="guide-content">
        <div className="guide-photo-group">

          {/* 카드 1 — 텍스트 왼쪽 / 로고 오른쪽 */}
          <div className="guide-photo-item" onClick={() => navigate("/info")}>
            <div className="guide-card-bg guide-flex">
              <div className="guide-photo-text">
                <div className="guide-comp-title">{t("guideInfo")}</div>
                <div className="guide-comp-subtitle">{t("guideIntroduce")}</div>
              </div>

              <img
                className="guide-logo"
                src="/Guide/Information-logo.svg"
                alt="Information Logo"
              />

              {/* 오른쪽 화살표 */}
              <img
                className="guide-arrow"
                src="/arrow-gray.svg"
                alt="arrow"
              />
            </div>
          </div>

          {/* 카드 2 — 로고는 아래 깔리고 글자 위로 겹침 가능 */}
          <div className="guide-photo-item" onClick={() => navigate("/medicare")}>
            <div className="guide-card-bg bottom-logo-wrapper">
              <div className="guide-photo-text">
                <div className="guide-comp-title">{t("guidePractice")}</div>
                <div className="guide-comp-subtitle">{t("guidePreview")}</div>
              </div>

              <img
                className="guide-bottom-logo"
                src="/Guide/Guide-logo.svg"
                alt="Guide Logo"
              />

              {/* 오른쪽 화살표 */}
              <img
                className="guide-arrow"
                src="/arrow-gray.svg"
                alt="arrow"
              />
            </div>
          </div>

        </div>
      </main>

      <BottomBar />
    </div>
  );
}
