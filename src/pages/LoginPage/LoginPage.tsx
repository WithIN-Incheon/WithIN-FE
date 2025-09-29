import "./LoginPage.css";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ⬅️ 라우터 이동 훅 추가

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const clearId = () => {
    setId("");
  };

  const clearPassword = () => {
    setPassword("");
  };

  return (
    <div>
      <div className="login-intro-section">
        <div className="logo-section">
          <img src="/Logo-splash.svg" alt="Logo" className="logo-image" />
        </div>
        <div className="login-title">
          <h1>WithIN을 시작해 보세요</h1>
        </div>
      </div>

      <div className="login-section">
        <div className="input-container">
          <input
            type="text"
            placeholder="아이디"
            className="login-input"
            value={id}
            onChange={handleIdChange}
          />
          {id && (
            <button
              className="login-close"
              onClick={clearId}
              type="button"
              aria-label="아이디 입력 삭제"
            >
              <img src="/login-close.svg" alt="삭제" />
            </button>
          )}
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="비밀번호"
            className="login-input"
            value={password}
            onChange={handlePasswordChange}
          />
          {password && (
            <button
              className="login-close"
              onClick={clearPassword}
              type="button"
              aria-label="비밀번호 입력 삭제"
            >
              <img src="/login-close.svg" alt="삭제" />
            </button>
          )}
        </div>

        {/* ⬇️ 계속 버튼 누르면 루트("/") 페이지로 이동 */}
        <ContinueButton text="계속" onClick={() => navigate("/")} />

        <div className="login-signup-section">
          <a href="#" className="login-link">
            아이디 찾기
          </a>
          <span className="separator">|</span>
          <a href="#" className="login-link">
            비밀번호 찾기
          </a>
          <span className="separator">|</span>
          <Link to="/signup" className="login-link signup-link">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
