import './TermsPage.css';
import Agreement from '../../components/Terms/Agreement';
import ContinueButton from '../../components/Login/Button/ContinueButton';

const TermsPage = () => {
    return (
        <div className="terms-page">
            <div className="terms-page-header">
                <img src="/arrow-back.svg" alt="Logo" className="arrow-back" />
            </div>
            <div className="terms-page-content">
                    <div className="terms-page-title">
                        <h2>WithIN 서비스 이용에</h2>
                        <h2>동의해주세요</h2>
                    </div>
                <Agreement />
                <div className="button-section">
                    <ContinueButton text="동의하기" onClick={() => {}} />
                </div>
            </div>
        </div>
    )
}

export default TermsPage;