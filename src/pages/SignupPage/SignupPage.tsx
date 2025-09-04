import { useState } from 'react';
import ContinueButton from '../../components/Login/Button/ContinueButton';
import './SignupPage.css';

// 각 단계별 설정
const stepConfig = [
    { title: '이름을 입력해 주세요', placeholder: '이름', field: 'name' },
    { title: '아이디를 입력해 주세요', placeholder: '아이디', field: 'id' },
    { title: '외국인등록번호를 입력해 주세요', placeholder: '외국인등록번호', field: 'foreignerId' },
    { title: '생년월일을 입력해 주세요', placeholder: 'YYYY-MM-DD', field: 'birthDate' },
    { title: '휴대번호를 입력해 주세요', placeholder: '휴대번호', field: 'phone' },
    { title: '이메일을 입력해 주세요', placeholder: '이메일', field: 'email', type: 'email' }
];

const SignupPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const [showPassword, setShowPassword] = useState(false);
    const [showVerificationCode, setShowVerificationCode] = useState(false); // 인증번호 입력칸 표시 여부
    const [formData, setFormData] = useState({
        name: '',
        id: '',
        password: '',
        foreignerId: '',
        birthDate: '',
        phone: '',
        email: '',
        verificationCode: '' // 인증번호 필드 추가
    });
    const [isIdVerified, setIsIdVerified] = useState(false);

    const currentConfig = stepConfig[currentStep];
    const isIdStep = currentStep === 1;
    const isPhoneStep = currentStep === 4;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [currentConfig.field]: e.target.value
        }));
        
        if (currentConfig.field === 'id') {
            setIsIdVerified(false);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            password: e.target.value
        }));
    };

    const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            verificationCode: e.target.value
        }));
    };

    const handleDuplicateCheck = () => {
        console.log('중복확인:', formData.id);
        setIsIdVerified(true);
    };

    const handleSendVerificationCode = () => {
        console.log('인증번호 전송:', formData.phone);
        setShowVerificationCode(true);
    };

    const handleContinue = () => {
        if (isIdStep) {
            if (formData.id.trim() && isIdVerified) {
                if (!showPassword) {
                    setShowPassword(true);
                } else if (formData.password.trim()) {
                    setDirection('next');
                    setCurrentStep(prev => prev + 1);
                    setShowPassword(false);
                }
            }
        } else if (isPhoneStep) {
            if (formData.phone.trim()) {
                if (!showVerificationCode) {
                    // 인증번호 전송이 안 된 상태에서는 계속 버튼이 작동하지 않음
                    return;
                } else if (formData.verificationCode.trim()) {
                    // 인증번호까지 입력되면 다음 단계로
                    setDirection('next');
                    setCurrentStep(prev => prev + 1);
                    setShowVerificationCode(false);
                }
            }
        } else {
            if (formData[currentConfig.field as keyof typeof formData].trim()) {
                if (currentStep < stepConfig.length - 1) {
                    setDirection('next');
                    setCurrentStep(prev => prev + 1);
                } else {
                    console.log('회원가입 완료:', formData);
                }
            }
        }
    };

    const handleBack = () => {
        if (isIdStep && showPassword) {
            setShowPassword(false);
        } else if (isPhoneStep && showVerificationCode) {
            setShowVerificationCode(false);
        } else if (currentStep > 0) {
            setDirection('prev');
            setCurrentStep(prev => prev - 1);
        }
    };

    const isContinueDisabled = () => {
        if (isIdStep) {
            if (!showPassword) {
                return !formData.id.trim() || !isIdVerified;
            } else {
                return !formData.password.trim();
            }
        } else if (isPhoneStep) {
            if (!showVerificationCode) {
                return !formData.phone.trim();
            } else {
                return !formData.verificationCode.trim();
            }
        }
        
        const currentValue = formData[currentConfig.field as keyof typeof formData];
        return !currentValue.trim();
    };

    const getCurrentTitle = () => {
        if (isIdStep && showPassword) {
            return '비밀번호를 입력해주세요';
        } else if (isPhoneStep && showVerificationCode) {
            return '인증번호를 입력해주세요';
        }
        return currentConfig.title;
    };

    return (
        <div className="signup-page">
            <div className="signup-page-header">
                <img 
                    src="/arrow-back.svg" 
                    alt="뒤로가기" 
                    className="arrow-back" 
                    onClick={handleBack}
                />
            </div>
            <div className="signup-page-content">
                <div 
                    key={currentStep}
                    className={`signup-page-title-container ${direction}`}
                >
                    <div className="signup-page-title">
                        <h2>{getCurrentTitle()}</h2>
                    </div>
                    <div className="signup-input-container">
                        {isIdStep ? (
                            <div className="id-password-container">
                                <div className="id-input-wrapper">
                                    <input 
                                        type="text"
                                        placeholder="아이디"
                                        className="signup-input id-input"
                                        value={formData.id}
                                        onChange={handleInputChange}
                                    />
                                    <button 
                                        className={`duplicate-check-btn ${isIdVerified ? 'verified' : ''}`}
                                        onClick={handleDuplicateCheck}
                                        type="button"
                                    >
                                        {isIdVerified ? '확인완료' : '중복 확인'}
                                    </button>
                                </div>
                                {showPassword && (
                                    <div className="password-input-wrapper">
                                        <input 
                                            type="password"
                                            placeholder="비밀번호"
                                            className="signup-input"
                                            value={formData.password}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : isPhoneStep ? (
                            <div className="phone-verification-container">
                                <div className="phone-input-wrapper">
                                    <input 
                                        type="tel"
                                        placeholder="휴대번호"
                                        className="signup-input phone-input"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                    <button 
                                        className="verification-btn"
                                        onClick={handleSendVerificationCode}
                                        type="button"
                                    >
                                        인증번호 전송
                                    </button>
                                </div>
                                {showVerificationCode && (
                                    <div className="verification-code-input-wrapper">
                                        <input 
                                            type="text"
                                            placeholder="인증번호 6자리"
                                            className="signup-input"
                                            value={formData.verificationCode}
                                            onChange={handleVerificationCodeChange}
                                            maxLength={6}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <input 
                                type={currentConfig.type || 'text'}
                                placeholder={currentConfig.placeholder}
                                className="signup-input"
                                value={formData[currentConfig.field as keyof typeof formData]}
                                onChange={handleInputChange}
                            />
                        )}
                    </div>
                </div>
                <div className="button-section">
                    <ContinueButton 
                        text={currentStep === stepConfig.length - 1 ? "가입완료" : "계속"} 
                        onClick={handleContinue}
                        disabled={isContinueDisabled()}
                    />
                </div>
            </div>
        </div>
    );
};

export default SignupPage;