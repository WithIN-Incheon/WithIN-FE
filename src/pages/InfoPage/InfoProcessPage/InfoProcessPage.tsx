import Header from "../../../components/Header/Header";
import BottomBar from "../../../components/BottomBar/BottomBar";
import { useLocalization } from "../../../contexts/LocalizationContext";
import "./InfoProcessPage.css";

function stripOrderedPrefix(text: string) {
  return text.replace(/^\s*\d+\.\s*/, "");
}

export default function InfoProcessPage() {
  const { t } = useLocalization();

  return (
    <div className="proc-page">
      <Header title={t("second_title")} />

      <main className="proc-content">
        {/* 타이틀 */}
        <h1 className="proc-title">{t("second_title")}</h1>

        {/* 개요 */}
        <section className="proc-section">
          <h2 className="section-title hl">{t("second_summary")}</h2>
          <p className="paragraph14">{t("second_summary1")}</p>
          <p className="paragraph14">{t("second_summary2")}</p>
        </section>

        {/* 업무상 사고 산재 보험 신청 절차 */}
        <section className="proc-section">
          <h2 className="section-title hl">{t("second_step1")}</h2>
          <ol className="num-list13">
            <li>
              {stripOrderedPrefix(t("second_step2"))}
            </li>
            <li>
              {stripOrderedPrefix(t("second_step3"))}
            </li>
            <li>
              {stripOrderedPrefix(t("second_step4"))}
            </li>
          </ol>
          <p className="paragraph13">{t("second_step5")}</p>
          <p className="paragraph13">{t("second_step6")}</p>
        </section>

        {/* 업무상 질병 산재 보험 신청 절차 */}
        <section className="proc-section">
          <h2 className="section-title hl">{t("second_diff_step1")}</h2>
          <ol className="num-list13">
            <li>
              {stripOrderedPrefix(t("second_diff_step2"))}
              <br />
              <span className="note-inline">{t("second_diff_step3")}</span>
            </li>
            <li>
              {stripOrderedPrefix(t("second_diff_step4"))}
              <br />
              <span className="note-inline">{t("second_diff_step5")}</span>
            </li>
            <li>{t("second_diff_step6")}</li>
          </ol>

          <p className="paragraph13">{t("second_diff_step7")}</p>
          <p className="paragraph13">{t("second_diff_step8")}</p>
        </section>

        {/* 필요 서류(공통) */}
        <section className="proc-section">
          <h2 className="section-title hl">{t("second_diff_step9")}</h2>
          <ul className="dash-list14">
            <li>{t("second_diff_step10")}</li>
            <li>{t("second_diff_step11")}</li>
            <li>{t("second_diff_step12")}</li>
          </ul>
        </section>

      </main>

      <BottomBar />
    </div>
  );
}
