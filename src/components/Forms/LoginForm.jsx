/**
 * Table of Contents
 * - Imports
 * - UI (Component)
 */

// Imports
import { useState } from "react";
import "./styles.css";
import * as usersAPI from "../../utilities/users-api";
import { FiLogIn } from "react-icons/fi";

// UI (Component)
export default function LoginForm({ onSuccess }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState("");

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorText("");
        setIsLoading(true);
        try {
            const user = await usersAPI.login(formData);
            if (user) onSuccess?.(user);
            else setErrorText("Login failed");
        } catch (apiError) {
            setErrorText("Login failed");
            console.error(apiError);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="formCard">
            <h3 className="formCard__title">Login</h3>
            <form className="formCard__body" onSubmit={handleSubmit}>
                <div className="formCard__field">
                    <label htmlFor="login_username" className="formCard__label">Username</label>
                    <input id="login_username" name="username" type="text" required value={formData.username} onChange={handleChange} className="formCard__input" />
                </div>
                <div className="formCard__field">
                    <label htmlFor="login_password" className="formCard__label">Password</label>
                    <input id="login_password" name="password" type="password" required value={formData.password} onChange={handleChange} className="formCard__input" />
                </div>
                {errorText && <p className="formCard__error">{errorText}</p>}
                <div className="formCard__actions">
                    <button type="submit" className="formCard__button formCard__button--primary" disabled={isLoading} aria-label="Login">
                        <FiLogIn /> Login
                    </button>
                </div>
            </form>
        </div>
    );
}
