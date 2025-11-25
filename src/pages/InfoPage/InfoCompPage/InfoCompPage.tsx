import Header from "../../../components/Header/Header";
import BottomBar from "../../../components/BottomBar/BottomBar";
import { useLocalization } from "../../../contexts/LocalizationContext";
import "./InfoCompPage.css";
import "../../../../src/styles/infopage.css"

export default function InfoCompPage() {
  const { t } = useLocalization();
  
  return (
    <div className="comp-page">
      <Header title={t('infoInsurance')} />

      <main className="comp-content">
        <div className="comp-title-wrap">
          <h1 className="comp-title">{t('first_info_insurance')}</h1>
        </div>

        {/* 정의 */}
        <h2 className="section-title hl">{t('first_info_define')}</h2>
        <div className="paragraph">
            {t('first_info_define1')}
        </div>

        {/* 적용 대상 */}
        <h2 className="section-title hl">{t('first_info_adjust')}</h2>
        <div className="paragraph">
            {t('first_info_adjust1')}
        </div>

        <ul className="check-list">
          <li>
            {t('first_info_adjust2')}
          </li>
          <li>
            {t('first_info_adjust3')}
          </li>
        </ul>

        {/* 안내 박스 */}
        <div className="note-box">
          <div className="note-text">
            <p className="note-title">{t('first_info_adjust4')}</p>
            <p className="note-body">
              {t('first_info_adjust5')}
            </p>
            <p className="note-body">
              {t('first_info_adjust6')}
            </p>
          </div>
        </div>

        {/* 대상 범위 */}
        <h2 className="section-title hl">{t('first_info_range')}</h2>

        {/* 1) 일반 적용 대상 */}
        <h3 className="section-title">{t('first_info_range1')}</h3>
        <div className="bullets">
          <p>{t('first_info_range2')}</p>
          <p>{t('first_info_range3')}</p>
          <p>{t('first_info_range4')}</p>
        </div>

        {/* 2) 예외 적용 대상 */}
        <h3 className="section-title">{t('first_info_range5')}</h3>
        <div className="bullets">
          <p>{t('first_info_range6')}</p>
          <p>{t('first_info_range7')}</p>
          <p>{t('first_info_range8')}</p>
        </div>

        {/* 3) 특례 적용 대상 */}
        <h3 className="section-title">{t('first_info_range9')}</h3>
        <div className="bullets">
          <p>{t('first_info_range10')}</p>
          <p>{t('first_info_range11')}</p>
        </div>

        <div className="bottom-spacer" />
      </main>

      <BottomBar />
    </div>
  );
}
