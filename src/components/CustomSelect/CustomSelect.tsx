import { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    className?: string;
}

const CustomSelect = ({ options, value, onChange, placeholder, className = '' }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={`custom-select ${className}`} ref={selectRef}>
            <div 
                className={`custom-select-trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={selectedOption ? 'selected' : 'placeholder'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <svg 
                    className={`custom-select-arrow ${isOpen ? 'open' : ''}`}
                    width="12" 
                    height="8" 
                    viewBox="0 0 12 8"
                >
                    <path 
                        d="M1 1l5 5 5-5" 
                        stroke="#999" 
                        strokeWidth="2" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            
            {isOpen && (
                <div className="custom-select-dropdown">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`custom-select-option ${value === option.value ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
