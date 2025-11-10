import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashPage.css';

const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후 자동으로 /lang 페이지로 이동
    const timer = setTimeout(() => {
      navigate('/lang');
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="logo-container">
        <img 
          src="/Logo-splash.svg" 
          alt="Logo" 
          className="logo-image floating-logo"
        />
      </div>
      <p className="splash-text">
        인천 외국인 근로자를 위한<br />
        맞춤형 산재보험 정보
      </p>
    </div>
  );
};

export default SplashPage;