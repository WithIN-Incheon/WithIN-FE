type Detail = {
  title: string;
  summary: string;   // HTML
  situation: string;
  facts: string;     // HTML
  decision: string;
  laws?: string[];
};

export const CASE_DETAILS: Record<number, Detail> = {
  1: {
    title: "경비원 휴게실 빗물받이 설치 중 추락 – 산재 승인",
    summary: `
      <p><strong>승인 여부:</strong> 승인</p>
      <p><strong>발생 일시:</strong> 2023.10.14. 16:00경</p>
      <p><strong>발생 장소:</strong> ○○사업장 경비원 휴게실 건물 지붕</p>
      <p><strong>근로자 정보:</strong> 경비 근로자</p>
      <p><strong>상병명:</strong> 좌측 골반·주관절 등 다발성 손상</p>
    `,
    situation:
      "경비 근무 중 지붕 빗물받이 설치 작업을 하다 추락. 경비 업무의 통상 범위로 인정되어 최초 불승인 취소.",
    facts: `
      <ul>
        <li>24시간 교대, 휴게 11.5시간</li>
        <li>시설팀 담당이나 경비 임시 보수 관행 확인</li>
        <li>현장 사진·의무기록 일치</li>
      </ul>
    `,
    decision: "사회통념상 수반되는 행위 → 업무상 재해 인정.",
    laws: ["산재보험법 제5조", "제37조", "시행령 제27조", "제105조(1)"]
  },
  2: {
    title: "배달 중 신호위반 사고 – 산재 인정",
    summary: `
      <p><strong>승인 여부:</strong> 승인</p>
      <p><strong>발생 일시:</strong> 2024.2.5. 15:21경</p>
      <p><strong>발생 장소:</strong> ○○시 ○○구 ○○삼거리</p>
      <p><strong>근로자 정보:</strong> 오토바이 배달 기사</p>
      <p><strong>상병명:</strong> 경·요추 염좌, 손·대퇴 타박상 등</p>
    `,
    situation: "청구인의 신호위반은 있었으나 상대 차량 과실이 주된 원인으로 판단되어 불승인 취소.",
    facts: `
      <ul>
        <li>유턴 차량과 충돌</li>
        <li>상대 차량의 황색신호 위반 확인</li>
      </ul>
    `,
    decision: "상대 과실 주된 원인 → 산재 인정.",
    laws: ["산재보험법 제5조", "제37조", "시행령 제27조"]
  },
  3: {
    title: "횡단보도 자전거 충돌 사고 – 산재 인정",
    summary: `
      <p><strong>승인 여부:</strong> 승인</p>
      <p><strong>발생 일시:</strong> 2024.2.14. 21:00경</p>
      <p><strong>발생 장소:</strong> ○○시 ○○구 ○○로 23 인근</p>
      <p><strong>근로자 정보:</strong> 오토바이 배달 기사</p>
      <p><strong>상병명:</strong> 우측 다발성 늑골골절(5~11)</p>
    `,
    situation:
      "보행자 보호의무 위반으로 본 불승인을, ‘안전운전의무’ 위반 수준으로 재평가하여 취소.",
    facts: `
      <ul>
        <li>자전거 갑작스런 진입 회피 중 전도</li>
        <li>사실확인원 등 자료 일치</li>
      </ul>
    `,
    decision: "안전운전의무 위반 수준 → 산재 인정.",
    laws: ["산재보험법 제5조", "제37조", "보상계획부-1352(2023.3.9)"]
  },
  4: {
    title: "배달 중 교통사고 – 단순 착각 신호위반, 산재 인정",
    summary: `
      <p><strong>승인 여부:</strong> 승인</p>
      <p><strong>발생 일시:</strong> 2023.12.27. 21:20경</p>
      <p><strong>발생 장소:</strong> ○○구 ○○동 ○○교 교차로</p>
      <p><strong>근로자 정보:</strong> 플랫폼 종사자(퀵서비스)</p>
      <p><strong>상병명:</strong> 우측 비골 상단 골절, 좌측 중수골 골절, 우측 외측측부인대 파열</p>
    `,
    situation: "신호위반 사실은 있으나 도로 구조·신호주기 등 예외적 상황으로 판단, 고의 위반 아님.",
    facts: `
      <ul>
        <li>전방 차량 흐름 착시 → 좌회전 중 정상신호 차량과 충돌</li>
        <li>사고사실확인원 및 보험자도 재해 인정</li>
      </ul>
    `,
    decision: "예외적 상황 → 산재 인정.",
    laws: ["산재보험법 제5조", "제37조", "시행령 제27조", "제105조(1)"]
  },
  5: {
    title: "무면허 지게차 운전 사망 – 유족급여 불인정",
    summary: `
      <p><strong>승인 여부:</strong> 불승인</p>
      <p><strong>발생 일시:</strong> 2023.5.16. 10:50경</p>
      <p><strong>발생 장소:</strong> ○○군 ○○면 ○○리 ○○ 농로</p>
      <p><strong>근로자 정보:</strong> 건설자재 운반 근로자</p>
      <p><strong>상병명:</strong> 다발성 골절 및 흉부손상 → 사망</p>
    `,
    situation: "소유자 허락 없이 무면허 운전 중 전도 사망. 범죄행위가 직접 원인.",
    facts: `
      <ul>
        <li>2.5톤 이상 취급 자격 필요, 자격 미보유</li>
        <li>급경사·불량 노면 구간</li>
      </ul>
    `,
    decision: "산재법 제37조 제2항 제외사유 → 유족급여 불승인 타당.",
    laws: ["산재보험법 제5조", "제37조(2)", "제62조", "제71조", "제105조"]
  },
  6: {
    title: "철근 밴딩기 운반 중 허리 부상 – 산재 인정",
    summary: `
      <p><strong>승인 여부:</strong> 승인</p>
      <p><strong>발생 장소:</strong> ○○시 ○○동 단독주택 건설현장</p>
      <p><strong>근로자 정보:</strong> 철근 보조(일용)</p>
      <p><strong>상병명:</strong> 경추·요추 염좌</p>
    `,
    situation: "재해일 불명확·목격자 부재 사유 불승인 → 동료 진술·진단서 등으로 신빙성 인정.",
    facts: `
      <ul>
        <li>밴딩기(약 80kg) 운반 중 요통 발생</li>
        <li>동료 즉시전달 진술, 진단서 재해일 일치</li>
      </ul>
    `,
    decision: "업무 중 발생 인정 → 불승인 취소.",
    laws: ["산재보험법 제5조", "제37조", "시행령 제27조", "제105조"]
  },
  7: {
    title: "배달업무 중 낙상사고 – 산재 인정",
    summary: `
      <p><strong>승인 여부:</strong> 승인</p>
      <p><strong>발생 일시:</strong> 2023.11.18. 22:10경</p>
      <p><strong>발생 장소:</strong> ○○동 ○○음식점 출입문 인근</p>
      <p><strong>근로자 정보:</strong> 음식배달 기사</p>
      <p><strong>상병명:</strong> 좌 5번째 중족골 골절, 요추부 염좌</p>
    `,
    situation: "추가 배달 이력 근거 불승인 → 동료 대리수행 사실과 의무기록으로 재해 신뢰성 입증.",
    facts: `
      <ul>
        <li>출입문 진입 중 지하로 추락</li>
        <li>통화내역·대리수행 확인서·녹음 등</li>
      </ul>
    `,
    decision: "업무 수행 중 재해 인정 → 불승인 취소.",
    laws: ["산재보험법 제5조", "제37조", "시행령 제27조", "제105조"]
  },
  8: {
    title: "오토바이 운행 중 넘어짐 – 산재 인정",
    summary: `
      <p><strong>승인 여부:</strong> 승인</p>
      <p><strong>발생 일시:</strong> 2023.4.22.</p>
      <p><strong>발생 장소:</strong> ○○시 ○○구 ○○동</p>
      <p><strong>근로자 정보:</strong> 배달대행 종사자</p>
      <p><strong>상병명:</strong> 우측 무릎 피부·연부조직 결손</p>
    `,
    situation: "구급일지·사고확인원 부재로 불승인 → 구급활동일지 제출로 사실 확인되어 취소.",
    facts: `
      <ul>
        <li>배달 중 오토바이 전도</li>
        <li>구급일지·초진기록·완료시각 일치</li>
      </ul>
    `,
    decision: "업무수행 중 발생 입증 → 산재 인정.",
    laws: ["산재보험법 제37조", "시행령 제27조", "제105조(1)"]
  },
};
