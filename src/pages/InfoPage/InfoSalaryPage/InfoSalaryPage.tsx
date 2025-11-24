// 산재 보험 급여 안내
import { useState } from "react";
import Header from "../../../components/Header/Header";
import BottomBar from "../../../components/BottomBar/BottomBar";
import { useLocalization } from "../../../contexts/LocalizationContext";
import "./InfoSalaryPage.css";

type Item = {
  key: string;
  title: string;
  content: React.ReactNode;
};

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: Item;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="acc-item">
      <button
        type="button"
        className="acc-trigger"
        aria-expanded={isOpen}
        aria-controls={`panel-${item.key}`}
        onClick={onToggle}
      >
        <span className="acc-trigger__label">{item.title}</span>
        <img
          className="acc-trigger__icon"
          src={isOpen ? "/Info/arrow-up.svg" : "/Info/arrow-down.svg"}
          width={6}
          height={11}
          alt=""
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id={`panel-${item.key}`}
          role="region"
          aria-labelledby={`btn-${item.key}`}
          className="acc-panel"
        >
          {item.content}
        </div>
      )}
    </div>
  );
}

export default function InfoSalaryPage() {
  return <InfoSalaryPageContent />;
}

function InfoSalaryPageContent() {
  const { t } = useLocalization();
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setOpenKeys((prev) => ({ ...prev, [key]: !prev[key] }));

  const ITEMS: Item[] = [
    {
      key: "yo",
      title: t("third_wage_care"),
      content: (
        <>
          <p>
            {t("third_wage_care1")}
            <br /><br />
            {t("third_wage_care2")}
          </p>
          <p>
            <strong>{t("third_wage_care3")}</strong>
            <br />{t("third_wage_care4")}
            <br />{t("third_wage_care5")}
            <br />{t("third_wage_care6")}
            <br />{t("third_wage_care7")}
          </p>
        </>
      ),
    },
    {
      key: "rest",
      title: t("third_wage_rest"),
      content: (
        <p>
          {t("third_wage_rest1")}
          <br /><br />{t("third_wage_rest2")}
          <br />{t("third_wage_rest3")}
          <br />{t("third_wage_rest4")}
        </p>
      ),
    },
    {
      key: "disability",
      title: t("third_wage_disability"),
      content: (
        <p>
          {t("third_wage_disability1")}
          <br /><br />• {t("third_wage_disability2")}
        </p>
      ),
    },
    {
      key: "care",
      title: t("third_wage_nursing"),
      content: (
        <p>
          {t("third_wage_nursing1")}
          <br /><br />• {t("third_wage_nursing2")}
        </p>
      ),
    },
    {
      key: "survivor",
      title: t("third_wage_family"),
      content: (
        <p>
          {t("third_wage_family1")}
          <br /><br />• {t("third_wage_family2")}
        </p>
      ),
    },
    {
      key: "rehab",
      title: t("third_wage_rehab"),
      content: (
        <>
          <p>
            {t("third_wage_rehab1")}
            <br /><br />
            {t("third_wage_rehab2")}
          </p>
        </>
      ),
    },
    {
      key: "longterm",
      title: t("third_wage_injury"),
      content: (
        <p>
        {t("third_wage_injury1")}
        <br /><br />
        {t("third_wage_injury2")}<br />
        {t("third_wage_injury3")}<br />
        </p>
      ),
    },
    {
      key: "funeral",
      title: t("third_wage_funeral"),
      content: (
        <>
          <p>
            {t("third_wage_funeral1")}
          </p>
          <details>
            <summary>{t("third_wage_plus")}</summary>
            <p>
              {t("third_wage_plus1")}<br/>
              • {t("third_wage_plus2")}<br/>

              {t("third_wage_plus3")}<br />
              • {t("third_wage_plus4")}<br /> 
              
              {t("third_wage_plus6")}<br /> 
              • {t("third_wage_plus7")}<br /><br />

              {t("third_wage_plus8")}<br />
              • {t("third_wage_plus9")}
            </p>
          </details>
        </>
      ),
    },
    {
      key: "silicosis",
      title: t("third_wage_pne"),
      content: (
        <>
          <p>
            {t("third_wage_pne1")}
            <br /><br />
            • {t("third_wage_pne2")}<br />
            • {t("third_wage_pne3")}
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="salary-page">
      <Header title={t("mainIndustry")} />

      <main className="salary-content">
        {/* 페이지 타이틀 */}
        <h1 className="salary-title">{t("third_wage_type")}</h1>

        {/* 아코디언 리스트 */}
        <section className="salary-accordion">
          {ITEMS.map((it) => (
            <AccordionItem
              key={it.key}
              item={it}
              isOpen={!!openKeys[it.key]}
              onToggle={() => toggle(it.key)}
            />
          ))}
        </section>
      </main>

      <BottomBar />
    </div>
  );
}