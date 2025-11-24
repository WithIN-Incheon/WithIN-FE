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
  { id: 1, kind: "accident", title: "one_title", approval: "approve", tag: "exampleWhileWork" },
  { id: 2, kind: "accident", title: "two_title", approval: "approve", tag: "exampleWhileWork" },
  { id: 3, kind: "accident", title: "three_title", approval: "approve", tag: "exampleWhileWork" },
  { id: 4, kind: "accident", title: "four_title", approval: "approve", tag: "exampleWhileWork" },
  { id: 5, kind: "accident", title: "five_title", approval: "disapprove", tag: "exampleWhileCrime" },
  { id: 6, kind: "accident", title: "six_title", approval: "approve", tag: "exampleWhileWork" },
  { id: 7, kind: "accident", title: "seven_title", approval: "approve", tag: "exampleWhileWork" },
  { id: 8, kind: "accident", title: "eight_title", approval: "approve", tag: "exampleWhileWork" },
  { id: 9, kind: "accident", title: "nine_title", approval: "approve", tag: "exampleWhileWork" },
  { id: 10, kind: "accident", title: "ten_title", approval: "approve", tag: "exampleWhileWork" },
  { id: 11, kind: "accident", title: "eleven_title", approval: "approve", tag: "exampleWhileWork" },
  { id: 12, kind: "accident", title: "twelve_title", approval: "approve", tag: "exampleWhileWork" },
  { id: 13, kind: "accident", title: "thirteen_title", approval: "disapprove", tag: "exampleWhileNone" },
  { id: 14, kind: "accident", title: "fourteen_title", approval: "approve", tag: "exampleWhileWork" },
  { id: 15, kind: "accident", title: "fifteen_title", approval: "approve", tag: "exampleWhileWork" },
  { id: 16, kind: "accident", title: "sixteen_title", approval: "approve", tag: "exampleWhileEvents" },
  { id: 17, kind: "accident", title: "seventeen_title", approval: "approve", tag: "exampleWhileWork" },
  { id: 18, kind: "accident", title: "eighteen_title", approval: "approve", tag: "exampleWhileGo" },
  { id: 19, kind: "accident", title: "nineteen_title", approval: "approve", tag: "exampleWhileGo" },
  { id: 20, kind: "accident", title: "twenty_title", approval: "approve", tag: "exampleWhileGo" },
  { id: 21, kind: "accident", title: "twentyone_title", approval: "approve", tag: "exampleWhileGo" },
  { id: 22, kind: "accident", title: "twentytwo_title", approval: "approve", tag: "exampleWhileGo" },
  { id: 23, kind: "accident", title: "twentythree_title", approval: "approve", tag: "exampleWhileGo" },
  { id: 24, kind: "accident", title: "twentyfour_title", approval: "approve", tag: "exampleWhileGo" },
  { id: 25, kind: "accident", title: "twentyfive_title", approval: "approve", tag: "exampleWhileGo" },
  { id: 26, kind: "accident", title: "twentysix_title", approval: "approve", tag: "exampleWhileGo" },
  { id: 27, kind: "accident", title: "twentyseven_title", approval: "approve", tag: "exampleWhileEvents" },
  { id: 28, kind: "accident", title: "twentyeight_title", approval: "approve", tag: "exampleWhileEvents" },
  { id: 29, kind: "accident", title: "twentynine_title", approval: "approve", tag: "exampleOtherAccident" },
  { id: 30, kind: "accident", title: "thirty_title", approval: "approve", tag: "exampleOtherAccident" },

  { id: 31, kind: "disease", title: "thirtyone_title", approval: "approve", tag: "exampleWhileSick" },
  { id: 32, kind: "disease", title: "thirtytwo_title", approval: "approve", tag: "exampleWhileSick" },
  { id: 33, kind: "disease", title: "thirtythree_title", approval: "approve", tag: "exampleWhileSick" },
  { id: 34, kind: "disease", title: "thirtyfour_title", approval: "approve", tag: "exampleWhileSick" },
  { id: 35, kind: "disease", title: "thirtyfive_title", approval: "approve", tag: "exampleWhileSick" },
];
