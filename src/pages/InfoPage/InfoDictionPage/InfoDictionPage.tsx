import Header from "../../../components/Header/Header";
import BottomBar from "../../../components/BottomBar/BottomBar";
import { useLocalization } from "../../../contexts/LocalizationContext";
import "./InfoDictionPage.css";
import "../../../../src/styles/infopage.css"

// 내부 유틸: <p> 안의 '•' 라인 자동 분리
function toBullets(text: string): string[] {
  return text
    .split(/<br\s*\/?>/gi)
    .map((t) => t.trim())
    .filter((line) => line.startsWith("•"))
    .map((line) => line.replace(/^•\s*/, "").trim());
}

export default function InfoDictionPage() {
  const { t } = useLocalization();

  return (
    <div className="dict-page">
      <Header title={t("infoDic")} />

      <main className="dict-content">
        {/* 페이지 타이틀 */}
        <h1 className="dict-title">{t("fourth_word")}</h1>

        {/* 1. 업무상 재해 */}
        <h2 className="section-title hl">{t("fourth_word_work")}</h2>
        <p className="paragraph">
          {t("fourth_word_work1")}
          <br />
          {t("fourth_word_work2")}
        </p>

        {/* 1-1. 업무상 사고 */}
        <h3 className="sub-title hl">{t("fourth_work_accident")}</h3>
        <div className="bullets">
          {toBullets(`
            ${t("fourth_work_accident1")}
            <br/>${t("fourth_work_accident2")}
            <br/>${t("fourth_work_accident3")}
            <br/>${t("fourth_work_accident4")}
            <br/>${t("fourth_work_accident5")}
          `).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* 1-2. 업무상 질병 */}
        <h3 className="sub-title hl">{t("fourth_work_disease")}</h3>
        <div className="bullets">
          {toBullets(`
            ${t("fourth_work_disease1")}
            <br/>${t("fourth_work_disease2")}
            <br/>${t("fourth_work_disease3")}
            <br/>${t("fourth_work_disease4")}
          `).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* 1-3. 출퇴근 재해 */}
        <h3 className="sub-title hl">{t("fourth_work_commute")}</h3>
        <div className="bullets">
          {toBullets(`
            ${t("fourth_work_commute1")}
            <br/>${t("fourth_work_commute2")}
          `).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* 제외 사유 */}
        <h2 className="sub-title hl">{t("fourth_work_minus")}</h2>
        <p className="paragraph">
          {t("fourth_work_minus1")}
          <br />
          <br />
          {t("fourth_work_minus2")}
        </p>

        {/* 2~9 */}
        <h2 className="section-title hl">{t("fourth_word_worker")}</h2>
        <p className="paragraph">{t("fourth_word_worker1")}</p>

        <h2 className="section-title hl">{t("fourth_word_ceo")}</h2>
        <p className="paragraph">{t("fourth_word_ceo1")}</p>

        <h2 className="section-title hl">{t("fourth_word_join")}</h2>
        <p className="paragraph">{t("fourth_word_join1")}</p>

        <h2 className="section-title hl">{t("fourth_word_certificate")}</h2>
        <p className="paragraph">{t("fourth_word_certificate1")}</p>

        <h2 className="section-title hl">{t("fourth_word_report")}</h2>
        <p className="paragraph">{t("fourth_word_report1")}</p>

        <h2 className="section-title hl">{t("fourth_word_recipient")}</h2>
        <p className="paragraph">{t("fourth_word_recipient1")}</p>

        <h2 className="section-title hl">{t("fourth_word_request")}</h2>
        <p className="paragraph">{t("fourth_word_request1")}</p>

        <h2 className="section-title hl">{t("fourth_word_legal")}</h2>
        <p className="paragraph">{t("fourth_word_legal1")}</p>

        <div className="bottom-spacer" />
      </main>

      <BottomBar />
    </div>
  );
}
