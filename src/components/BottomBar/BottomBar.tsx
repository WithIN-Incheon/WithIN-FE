import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BottomBar.css";

type Tab = "home";

export default function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = (): Tab => "home";

  const [activeTab, setActiveTab] = useState<Tab>(getActiveTab());

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
        className="icon-home"
        src={activeTab === "home" ? "/Home/Home_On.svg" : "/Home/Home_Off.svg"}
        alt="home"
        onClick={() => handleClick("home", "/home")}
      />
    </nav>
  );
}
