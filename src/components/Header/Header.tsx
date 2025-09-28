//뒤로 가기 버튼이 포함된 헤더
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

type HeaderProps = {
  title?: string;          // 화면마다 다른 제목을 주입
  onBack?: () => void;    
  showBack?: boolean;
  className?: string;     
};

export default function Header({
  title,
  onBack,
  showBack = true,
  className,
}: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <header className={`header ${className ?? ""}`}>
      {showBack && (
        <img
          src="/arrow-back.svg"
          alt="뒤로 가기"
          className="header__back"
          onClick={handleBack}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleBack();
          }}
        />
      )}
      <div className="header__title">{title}</div>
    </header>
  );
}
