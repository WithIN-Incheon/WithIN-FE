// BottomBar.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BottomBar.css";

export default function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 따라 활성 탭 결정
  const getActiveTab = () => {
    if (location.pathname.includes("/heart")) return "heart";
    if (location.pathname.includes("/profile")) return "profile";
    return "home";
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  // location이 바뀔 때 activeTab도 업데이트
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location]);

  const handleClick = (tab: "home" | "heart" | "profile", path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <nav className="bottom-bar" aria-label="primary">
      <img
        className="icon-heart"
        src={activeTab === "heart" ? "/Home/Heart_On.svg" : "/Home/Heart_Off.svg"}
        alt="heart"
        onClick={() => handleClick("heart", "/heart")}
      />
      <img
        className="icon-home"
        src={activeTab === "home" ? "/Home/Home_On.svg" : "/Home/Home_Off.svg"}
        alt="home"
        onClick={() => handleClick("home", "/")}
      />
      <img
        className="icon-profile"
        src={activeTab === "profile" ? "/Home/Profile_On.svg" : "/Home/Profile_Off.svg"}
        alt="profile"
        onClick={() => handleClick("profile", "/profile")}
      />
    </nav>
  );
}
