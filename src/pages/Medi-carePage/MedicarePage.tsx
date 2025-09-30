import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { useNavigate } from "react-router-dom";
import "./MedicarePage.css";

const MedicarePage = () => {
    const navigate = useNavigate();

    const handleGuideStart = () => {
        navigate("/medicare-guide-flow");
    };

    return (
        <div className="app">
            <Header title="요양 급여 신청 가이드" />
            <div className="medi-hero">
                <div className="medi-intro">
                    <div className="medi-intro-title">
                        김윗인 님,<br/>
                        최초 요양 급여 신청서<br/>
                        작성이 처음이신가요?
                    </div>
                    <img className="medi-intro-img" src="/Medicare/medicare-apply.svg"/>
                </div>
            </div>
            <div className="medi-content">
                <div className="medi-content-buttons">
                    <div className="medi-content-button" onClick={handleGuideStart}>
                        <img className="medi-content-button-img" src="/Medicare/File.svg"/>
                        <span className="medi-content-button-text">최초 요양 급여 신청서 작성</span>
                    </div>
                    <div className="medi-content-button">
                        <img className="medi-content-button-img" src="/Medicare/Square-plus.svg"/>
                        <span className="medi-content-button-text">신청서 추가</span>
                    </div>
                </div>
            </div>
            {/* 저장하기 버튼을 하단에 고정 */}
            <BottomBar />
        </div>
    )
}

export default MedicarePage;