// 산재 정보 안내 
import Header from "../../../components/Header/Header";
import BottomBar from "../../../components/BottomBar/BottomBar";

import "./InfoCompPage.css";

export default function InfoCompPage() {
  return (
    <div className="comp-page">
      <Header title="산재 정보 안내" />

      <main className="comp-content">
        <h1 className="comp-title">산재 보험</h1>

        {/* 정의 */}
        <h2 className="section-title hl">정의</h2>
        <p className="paragraph">
          근로자의 업무상 사고와 질병 등으로 인한 부상, 장애, 사망을 국가가 신속하고
          공정하게 보상하고 재해근로자의 재활과 사회복귀를 위해 시행되는 사회 보험입니다.
        </p>

        {/* 적용 대상 */}
        <h2 className="section-title hl">적용 대상</h2>
        <p className="paragraph">
          업무 상 재해에 의한 질병 또는 사고가 발생하여 4일 이상의 요양이 필요한 재해자
        </p>
        <ul className="check-list">
          <li>
            국적이나 비자와 관계없이, 모든 근로자는 근로 중 발생한 재해에 대해 보호받을 수 있음.
          </li>
          <li>
            불법체류 외국인 근로자 또한 산재보상보험을 받을 수 있으며 체류 연장 지원도 병행됨.
          </li>
        </ul>

        {/* 안내 박스 */}
        <div className="note-box">
          <div className="note-text">
            <p className="note-title">*업무상 재해</p>
            <p className="note-body">
              업무와 재해 사이에 상당 인과관계가 인정되는 재해를 뜻함.
            </p>
            <p className="note-body">
              근로자가 업무상 사고 또는 업무상 질병으로 부상, 질병, 장애가 발생하거나 또는
              사망(고의, 자해행위나 범죄행위 또는 그것이 원인이 되어 발생한 경우는 제외함)을 하게 될 경우.
            </p>
          </div>
        </div>

        {/* 대상 범위 */}
        <h2 className="section-title hl">대상 범위</h2>

        <h3 className="section-title">일반 적용 대상</h3>
        <ul className="dash-list">
          <li>모든 근로자를 사용하는 사업 또는 사업장이 원칙적으로 산재보험법 적용 대상입니다.</li>
          <li>사업장의 규모나 업종, 고용 형태(상용, 일용직, 비정규직, 아르바이트 등)에 관계없이 1인 이상의 근로자가 있으면 적용됩니다.</li>
          <li>건설업 면허가 있는 자가 시공하는 모든 건설공사, 또는 상시 근로자 1인 이상인 농업·임업·어업·수렵업 등 법인 사업도 포함됩니다.</li>
        </ul>

        <h3 className="section-title">예외 적용 대상</h3>
        <ul className="dash-list">
          <li>
            별도 재해보상 제도를 갖춘 경우 산재보험법 적용이 제외됨. (예: 공무원 재해보상법, 군인 재해보상법,
            선원법, 어선원 및 어선 재해보상보험법, 사립학교교직원 연금법 적용 대상 사업 등)
          </li>
          <li>소규모 사업장 또한 제외 대상 : 가정 내 고용활동, 농업·임업·어업·수렵업 중 법인이 아니고 상시 근로자 5명 미만인 사업장</li>
          <li>상시 근로자 1명 미만인 사업장(간헐적 근로)</li>
        </ul>

        <h3 className="section-title">특례 적용 대상</h3>
        <ul className="dash-list">
          <li>중소기업 사업주 및 가족, 현장실습생, 학생 연구자 등은 산재보험에 대한 특례가 있음</li>
          <li>근로기준법의 적용을 받지 않지만 노동관계법 사각지대에 있는 노동자들을 보호하기 위함</li>
        </ul>

        {/* 하단 여유 (BottomBar와 겹침 방지) */}
        <div className="bottom-spacer" />
      </main>
      <BottomBar />

    </div>
  );
}
