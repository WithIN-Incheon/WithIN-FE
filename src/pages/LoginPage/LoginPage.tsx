import './LoginPage.css';
import LoginButton from '../../components/Login/Button/LoginButton';
const LoginPage = () => {
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
                <input type="text" placeholder="이메일" className="login-input" />
                <input type="password" placeholder="비밀번호" className="login-input" />

                <LoginButton text="계속" onClick={() => {}} />
                <div className="login-signup-section">
                    <a href="#" className="login-link">아이디 찾기</a>
                    <span className="separator">|</span>
                    <a href="#" className="login-link">비밀번호 찾기</a>
                    <span className="separator">|</span>
                    <a href="#" className="login-link signup-link">회원가입</a>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;