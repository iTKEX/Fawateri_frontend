import "./styles.css"
import React from 'react'

export default function Popup({ children, newBillAction, setNewBillAction }) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button onClick={() => setNewBillAction(!newBillAction)}>X</button>
                {children}
            </div>
        </div>
    )
}
