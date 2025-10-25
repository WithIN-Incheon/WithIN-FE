import "./Medi-popup.css";

const MediPopup = ({ text }: { text: string }) => {
    return (
        <div className="medi-popup">
            <p className="medi-popup-text">{text}</p>
        </div>
    );
};

export default MediPopup;