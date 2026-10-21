import { useState, useEffect } from "react";

interface PopupPosition {
  top: number;
  left: number;
}

interface UsePopupReturn {
  showPopup: boolean;
  popupText: string;
  popupPosition: PopupPosition;
  handleInfoClick: (text: string, event: React.MouseEvent<HTMLImageElement>) => void;
  handleClosePopup: () => void;
}

/**
 * 정보 팝업 상태와 5초 자동 닫힘 로직을 관리하는 커스텀 훅.
 * MediGuidePage 1/3/4/5/6에서 공통으로 사용합니다.
 */
export function usePopup(): UsePopupReturn {
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({ top: 0, left: 0 });

  // 팝업이 열리면 5초 뒤 자동으로 닫힘
  useEffect(() => {
    if (!showPopup) return;
    const timer = setTimeout(() => setShowPopup(false), 5000);
    return () => clearTimeout(timer);
  }, [showPopup]);

  const handleInfoClick = (text: string, event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      top: rect.top - 10,
      left: rect.right + 10,
    });
    setPopupText(text);
    setShowPopup(true);
  };

  const handleClosePopup = () => setShowPopup(false);

  return { showPopup, popupText, popupPosition, handleInfoClick, handleClosePopup };
}
