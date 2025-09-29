// src/pages/CasePage/cases.ts
export type CaseKind = "accident" | "disease";   // ✅ 요게 핵심!

export type Approval = "승인" | "불승인";

export type CaseItem = {
  id: number;
  kind: CaseKind;
  title: string;
  approval: Approval;
  tag: string;
};

export const CASES: CaseItem[] = [
  { id: 1, kind: "accident", title: "경비원 휴게실 빗물받이 설치 중 추락", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 2, kind: "accident", title: "배달 중 신호위반 사고", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 3, kind: "accident", title: "횡단보도 자전거 충돌 사고", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 4, kind: "accident", title: "배달 중 교통사고 ", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 5, kind: "accident", title: "무면허 지게차 운전 사망", approval: "불승인", tag: "근로자 범죄행위" },
  { id: 6, kind: "accident", title: "철근 밴딩기 운반 중 허리 부상", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 7, kind: "accident", title: "배달업무 중 낙상사고", approval: "승인", tag: "업무수행 중의 사고" },
  { id: 8, kind: "accident", title: "오토바이 운행 중 넘어짐", approval: "승인", tag: "업무수행 중의 사고" },
];
