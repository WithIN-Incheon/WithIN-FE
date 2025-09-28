import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BottomBar.css";

type Tab = "home" | "bookmark" | "mypage";

export default function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 따라 활성 탭 결정
  const getActiveTab = (): Tab => {
    if (location.pathname.startsWith("/bookmark")) return "bookmark";
    if (location.pathname.startsWith("/mypage")) return "mypage";
    return "home";
  };

  const [activeTab, setActiveTab] = useState<Tab>(getActiveTab());

  // location이 바뀔 때 activeTab도 업데이트
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location]);

  const handleClick = (tab: Tab, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <nav className="bottom-bar" aria-label="primary">
      <img
        className="icon-heart"
        src={activeTab === "bookmark" ? "/Home/Heart_On.svg" : "/Home/Heart_Off.svg"}
        alt="bookmark"
        onClick={() => handleClick("bookmark", "/bookmark")}
      />
      <img
        className="icon-home"
        src={activeTab === "home" ? "/Home/Home_On.svg" : "/Home/Home_Off.svg"}
        alt="home"
        onClick={() => handleClick("home", "/")}
      />
      <img
        className="icon-profile"
        src={activeTab === "mypage" ? "/Home/Profile_On.svg" : "/Home/Profile_Off.svg"}
        alt="mypage"
        onClick={() => handleClick("mypage", "/mypage")}
      />
    </nav>
  );
}