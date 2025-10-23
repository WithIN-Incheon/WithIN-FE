export type CaseKind = "accident" | "disease";   // 유형 구분 (업무상 사고 / 업무상 질병)
export type Approval = "승인" | "불승인";

export type CaseItem = {
  id: number;
  kind: CaseKind;
  title: string;
  approval: Approval;
  tag: string;
};

export const CASES: CaseItem[] = [
  // === 업무상 사고 (accident) ===
  { id: 1, kind: "accident", title: "경비원 휴게실 빗물받이 설치 중 추락", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 2, kind: "accident", title: "배달 중 신호위반 사고", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 3, kind: "accident", title: "횡단보도 자전거 충돌 사고", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 4, kind: "accident", title: "배달 중 교통사고", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 5, kind: "accident", title: "무면허 지게차 운전 사망", approval: "불승인", tag: "근로자 범죄행위" },
  { id: 6, kind: "accident", title: "철근 밴딩기 운반 중 허리 부상", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 7, kind: "accident", title: "배달업무 중 낙상사고", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 8, kind: "accident", title: "오토바이 운행 중 넘어짐", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 9, kind: "accident", title: "배달 중 빗길 오토바이 미끄러짐 사고", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 10, kind: "accident", title: "사다리 미끄러짐으로 인한 늑골 골절", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 11, kind: "accident", title: "버스 계단에서 미끄러져 골절", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 12, kind: "accident", title: "건축자재 운반 중 낙상사고", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 13, kind: "accident", title: "안전벨트 매던 중 눈 부상", approval: "불승인", tag: "비업무 관련 행위" },
  { id: 14, kind: "accident", title: "승객 심폐소생술 중 실신 사고", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 15, kind: "accident", title: "휴게시간 중 덤프트럭 사망사고", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 16, kind: "accident", title: "회식 참여 후 귀가 중 사고", approval: "승인", tag: "행사 중의 사고" },
  { id: 17, kind: "accident", title: "오토바이 엔진오일 교환 후 교통사고", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 18, kind: "accident", title: "동생 집에서 출발 후 출근길 교통사고", approval: "승인", tag: "출퇴근 중의 사고" },
  { id: 19, kind: "accident", title: "출퇴근 중 자택 인정 사례", approval: "승인", tag: "출퇴근 중의 사고" },
  { id: 20, kind: "accident", title: "단독주택 계단에서의 넘어짐", approval: "승인", tag: "출퇴근 중의 사고" },
  { id: 21, kind: "accident", title: "자녀집 출발 중 미끄러짐 사고", approval: "승인", tag: "출퇴근 중의 사고" },
  { id: 22, kind: "accident", title: "첫 출근 교통사고", approval: "승인", tag: "출퇴근 중의 사고" },
  { id: 23, kind: "accident", title: "퇴근 중 비포장도로 사고", approval: "승인", tag: "출퇴근 중의 사고" },
  { id: 24, kind: "accident", title: "퇴근 중 사업장 이탈 교통사고", approval: "승인", tag: "출퇴근 중의 사고" },
  { id: 25, kind: "accident", title: "사업장 이탈 교통사고", approval: "승인", tag: "출퇴근 중의 사고" },
  { id: 26, kind: "accident", title: "회식 참여 후 퇴근 중 사고", approval: "승인", tag: "출퇴근 중의 사고" },
  { id: 27, kind: "accident", title: "체육 행사 중 사고", approval: "승인", tag: "행사 중의 사고" },
  { id: 28, kind: "accident", title: "야유회 사고 ", approval: "승인", tag: "행사 중 사고" },
  { id: 29, kind: "accident", title: " 업무 종료 후 발판 제작 중 발생 사고", approval: "승인", tag: "기타 사고" },
  { id: 30, kind: "accident", title: "외국인 관광택시기사 사고", approval: "승인", tag: "기타 사고" },

  { id: 31, kind: "disease", title: "경비원 보안업무 중 뇌경색 발병", approval: "승인", tag: "업무상 질병" },
  { id: 32, kind: "disease", title: "품질/생산관리 업무 중 급성심근경색 사망", approval: "승인", tag: "업무상 질병" },
  { id: 33, kind: "disease", title: "철근공 근무 중 요추 추간판 탈출증", approval: "승인", tag: "업무상 질병" },
  { id: 34, kind: "disease", title: "요추 추간판 탈출증 요양기간 일부 불승인 취소", approval: "승인", tag: "업무상 질병" },
  { id: 35, kind: "disease", title: "직장 내 괴롭힘으로 인한 적응장애", approval: "승인", tag: "업무상 질병" },
];
