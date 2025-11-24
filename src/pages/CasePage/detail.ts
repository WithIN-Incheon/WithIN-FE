export type Detail = {
  title: string | string[]; // 번역 키 또는 원본 텍스트
  summary: string | string[]; 
  situation: string | string[];
  facts: string | string[];    
  important: string | string[]; 
  decision: string | string[];
  laws?: string | string[];
  source?: string | string[];    
};

export const CASE_DETAILS: Record<number, Detail> = {
  1: {
    title: "one_title",
    summary: ["one_summary0", "one_summary1", "one_summary2", "one_summary3", "one_summary4"],
    situation: "one_situation",
    facts: ["one_facts0", "one_facts1", "one_facts2", "one_facts3"],
    important: ["one_important0", "one_important1"],
    decision: "one_decision",
    laws: ["one_laws0", "one_laws1", "one_laws2", "one_laws3"],
    source: "event_source1"
  },
    2: {
    title: "two_title",
    summary: ["two_summary0", "two_summary1", "two_summary2", "two_summary3", "two_summary4"],
    situation: "two_situation",
    facts: ["two_facts0", "two_facts1", "two_facts2"],
    important: ["two_important0", "two_important1"],
    decision: "two_decision",
    laws: ["two_laws0", "two_laws1", "two_laws2"],
    source: "event_source1"
  },
  3: {
    title: "three_title",
    summary: ["three_summary0", "three_summary1", "three_summary2", "three_summary3", "three_summary4"],
    situation: "three_situation",
    facts: ["three_facts0", "three_facts1", "three_facts2", "three_facts3"],
    important: ["three_important0", "three_important1"],
    decision: "three_decision",
    laws: ["three_laws0", "three_laws1", "three_laws2"],
    source: "event_source1"
  },
  4: {
    title: "four_title",
    summary: ["four_summary0", "four_summary1", "four_summary2", "four_summary3", "four_summary4"],
    situation: "four_situation",
    facts: ["four_facts0", "four_facts1", "four_facts2"],
    important: ["four_important0", "four_important1"],
    decision: "four_decision",
    laws: ["four_laws0", "four_laws1", "four_laws2", "four_laws3"],
    source: "event_source1"
  },
      5: {
    title: "five_title",
    summary: ["five_summary0", "five_summary1", "five_summary2", "five_summary3", "five_summary4"],
    situation: "five_situation",
    facts: ["five_facts0", "five_facts1", "five_facts2", "five_facts3", "five_facts4"],
    important: ["five_important0", "five_important1"],
    decision: ["five_decision0", "five_decision1"],
    laws: ["five_laws0", "five_laws1", "five_laws2", "five_laws3", "five_laws4"],
    source: "event_source1"
  },
  6: {
    title: "six_title",
    summary: ["six_summary0", "six_summary1", "six_summary2", "six_summary3", "six_summary4"],
    situation: "six_situation",
    facts: ["six_fact0", "six_fact1", "six_fact2", "six_fact3"],
    important: ["six_important0", "six_important1"],
    decision: "six_decision",
    laws: ["six_laws0", "six_laws1", "six_laws2", "six_laws3"],
    source: "event_source1"
  },
  7: {
    title: "seven_title",
    summary: ["seven_summary0", "seven_summary1", "seven_summary2", "seven_summary3", "seven_summary4"],
    situation: "seven_situation",
    facts: ["seven_facts0", "seven_facts1", "seven_facts2", "seven_facts3", "seven_facts4"],
    important: ["seven_important0", "seven_important1"],
    decision: "seven_decision",
    laws: ["seven_laws0", "seven_laws1", "seven_laws2", "seven_laws3"],
    source: "event_source1"
  },
  8: {
    title: "eight_title",
    summary: ["eight_summary0", "eight_summary1", "eight_summary2", "eight_summary3", "eight_summary4"],
    situation: "eight_situation",
    facts: ["eight_facts0", "eight_facts1", "eight_facts2"],
    important: ["eight_important0", "eight_important1"],
    decision: "eight_decision",
    laws: ["eight_laws0", "eight_laws1", "eight_laws2"],
    source: "event_source1"
  },

  9: {
    title: "nine_title",
    summary: ["nine_summary0", "nine_summary1", "nine_summary2", "nine_summary3", "nine_summary4"],
    situation: "nine_situation",
    facts: ["nine_facts0", "nine_facts1", "nine_facts2", "nine_facts3"],
    important: ["nine_important0", "nine_important1"],
    decision: ["nine_decision0", "nine_decision1","nine_decision2"],
    laws: ["nine_laws0", "nine_laws1", "nine_laws2", "nine_laws3", "nine_laws4"],
    source: "event_source1"
  },
  10: {
    title: "ten_title",
    summary: ["ten_summary0", "ten_summary1", "ten_summary2", "ten_summary3", "ten_summary4"],
    situation: "ten_situation",
    facts: ["ten_facts0", "ten_facts1", "ten_facts2", "ten_facts3", "ten_facts4", "ten_facts5"],
    important: ["ten_important0", "ten_important1"],
    decision: ["ten_decision0", "ten_decision1"],
    laws: ["ten_laws0", "ten_laws1", "ten_laws2", "ten_laws3"],
    source: "event_source1"
  },
  11: {
    title: "eleven_title",
    summary: ["eleven_summary0", "eleven_summary1", "eleven_summary2", "eleven_summary3", "eleven_summary4"],
    situation: "eleven_situation",
    facts: ["eleven_facts0", "eleven_facts1", "eleven_facts2", "eleven_facts3", "eleven_facts4"],
    important: ["eleven_important0", "eleven_important1"],
    decision: "eleven_decision",
    laws: ["eleven_laws0", "eleven_laws1", "eleven_laws2", "eleven_laws3"],
    source: "event_source1"
  },

  12: {
    title: "twelve_title",
    summary: ["twelve_summary0", "twelve_summary1", "twelve_summary2", "twelve_summary3", "twelve_summary4"],
    situation: "twelve_situation",
    facts: ["twelve_facts0", "twelve_facts1", "twelve_facts2", "twelve_facts3", "twelve_facts4"],
    important: ["twelve_important0", "twelve_important1"],
    decision: "twelve_decision",
    laws: ["twelve_laws0", "twelve_laws1", "twelve_laws2"],
    source: "event_source1"
  },
  13: {
    title: "thirteen_title",
    summary: ["thirteen_summary0", "thirteen_summary1", "thirteen_summary2", "thirteen_summary3", "thirteen_summary4"],
    situation: "thirteen_situation",
    facts: ["thirteen_facts0", "thirteen_facts1", "thirteen_facts2", "thirteen_facts3"],
    important: ["thirteen_important0", "thirteen_important1"],
    decision: "thirteen_decision",
    laws: ["thirteen_laws0", "thirteen_laws1", "thirteen_laws2"],
    source: "event_source1"
  },
  14: {
    title: "fourteen_title",
    summary: ["fourteen_summary0", "fourteen_summary1", "fourteen_summary2", "fourteen_summary3", "fourteen_summary4"],
    situation: "fourteen_situation",
    facts: ["fourteen_facts0", "fourteen_facts1", "fourteen_facts2", "fourteen_facts3"],
    important: ["fourteen_important0", "fourteen_important1"],
    decision: "fourteen_decision",
    laws: ["fourteen_laws0", "fourteen_laws1", "fourteen_laws2", "fourteen_laws3", "fourteen_laws4"],
    source: "event_source1"
  },
  15: {
    title: "fifteen_title",
    summary: ["fifteen_summary0", "fifteen_summary1", "fifteen_summary2", "fifteen_summary3", "fifteen_summary4"],
    situation: "fifteen_situation",
    facts: ["fifteen_facts0", "fifteen_facts1", "fifteen_facts2", "fifteen_facts3"],
    important: ["fifteen_important0", "fifteen_important1"],
    decision: "fifteen_decision",
    laws: ["fifteen_laws0", "fifteen_laws1", "fifteen_laws2", "fifteen_laws3"],
    source: "event_source1"
  },
  16: {
    title: "sixteen_title",
    summary: ["sixteen_summary0", "sixteen_summary1", "sixteen_summary2", "sixteen_summary3", "sixteen_summary4"],
    situation: "sixteen_situation",
    facts: ["sixteen_facts0", "sixteen_facts1", "sixteen_facts2", "sixteen_facts3"],
    important: ["sixteen_important0", "sixteen_important1"],
    decision: "sixteen_decision",
    laws: ["sixteen_laws0", "sixteen_laws1", "sixteen_laws2", "sixteen_laws3", "sixteen_laws4"],
    source: "event_source1"
  },
  17: {
    title: "seventeen_title",
    summary: ["seventeen_summary0", "seventeen_summary1", "seventeen_summary2", "seventeen_summary3", "seventeen_summary4"],
    situation: "seventeen_situation",
    facts: ["seventeen_facts0", "seventeen_facts1", "seventeen_facts2", "seventeen_facts3", "seventeen_facts4"],
    important: ["seventeen_important0", "seventeen_important1"],
    decision: "seventeen_decision",
    laws: ["seventeen_laws0", "seventeen_laws1", "seventeen_laws2", "seventeen_laws3"],
    source: "event_source1"
  },
  18: {
    title: "eighteen_title",
    summary: ["eighteen_summary0", "eighteen_summary1", "eighteen_summary2", "eighteen_summary3", "eighteen_summary4"],
    situation: "eighteen_situation",
    facts: ["eighteen_facts0", "eighteen_facts1", "eighteen_facts2"],
    important: ["eighteen_important0", "eighteen_important1"],
    decision: "eighteen_decision",
    laws: ["eighteen_laws0", "eighteen_laws1", "eighteen_laws2", "eighteen_laws3"],
    source: "event_source1"
  },
  19: {
    title: "nineteen_title",
    summary: ["nineteen_summary0", "nineteen_summary1", "nineteen_summary2", "nineteen_summary3", "nineteen_summary4"],
    situation: "nineteen_situation",
    facts: ["nineteen_facts0", "nineteen_facts1", "nineteen_facts2"],
    important: ["nineteen_important0", "nineteen_important1"],
    decision: "nineteen_decision",
    laws: ["nineteen_laws0", "nineteen_laws1", "nineteen_laws2", "nineteen_laws3", "nineteen_laws4"],
    source: "event_source1"
  },
  20: {
    title: "twenty_title",
    summary: ["twenty_summary0", "twenty_summary1", "twenty_summary2", "twenty_summary3", "twenty_summary4"],
    situation: "twenty_situation",
    facts: ["twenty_facts0", "twenty_facts1", "twenty_facts2", "twenty_facts3", "twenty_facts4"],
    important: ["twenty_important0", "twenty_important1"],
    decision: ["twenty_decision0", "twenty_decision1"],
    laws: ["twenty_laws0", "twenty_laws1"],
    source: "event_source1"
  },
  21: {
    title: "twentyone_title",
    summary: ["twentyone_summary0", "twentyone_summary1", "twentyone_summary2", "twentyone_summary3", "twentyone_summary4"],
    situation: "twentyone_situation",
    facts: ["twentyone_facts0", "twentyone_facts1", "twentyone_facts2", "twentyone_facts3", "twentyone_facts4"],
    important: ["twentyone_important0", "twentyone_important1"],
    decision: ["twentyone_decision0", "twentyone_decision1", "twentyone_decision2"],
    laws: ["twentyone_laws0", "twentyone_laws1", "twentyone_laws2", "twentyone_laws3"],
    source: "event_source1"
  },
  22: {
    title: "twentytwo_title",
    summary: ["twentytwo_summary0", "twentytwo_summary1", "twentytwo_summary2", "twentytwo_summary3", "twentytwo_summary4"],
    situation: "twentytwo_situation",
    facts: ["twentytwo_facts0", "twentytwo_facts1", "twentytwo_facts2", "twentytwo_facts3", "twentytwo_facts4"],
    important: ["twentytwo_important0", "twentytwo_important1"],
    decision: "twentytwo_decision",
    laws: ["twentytwo_laws0", "twentytwo_laws1", "twentytwo_laws2", "twentytwo_laws3"],
    source: "event_source1"
  },
  23: {
    title: "twentythree_title",
    summary: ["twentythree_summary0", "twentythree_summary1", "twentythree_summary2", "twentythree_summary3", "twentythree_summary4"],
    situation: "twentythree_situation",
    facts: ["twentythree_facts0", "twentythree_facts1", "twentythree_facts2", "twentythree_facts3", "twentythree_facts4"],
    important: ["twentythree_important0", "twentythree_important1"],
    decision: "twentythree_decision",
    laws: ["twentythree_laws0", "twentythree_laws1", "twentythree_laws2", "twentythree_laws3"],
    source: "event_source1"
  },
  24: {
    title: "twentyfour_title",
    summary: ["twentyfour_summary0", "twentyfour_summary1", "twentyfour_summary2", "twentyfour_summary3", "twentyfour_summary4"],
    situation: "twentyfour_situation",
    facts: ["twentyfour_facts0", "twentyfour_facts1", "twentyfour_facts2", "twentyfour_facts3"],
    important: ["twentyfour_important0", "twentyfour_important1"],
    decision: "twentyfour_decision",
    laws: ["twentyfour_laws0", "twentyfour_laws1", "twentyfour_laws2", "twentyfour_laws3", "twentyfour_laws4"],
    source: "event_source1"
  },
  25: {
    title: "twentyfive_title",
    summary: ["twentyfive_summary0", "twentyfive_summary1", "twentyfive_summary2", "twentyfive_summary3", "twentyfive_summary4"],
    situation: "twentyfive_situation",
    facts: ["twentyfive_facts0", "twentyfive_facts1", "twentyfive_facts2", "twentyfive_facts3", "twentyfive_facts4"],
    important: ["twentyfive_important0", "twentyfive_important1"],
    decision: "twentyfive_decision",
    laws: ["twentyfive_laws0", "twentyfive_laws1", "twentyfive_laws2", "twentyfive_laws3", "twentyfive_laws4"],
    source: "event_source1"
  },
  26: {
    title: "twentysix_title",
    summary: ["twentysix_summary0", "twentysix_summary1", "twentysix_summary2", "twentysix_summary3", "twentysix_summary4"],
    situation: "twentysix_situation",
    facts: ["twentysix_facts0", "twentysix_facts1", "twentysix_facts2", "twentysix_facts3", "twentysix_facts4"],
    important: ["twentysix_important0", "twentysix_important1"],
    decision: "twentysix_decision",
    laws: ["twentysix_laws0", "twentysix_laws1", "twentysix_laws2", "twentysix_laws3", "twentysix_laws4"],
    source: "event_source1"
  },
  27: {
    title: "twentyseven_title",
    summary: ["twentyseven_summary0", "twentyseven_summary1", "twentyseven_summary2", "twentyseven_summary3", "twentyseven_summary4"],
    situation: "twentyseven_situation",
    facts: ["twentyseven_facts0", "twentyseven_facts1", "twentyseven_facts2", "twentyseven_facts3", "twentyseven_facts4"],
    important: ["twentyseven_important0", "twentyseven_important1"],
    decision: "twentyseven_decision",
    laws: ["twentyseven_laws0", "twentyseven_laws1", "twentyseven_laws2", "twentyseven_laws3"],
    source: "event_source1"
  },
  28: {
    title: "twentyeight_title",
    summary: ["twentyeight_summary0", "twentyeight_summary1", "twentyeight_summary2", "twentyeight_summary3", "twentyeight_summary4"],
    situation: "twentyeight_situation",
    facts: ["twentyeight_facts0", "twentyeight_facts1", "twentyeight_facts2", "twentyeight_facts3"],
    important: ["twentyeight_important0", "twentyeight_important1"],
    decision: "twentyeight_decision",
    laws: ["twentyeight_laws0", "twentyeight_laws1", "twentyeight_laws2", "twentyeight_laws3", "twentyeight_laws4"],
    source: "event_source1"
  },
  29: {
    title: "twentynine_title",
    summary: ["twentynine_summary0", "twentynine_summary1", "twentynine_summary2", "twentynine_summary3", "twentynine_summary4"],
    situation: "twentynine_situation",
    facts: ["twentynine_facts0", "twentynine_facts1", "twentynine_facts2", "twentynine_facts3", "twentynine_facts4"],
    important: ["twentynine_important0", "twentynine_important1"],
    decision: "twentynine_decision",
    laws: ["twentynine_laws0", "twentynine_laws1", "twentynine_laws2", "twentynine_laws3"],
    source: "event_source1"
  },
  30: {
    title: "thirty_title",
    summary: ["thirty_summary0", "thirty_summary1", "thirty_summary2", "thirty_summary3", "thirty_summary4"],
    situation: "thirty_situation",
    facts: ["thirty_facts0", "thirty_facts1", "thirty_facts2", "thirty_facts3", "thirty_facts4"],
    important: ["thirty_important0", "thirty_important1"],
    decision: ["thirty_decision0", "thirty_decision1", "thirty_decision2"],
    laws: ["thirty_laws0", "thirty_laws1", "thirty_laws2"],
    source: "event_source1"
  },
  31: {
    title: "thirtyone_title",
    summary: ["thirtyone_summary0", "thirtyone_summary1", "thirtyone_summary2", "thirtyone_summary3", "thirtyone_summary4"],
    situation: "thirtyone_situation",
    facts: ["thirtyone_facts0", "thirtyone_facts1", "thirtyone_facts2", "thirtyone_facts3", "thirtyone_facts4"],
    important: ["thirtyone_important0", "thirtyone_important1"],
    decision: ["thirtyone_decision0", "thirtyone_decision1", "thirtyone_decision2"],
    laws: ["thirtyone_laws0", "thirtyone_laws1", "thirtyone_laws2"],
    source: "event_source1"
  },
  32: {
    title: "thirtytwo_title",
    summary: ["thirtytwo_summary0", "thirtytwo_summary1", "thirtytwo_summary2", "thirtytwo_summary3", "thirtytwo_summary4"],
    situation: "thirtytwo_situation",
    facts: ["thirtytwo_facts0", "thirtytwo_facts1", "thirtytwo_facts2", "thirtytwo_facts3", "thirtytwo_facts4"],
    important: ["thirtytwo_important0", "thirtytwo_important1", "thirtytwo_important2"],
    decision: ["thirtytwo_decision0", "thirtytwo_decision1"],
    laws: ["thirtytwo_laws0", "thirtytwo_laws1", "thirtytwo_laws2", "thirtytwo_laws3", "thirtytwo_laws4"],
    source: "event_source1"
  },
  33: {
    title: "thirtythree_title",
    summary: ["thirtythree_summary0", "thirtythree_summary1", "thirtythree_summary2", "thirtythree_summary3", "thirtythree_summary4"],
    situation: "thirtythree_situation",
    facts: ["thirtythree_facts0", "thirtythree_facts1", "thirtythree_facts2", "thirtythree_facts3", "thirtythree_facts4"],
    important: ["thirtythree_important0", "thirtythree_important1", "thirtythree_important2"],
    decision: ["thirtythree_decision0", "thirtythree_decision1", "thirtythree_decision2"],
    laws: ["thirtythree_laws0", "thirtythree_laws1", "thirtythree_laws2", "thirtythree_laws3"],
    source: "event_source1"
  },
  34: {
    title: "thirtyfour_title",
    summary: ["thirtyfour_summary0", "thirtyfour_summary1", "thirtyfour_summary2", "thirtyfour_summary3", "thirtyfour_summary4"],
    situation: "thirtyfour_situation",
    facts: ["thirtyfour_facts0", "thirtyfour_facts1", "thirtyfour_facts2", "thirtyfour_facts3", "thirtyfour_facts4"],
    important: ["thirtyfour_important0", "thirtyfour_important1"],
    decision: ["thirtyfour_decision0", "thirtyfour_decision1", "thirtyfour_decision2"],
    laws: ["thirtyfour_laws0", "thirtyfour_laws1", "thirtyfour_laws2", "thirtyfour_laws3"],
    source: "event_source1"
  },
  35: {
    title: "thirtyfive_title",
    summary: ["thirtyfive_summary0", "thirtyfive_summary1", "thirtyfive_summary2", "thirtyfive_summary3", "thirtyfive_summary4"],
    situation: "thirtyfive_situation",
    facts: ["thirtyfive_facts0", "thirtyfive_facts1", "thirtyfive_facts2", "thirtyfive_facts3", "thirtyfive_facts4"],
    important: ["thirtyfive_important0", "thirtyfive_important1", "thirtyfive_important2"],
    decision: ["thirtyfive_decision0", "thirtyfive_decision1"],
    laws: ["thirtyfive_laws0", "thirtyfive_laws1", "thirtyfive_laws2", "thirtyfive_laws3"],
    source: "event_source1"
  }
};