import React, { useEffect } from 'react';
import './SplashPage.css';

const SplashPage: React.FC = () => {
  useEffect(() => {
    // 3초 후 자동으로 다음 페이지로 이동 (예시)
    const timer = setTimeout(() => {
      // 여기에 다음 페이지로 이동하는 로직 추가
      console.log('Splash screen completed');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-container">
      <div className="logo-container">
        <img 
          src="/Logo-splash.svg" 
          alt="Logo" 
          className="logo-image"
        />
      </div>
    </div>
  );
};

export default SplashPage;
