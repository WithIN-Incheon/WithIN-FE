import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFormData } from "../../contexts/FormDataContext";
import "./MedicarePage.css";

const MedicarePage = () => {
    const navigate = useNavigate();
    const { resetFormData } = useFormData();

    // 컴포넌트 마운트 시 폼 데이터와 currentStep 초기화
    useEffect(() => {
        resetFormData();
        sessionStorage.removeItem('medicareCurrentStep');
    }, []);

    const handleGuideStart = () => {
        navigate("/medicare-guide-flow");
    };

    const handleHome = () => {
        resetFormData();
        navigate("/home");
    };

    return (
        <div className="app">
            <Header title="최초 요양 급여 신청서 연습" onBack={handleHome}/>
            <div className="medi-hero">
                <div className="medi-intro">
                    <div className="medi-intro-title">
                        최초 요양 급여 신청서<br/>
                        작성법을 연습해보세요!<br/>
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
                    <div className="medi-content-description">
                        <div className="info-lines">
                            <div>✔️ 이 기능은 산업재해 보상보험 신청을 하<div className="jump">기 전 최초요양급여신청서 작성 연습을 할 수 있는 기능입니다.</div></div><br />
                            <div>✔️ 채우기 어려운 부분은 넘어가도 됩니다.</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 저장하기 버튼을 하단에 고정 */}
            <BottomBar />
        </div>
    )
}

export default MedicarePage;