import { useMemo, useState } from "react";
import Header from "../../src/components/Header/Header";
import BottomBar from "../../src/components/BottomBar/BottomBar";
import "./HelpPage.css";

type Range = { start: string; end: string };

const pad = (n: number) => `${n}`.padStart(2, "0");
const ymd = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function buildMonthMatrix(year: number, monthIdx0: number) {
  const firstOfMonth = new Date(year, monthIdx0, 1);
  const dow = firstOfMonth.getDay();
  const gridStart = new Date(year, monthIdx0, 1 - dow);
  const out: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    out.push(d);
  }
  return out;
}

function inRange(d: string, r: Range) {
  return d >= r.start && d <= r.end;
}
function isSame(d: string, other: string) {
  return d === other;
}

export default function HelpPage() {
  // 상태
  const [current, setCurrent] = useState(() => new Date());
  const [selected, setSelected] = useState<string>(ymd(new Date()));
  const [openMonth, setOpenMonth] = useState(false);

  // 파생값
  const year = current.getFullYear();
  const monthIdx0 = current.getMonth();
  const monthText = `${year}년 ${monthIdx0 + 1}월`;

  const days = useMemo(() => buildMonthMatrix(year, monthIdx0), [year, monthIdx0]);

  const selectedDate = useMemo(() => new Date(selected), [selected]);
  const selectedText = `${selectedDate.getFullYear()}.${pad(
    selectedDate.getMonth() + 1
  )}.${pad(selectedDate.getDate())}`;

  // 이벤트 예시
  const eventRanges: Range[] = [{ start: `${year}-05-19`, end: `${year}-05-23` }];

  // 월 선택
  const onPickMonth = (m: number) => {
    setCurrent(new Date(year, m, 1));
    setOpenMonth(false);
  };

  return (
    <div className="help-page">
      {/* 헤더 */}
      <Header title="산재 증빙 도우미" />

      {/* 월 타이틀 */}
      <div className="hp-monthbar">
        <div className="hp-monthbar_left">
          <div className="hp-monthbar_text" aria-live="polite">{monthText}</div>
          <img
            className={`hp-monthbar_arrow ${openMonth ? "is-open" : ""}`}
            src="/blackallow-down.svg"
            alt="월 선택"
            role="button"
            tabIndex={0}
            onClick={() => setOpenMonth((v) => !v)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setOpenMonth((v) => !v);
            }}
          />
        </div>

        {openMonth && (
          <div className="hp-monthpicker" role="dialog" aria-label="월 선택">
            <div className="hp-monthpicker_grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`hp-monthpicker_item ${i === monthIdx0 ? "is-current" : ""}`}
                  onClick={() => onPickMonth(i)}
                >
                  {i + 1}월
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 요일 */}
      <div className="hp-weekdays" aria-hidden="true">
        {["일", "월", "화", "수", "목", "금", "토"].map((w) => (
          <div key={w} className="hp-weekdays_cell">
            {w}
          </div>
        ))}
      </div>

      {/* 달력 */}
      <div className="hp-grid" role="grid" aria-label={`${monthText} 달력`}>
        {days.map((d) => {
          const key = ymd(d);
          const inThisMonth = d.getMonth() === monthIdx0;
          const isSelected = isSame(key, selected);
          const range = eventRanges.find((r) => inRange(key, r));
          const isStart = range && isSame(key, range.start);
          const isEnd = range && isSame(key, range.end);

          return (
            <button
              key={key}
              type="button"
              role="gridcell"
              aria-selected={isSelected}
              className={[
                "hp-day",
                inThisMonth ? "in-month" : "out-month",
                range ? "in-range" : "",
                isStart ? "range-start" : "",
                isEnd ? "range-end" : "",
                isSelected ? "is-selected" : "",
              ].join(" ")}
              onClick={() => setSelected(key)}
              title={key}
            >
              <span className="hp-day_num">{d.getDate()}</span>
            </button>
          );
        })}
      </div>

      {/* 바텀 카드 */}
      {selected && (
        <div className="hp-bottomcard" role="region" aria-label="선택한 날짜 정보">
          <img
            className="hp-bottomcard_vector"
            src="/gray-vector.svg"
            alt=""
            aria-hidden="true"
          />
          <div className="hp-bottomcard_date">{selectedText}</div>
          <img
            className="hp-bottomcard_add"
            src="/Help/eventplus-icon.svg"
            alt="이벤트 추가"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                // TODO: 이벤트 추가 모달 열기 등
              }
            }}
          />
          <div className="hp-bottomcard_hint">+를 눌러 새로운 이벤트를 추가해 보세요</div>
        </div>
      )}

      {/* 바텀바 */}
      <BottomBar />
    </div>
  );
}
