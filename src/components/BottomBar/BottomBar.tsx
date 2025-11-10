import { useNavigate } from "react-router-dom";
import "./BottomBar.css";

export default function BottomBar() {
  const navigate = useNavigate();

  return (
    <nav className="bottom-bar" aria-label="primary">
      {/* 왼쪽: 뒤로가기 버튼 */}
      <img
        className="icon-back"
        src="/Home/Back_Btn.svg"
        alt="뒤로가기"
        onClick={() => navigate(-1)}
      />

      {/* 가운데: 홈 버튼 */}
      <img
        className="icon-home"
        src="/Home/Home_On.svg"
        alt="홈"
        onClick={() => navigate("/home")}
      />

      {/* 오른쪽: 센터 버튼 */}
      <img
        className="icon-center"
        src="/Home/Center_Btn.svg"
        alt="센터"
        onClick={() => navigate("/center")}
      />
    </nav>
  );
}
