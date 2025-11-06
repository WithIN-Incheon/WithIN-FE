export type CaseKind = "accident" | "disease";   // 유형 구분 (업무상 사고 / 업무상 질병)
export type Approval = "approve" | "disapprove";

export type CaseItem = {
  id: number;
  kind: CaseKind;
  title: string;
  approval: Approval;
  tag: string;
};

export const CASES: CaseItem[] = [
  // === 업무상 사고 (accident) ===
  { id: 1, kind: "accident", title: "경비원 휴게실 빗물받이 설치 중 추락", approval: "approve", tag: "exampleWhileWork" },
  { id: 2, kind: "accident", title: "배달 중 신호위반 사고", approval: "approve", tag: "exampleWhileWork" },
  { id: 3, kind: "accident", title: "횡단보도 자전거 충돌 사고", approval: "approve", tag: "exampleWhileWork" },
  { id: 4, kind: "accident", title: "배달 중 교통사고", approval: "approve", tag: "exampleWhileWork" },
  { id: 5, kind: "accident", title: "무면허 지게차 운전 사망", approval: "disapprove", tag: "exampleWhileCrime" },
  { id: 6, kind: "accident", title: "철근 밴딩기 운반 중 허리 부상", approval: "approve", tag: "exampleWhileWork" },
  { id: 7, kind: "accident", title: "배달업무 중 낙상사고", approval: "approve", tag: "exampleWhileWork" },
  { id: 8, kind: "accident", title: "오토바이 운행 중 넘어짐", approval: "approve", tag: "exampleWhileWork" },
  { id: 9, kind: "accident", title: "배달 중 빗길 오토바이 미끄러짐 사고", approval: "approve", tag: "exampleWhileWork" },
  { id: 10, kind: "accident", title: "사다리 미끄러짐으로 인한 늑골 골절", approval: "approve", tag: "exampleWhileWork" },
  { id: 11, kind: "accident", title: "버스 계단에서 미끄러져 골절", approval: "approve", tag: "exampleWhileWork" },
  { id: 12, kind: "accident", title: "건축자재 운반 중 낙상사고", approval: "approve", tag: "exampleWhileWork" },
  { id: 13, kind: "accident", title: "안전벨트 매던 중 눈 부상", approval: "disapprove", tag: "exampleWhileNone" },
  { id: 14, kind: "accident", title: "승객 심폐소생술 중 실신 사고", approval: "approve", tag: "exampleWhileWork" },
  { id: 15, kind: "accident", title: "휴게시간 중 덤프트럭 사망사고", approval: "approve", tag: "exampleWhileWork" },
  { id: 16, kind: "accident", title: "회식 참여 후 귀가 중 사고", approval: "approve", tag: "exampleWhileEvents" },
  { id: 17, kind: "accident", title: "오토바이 엔진오일 교환 후 교통사고", approval: "approve", tag: "exampleWhileWork" },
  { id: 18, kind: "accident", title: "동생 집에서 출발 후 출근길 교통사고", approval: "approve", tag: "exampleWhileGo" },
  { id: 19, kind: "accident", title: "출퇴근 중 자택 인정 사례", approval: "approve", tag: "exampleWhileGo" },
  { id: 20, kind: "accident", title: "단독주택 계단에서의 넘어짐", approval: "approve", tag: "exampleWhileGo" },
  { id: 21, kind: "accident", title: "자녀집 출발 중 미끄러짐 사고", approval: "approve", tag: "exampleWhileGo" },
  { id: 22, kind: "accident", title: "첫 출근 교통사고", approval: "approve", tag: "exampleWhileGo" },
  { id: 23, kind: "accident", title: "퇴근 중 비포장도로 사고", approval: "approve", tag: "exampleWhileGo" },
  { id: 24, kind: "accident", title: "퇴근 중 사업장 이탈 교통사고", approval: "approve", tag: "exampleWhileGo" },
  { id: 25, kind: "accident", title: "사업장 이탈 교통사고", approval: "approve", tag: "exampleWhileGo" },
  { id: 26, kind: "accident", title: "회식 참여 후 퇴근 중 사고", approval: "approve", tag: "exampleWhileGo" },
  { id: 27, kind: "accident", title: "체육 행사 중 사고", approval: "approve", tag: "exampleWhileEvents" },
  { id: 28, kind: "accident", title: "야유회 사고 ", approval: "approve", tag: "exampleWhileEvents" },
  { id: 29, kind: "accident", title: " 업무 종료 후 발판 제작 중 발생 사고", approval: "approve", tag: "exampleOtherAccident" },
  { id: 30, kind: "accident", title: "외국인 관광택시기사 사고", approval: "approve", tag: "exampleOtherAccident" },

  { id: 31, kind: "disease", title: "경비원 보안업무 중 뇌경색 발병", approval: "approve", tag: "exampleWhileSick" },
  { id: 32, kind: "disease", title: "품질/생산관리 업무 중 급성심근경색 사망", approval: "approve", tag: "exampleWhileSick" },
  { id: 33, kind: "disease", title: "철근공 근무 중 요추 추간판 탈출증", approval: "approve", tag: "exampleWhileSick" },
  { id: 34, kind: "disease", title: "요추 추간판 탈출증 요양기간 일부 불승인 취소", approval: "approve", tag: "exampleWhileSick" },
  { id: 35, kind: "disease", title: "직장 내 괴롭힘으로 인한 적응장애", approval: "approve", tag: "exampleWhileSick" },
];
