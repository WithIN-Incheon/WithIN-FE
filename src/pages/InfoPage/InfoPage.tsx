// 산재 정보 페이지
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { useNavigate } from "react-router-dom";
import "./InfoPage.css";
import { useLocalization } from "../../contexts/LocalizationContext";

export default function InfoPage() {
  const navigate = useNavigate();
  const { t } = useLocalization();
  const infoCards = [
    {
      title: t('infoInsurance'),
      subtitle: t('infoExplain'),
      img: "/Info/Compensation-logo.svg",
      path: "/info/compensation",
    },
    {
      title: t('infoStep'),
      subtitle: t('infoReward'),
      img: "/Info/Process-logo.svg",
      path: "/info/process",
    },
    {
      title: t('infoWage'),
      subtitle: t('infoKindOfWage'),
      img: "/Info/Benefit-logo.svg",
      path: "/info/salary",
    },
    {
      title: t('infoDic'),
      subtitle: t('infoDicintro'),
      img: "/Info/Glossary-logo.svg",
      path: "/info/dictionary",
    },
  ];

  return (
    <div className="info-page">
      <Header title={t('mainIndustry')} />

      <main className="info-content">
        <div className="info-card-group">
          {infoCards.map((card, i) => (
          <div
            key={i}
            className="info-card-item"
            onClick={() => navigate(card.path)}
          >
            <div className="info-card-text">
              <h3 className="info-card-title">{card.title}</h3>
              <p className="info-card-subtitle">{card.subtitle}</p>
            </div>
            <div className="info-card-logo">
              <img src={card.img} alt={card.title} />
            </div>
          </div>

          ))}
        </div>
      </main>

      <BottomBar />
    </div>
  );
}
