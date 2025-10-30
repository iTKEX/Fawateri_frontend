import "./styles.css"

export default function Popup({ children, modalAction, setModalAction }) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button onClick={() => setModalAction(!modalAction)}>X</button>
                {children}
            </div>
        </div>
    )
}
