/**
 * Table of Contents
 * - Imports
 * - UI (Component)
 */

// Imports
import { useState } from "react";
import "./styles.css";
import * as usersAPI from "../../utilities/users-api";
import { FiUserPlus } from "react-icons/fi";

// UI (Component)
export default function SignupForm({ onSuccess }) {
    const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState("");

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorText("");
        
        if (formData.password !== formData.confirmPassword) {
            setErrorText("Passwords do not match");
            return;
        }
        
        setIsLoading(true);
        try {
            const { confirmPassword, ...signupData } = formData;
            const user = await usersAPI.signup(signupData);
            if (user) onSuccess?.(user);
            else setErrorText("Signup failed");
        } catch (apiError) {
            setErrorText("Signup failed");
            console.error(apiError);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="formCard">
            <h3 className="formCard__title">Create account</h3>
            <form className="formCard__body" onSubmit={handleSubmit}>
                <div className="formCard__field">
                    <label htmlFor="signup_username" className="formCard__label">Username</label>
                    <input id="signup_username" name="username" type="text" required value={formData.username} onChange={handleChange} className="formCard__input" />
                </div>
                <div className="formCard__field">
                    <label htmlFor="signup_email" className="formCard__label">Email</label>
                    <input id="signup_email" name="email" type="email" required value={formData.email} onChange={handleChange} className="formCard__input" />
                </div>
                <div className="formCard__field">
                    <label htmlFor="signup_password" className="formCard__label">Password</label>
                    <input id="signup_password" name="password" type="password" required value={formData.password} onChange={handleChange} className="formCard__input" />
                </div>
                <div className="formCard__field">
                    <label htmlFor="signup_confirm_password" className="formCard__label">Confirm Password</label>
                    <input id="signup_confirm_password" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="formCard__input" />
                </div>
                {errorText && <p className="formCard__error">{errorText}</p>}
                <div className="formCard__actions">
                    <button type="submit" className="formCard__button formCard__button--primary" disabled={isLoading} aria-label="Sign up">
                        <FiUserPlus /> Sign up
                    </button>
                </div>
            </form>
        </div>
    );
}
