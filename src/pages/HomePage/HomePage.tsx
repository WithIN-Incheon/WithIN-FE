// 베타기간 동안 메일건의하기로 변경
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import BottomBar from "../../components/BottomBar/BottomBar";
import { useLocalization } from "../../contexts/LocalizationContext";

export default function App() {
  const navigate = useNavigate();
  const { t } = useLocalization();

  return (
    <div className="app">
      <div className="hero">

        <img className="bg-icon" src="/Home/BgIcon.png" alt="bg" />
        <div className="headline">
          <div className="subtitle">{t('mainHelp')}</div>
          <div className="title">{t('mainIndustry')}</div>
        </div>
{/* 
        <a
          className="quick-link"
          href="https://forms.gle/B7AHzR2ZHYhriUDx9"
          target="_blank"
          rel="noreferrer"
        >
          피드백 하러가기
          <img className="vector2" src="/Home/Vector2.svg" alt="go" />
        </a> */}

        <div className="hero-spacing" />
      </div>

      <div className="content">
        <div className="photo-group">
          <div className="photo-item" onClick={() => navigate("/guide")}>
            <img className="shadow-img" src="/Home/Home_Guide.svg" alt="산재 신청 가이드" />
            <div className="photo-text">
              <div className="title">{t('mainIndustry')}</div>
              <div className="subtitle">{t('mainLookup')}</div>
            </div>
          </div>

          <div className="photo-item" onClick={() => navigate("/cases")}>
            <img className="shadow-img" src="/Home/Home_ExSearch.svg" alt="사례 검색" />
            <div className="photo-text">
              <div className="title">{t('mainSearch')}</div>
              <div className="subtitle">{t('mainExample')}</div>
            </div>
          </div>

          <div className="photo-item" onClick={() => navigate("/list")}>
            <img className="shadow-img" src="/Home/Home_HosSearch.svg" alt="의료기관 검색" />
            <div className="photo-text">
              <div className="title">{t('mainHospital')}</div>
              <div className="subtitle">{t('mainFindHospital')}</div>
            </div>
          </div>
          
          <div
            className="photo-item feedback"
            onClick={() => window.open("https://forms.gle/B7AHzR2ZHYhriUDx9", "_blank")}
          >
            <img className="shadow-img" src="/Home/Home_Feedback.svg" alt="피드백 하기" />
            <div className="photo-text">
              <div className="title">{t('mainFeed')}</div>
            </div>
          </div>

        </div>
      </div>

      <BottomBar />
      <img
        className="global"
        src="/Home/language.svg"
        alt="언어번역"
        onClick={() => navigate("/")}
      />
    </div>
  );
}
