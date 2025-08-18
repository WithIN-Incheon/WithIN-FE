import './Agreement.css';
import { useState } from 'react';

const Agreement = () => {
    const agreementItems = [
        "(필수) WithIN 서비스 이용약관",
        "(필수) 개인정보 처리방침",
        "(선택) 위치기반 서비스 이용약관"
    ];

    const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(agreementItems.length).fill(false));
    const [allChecked, setAllChecked] = useState(false);

    const handleAllCheck = () => {
        const newAllChecked = !allChecked;
        setAllChecked(newAllChecked);
        setCheckedItems(new Array(agreementItems.length).fill(newAllChecked));
    };

    const handleItemCheck = (index: number) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
        
        // 모든 항목이 체크되었는지 확인
        setAllChecked(newCheckedItems.every(item => item));
    };

    return (
        <div className="agreement-container">
            <AgreeAll isChecked={allChecked} onCheck={handleAllCheck} />
            {agreementItems.map((title, index) => (
                <AgreementItem 
                    key={index} 
                    title={title} 
                    isChecked={checkedItems[index]}
                    onCheck={() => handleItemCheck(index)}
                />
            ))}
        </div>
    )
}

const AgreeAll = ({ isChecked, onCheck }: { isChecked: boolean; onCheck: () => void }) => {
    return (
        <div className="agree-all">
            <img 
                src={isChecked ? "/check-btn-active.svg" : "/check-btn.svg"} 
                alt="Logo" 
                className={`check-btn ${isChecked ? 'checked' : ''}`}
                onClick={onCheck}
            />
            <p className="agree-all-text">약관 전체 동의</p>
        </div>
    )
}

const AgreementItem = ({ 
    title, 
    isChecked, 
    onCheck 
}: { 
    title: string; 
    isChecked: boolean; 
    onCheck: () => void;
}) => {
    return (
        <div className="agreement-item">
            <img 
                src={isChecked ? "/check-btn-active.svg" : "/check-btn.svg"} 
                alt="Logo" 
                className={`check-btn ${isChecked ? 'checked' : ''}`}
                onClick={onCheck}
            />
            <p className="agreement-item-text">{title}</p>
            <img src="/arrow-detail.svg" alt="Logo" className="arrow-detail" />
        </div>
    )
}

export default Agreement;