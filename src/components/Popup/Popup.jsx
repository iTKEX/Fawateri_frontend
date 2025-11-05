/**
 * Table of Contents
 * - Imports
 * - UI (Component)
 */

// Imports
import "./styles.css";
import { FiX } from "react-icons/fi";

// UI (Component)
export default function Popup({ children, modalAction, setModalAction }) {
    if (!modalAction) return null;

    return (
        <div className="popup-overlay" aria-modal="true" role="dialog">
            <div className="popup-content">
                <button
                    type="button"
                    className="popup-close-button"
                    aria-label="Close"
                    title="Close"
                    onClick={() => setModalAction(!modalAction)}
                >
                    <FiX />
                </button>
                {children}
            </div>
        </div>
    );
}
