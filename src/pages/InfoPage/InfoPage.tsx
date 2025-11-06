// 산재 정보 페이지
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { useNavigate } from "react-router-dom";
import "./InfoPage.css";
import { useLocalization } from "../../contexts/LocalizationContext";

export default function InfoPage() {
  const navigate = useNavigate();

  const infoCards = [
    {
      title: "산업재해 보험 안내",
      subtitle: "보험의 정의, 적용대상, 대상에 대해서 \n설명합니다",
      img: "/Info/Compensation-box.svg",
      path: "/info/compensation",
    },
    {
      title: "산업재해 보험 보상 절차",
      subtitle: "보험의 보상절차에 대해 설명합니다",
      img: "/Info/Process-box.svg",
      path: "/info/process",
    },
    {
      title: "산업재해 보험 급여 안내",
      subtitle: "보험의 급여 종류에 대해 설명합니다",
      img: "/Info/Benefit-box.svg",
      path: "/info/salary",
    },
    {
      title: "산업재해 관련 용어 사전",
      subtitle: "산업재해와 관련된 용어를 소개합니다",
      img: "/Info/Glossary-box.svg",
      path: "/info/dictionary",
    },
  ];

  return (
    <div className="info-page">
      <Header title="산재재해 정보 가이드" />

      <main className="info-content">
        <div className="info-card-group">
          {infoCards.map((card, i) => (
            <div
              key={i}
              className="info-card-item"
              onClick={() => navigate(card.path)}
            >
              <img className="info-card-img" src={card.img} alt={card.title} />
              <div className="info-card-text">
                <h3 className="info-card-title">{card.title}</h3>
                <p className="info-card-subtitle">{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomBar />
    </div>
  );
}
