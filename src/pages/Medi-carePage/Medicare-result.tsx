import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import "./Medicare-result.css";
import { useNavigate } from "react-router-dom";
const MediResult = () => {
    const navigate = useNavigate();
    return (
        <div className="app">
            <Header title="요양 급여 신청 가이드" />

            <div className="result-container">
                <img 
                    src="/Medicare/medicare-result.png" 
                    alt="요양 급여 신청서" 
                    className="result-image"
                />
            </div>

            <div className="button-container">
                <ContinueButton text="이미지로 내보내기" onClick={() => {}} />
                <ContinueButton text="홈으로 돌아가기" onClick={() => {navigate("/home");}} />
            </div>
        </div>
    )
}

export default MediResult;