import MediPopup from "../../pages/Medi-carePage/Medi-popup";

interface InfoPopupOverlayProps {
  text: string;
  position: { top: number; left: number };
  onClose: () => void;
}

/**
 * 정보 아이콘 클릭 시 표시되는 팝업 오버레이.
 * 오버레이를 클릭하면 닫히고, 팝업 내부 클릭은 이벤트 전파를 차단합니다.
 */
export default function InfoPopupOverlay({ text, position, onClose }: InfoPopupOverlayProps) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-container"
        style={{
          position: "fixed",
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: 1000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <MediPopup text={text} />
      </div>
    </div>
  );
}
