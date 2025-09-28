// 뒤로 가기 버튼이 포함된 헤더
import { useNavigate } from "react-router-dom";
import "./Header.css";

type HeaderProps = {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  className?: string;
  showMenu?: boolean;
  onMenuClick?: () => void; 
};

export default function Header({
  title,
  onBack,
  showBack = true,
  className,
  showMenu = false,
  onMenuClick,
}: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const handleMenu = () => {
    onMenuClick?.();
  };

  return (
    <header className={`header ${className ?? ""}`}>
      {showBack && (
        <img
          src="/arrow-back.svg"
          alt="뒤로 가기"
          className="header_back"
          onClick={handleBack}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleBack();
          }}
        />
      )}

      <div className="header_title">{title}</div>

      {showMenu && (
        <img
          src="/menu-icon.svg"
          alt="메뉴"
          className="header_menu"
          onClick={handleMenu}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleMenu();
          }}
        />
      )}
    </header>
  );
}