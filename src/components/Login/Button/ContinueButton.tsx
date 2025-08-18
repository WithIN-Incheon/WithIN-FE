import './ContinueButton.css';
const ContinueButton = (props: { text: string, onClick: () => void}) => {
    return (
        <div className='login-button-container'>
            <button className='login-button' onClick={props.onClick} >{props.text}</button>
        </div>
    )
}

export default ContinueButton;