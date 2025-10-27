import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import "./Medicare-result.css";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../contexts/FormDataContext";
import { fillPdf } from "../../utils/Docs_writing/core_utils";
import { useState } from "react";

const MediResult = ({ onBack }: { onBack: () => void }) => {
    const navigate = useNavigate();
    const { formData, resetFormData } = useFormData();
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadPdf = async () => {
        setIsDownloading(true);
        try {
            console.log("수집된 데이터:", formData);
            
            // PDF 생성
            const pdfBytes = await fillPdf({
                data: formData,
                templatePath: "/template3.pdf",
                fontPath: "/fonts/NotoSansKR-Regular.ttf",
            });

            // PDF 다운로드
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `산재신청서_${new Date().toISOString().slice(0, 10)}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            console.log("PDF 생성 완료!");
        } catch (error) {
            console.error("PDF 생성 실패:", error);
            alert("PDF 생성 중 오류가 발생했습니다.");
        } finally {
            setIsDownloading(false);
        }
    };

    const handleGoHome = () => {
        resetFormData();
        sessionStorage.removeItem('medicareCurrentStep');
        navigate("/home");
    };

    return (
        <div className="app">
            <Header title="요양 급여 신청 가이드" onBack={onBack} />

            <div className="result-container">
                <img 
                    src="/Medicare/medicare-result.png" 
                    alt="요양 급여 신청서" 
                    className="result-image"
                />
            </div>

            <div className="button-container">
                <div className='login-button-container'>
                    <button 
                        className={`login-button ${isDownloading ? 'disabled' : ''}`} 
                        onClick={handleDownloadPdf}
                        disabled={isDownloading}
                    >
                        {isDownloading ? (
                            <>
                                <span className="loading-spinner"></span>
                                PDF 생성 중...
                            </>
                        ) : "PDF로 다운받기"}
                    </button>
                </div>
                <ContinueButton text="홈으로 돌아가기" onClick={handleGoHome} />
            </div>
        </div>
    )
}

export default MediResult;