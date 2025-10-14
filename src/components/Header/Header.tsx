import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useFormData } from "../../contexts/FormDataContext";

export type HeaderProps = {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  className?: string;
  showMenu?: boolean;
  onMenuClick?: () => void;

  showBookmark?: boolean;
  bookmarkTo?: string;
  /** 북마크/즐겨찾기 아이콘을 교체하고 싶을 때 사용 */
  bookmarkIconSrc?: string;
  onBookmarkClick?: () => void;

  /** ✅ 검색 아이콘 표시/클릭 핸들러 (추가) */
  showSearch?: boolean;
  onSearchClick?: () => void;

  /** ✅ 홈 버튼 표시 여부 (추가) */
  showHomebtn?: boolean;
};

export default function Header({
  title,
  onBack,
  showBack = true,
  className,
  showMenu = false,
  onMenuClick,

  showSearch = false,
  onSearchClick,

  showHomebtn = false,
}: HeaderProps) {
  const { resetFormData } = useFormData();
  const navigate = useNavigate();

  const handleBack = () => (onBack ? onBack() : navigate(-1));
  const handleMenu = () => onMenuClick?.();
  const handleSearch = () => onSearchClick?.();
  const handleHome = () => {
    resetFormData();
    sessionStorage.removeItem('medicareCurrentStep');
    navigate("/home");
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
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleBack()}
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
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleMenu()}
        />
      )}



      {showSearch && (
        <img
          src="/search-icon.svg"
          alt="검색"
          className="header_search"
          onClick={handleSearch}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSearch()}
        />
      )}

      {showHomebtn && (
        <img
          src="/Home.png"
          alt="홈"
          className="header_home"
          onClick={handleHome}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleHome()}
        />
      )}
    </header>
  );
}