import './ContinueButton.css';

const ContinueButton = (props: { 
    text: string, 
    onClick: () => void, 
    disabled?: boolean 
}) => {
    return (
        <div className='login-button-container'>
            <button 
                className={`login-button ${props.disabled ? 'disabled' : ''}`} 
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.text}
            </button>
        </div>
    )
}

export default ContinueButton;