import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BottomBar.css";

type Tab = "home" | "favorite" | "mypage";

export default function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 따라 활성 탭 결정
  const getActiveTab = (): Tab => {
    if (location.pathname.startsWith("/favorite")) return "favorite";
    if (location.pathname.startsWith("/mypage")) return "mypage";
    return "home";
  };

  const [activeTab, setActiveTab] = useState<Tab>(getActiveTab());

  // location이 바뀔 때 activeTab도 업데이트
  useEffect(() => {
    setActiveTab(getActiveTab());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleClick = (tab: Tab, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <nav className="bottom-bar" aria-label="primary">
      <img
        className="icon-heart"
        src={activeTab === "favorite" ? "/Home/Heart_On.svg" : "/Home/Heart_Off.svg"}
        alt="favorite"
        onClick={() => handleClick("favorite", "/favorite")}
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