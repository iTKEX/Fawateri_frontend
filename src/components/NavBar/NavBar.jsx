/**
 * Table of Contents
 * - Imports
 * - UI (Component)
 */

// Imports
import "./styles.css";
import fawateri from "../../assets/images/FAWATERI.svg";
import { Link } from "react-router";
import { HashLink } from "react-router-hash-link";
import { FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";

// UI (Component)
export default function NavBar({ user, onOpenSignup, onOpenLogin, onLogout }) {
    return (
        <header className="navigation" role="banner">
            <nav className="navigation__inner" aria-label="Primary">
                <div className="navigation__brand">
                    <img className="navigation__logo" src={fawateri} alt="Fawateri logo" />
                </div>

                <ul className="navigation__links" role="menubar">
                    {user ? (
                        <>
                            <li role="none">
                                <Link className="navigation__link" to="/bills" role="menuitem">Bills</Link>
                            </li>
                            <li role="none">
                                <HashLink className="navigation__link" smooth to="/#home" role="menuitem">Home</HashLink>
                            </li>
                            <li role="none">
                                <HashLink className="navigation__link" smooth to="/#about" role="menuitem">About</HashLink>
                            </li>
                            <li role="none">
                                <HashLink className="navigation__link" smooth to="/#contact" role="menuitem">Contact</HashLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li role="none">
                                <HashLink className="navigation__link" smooth to="/#home" role="menuitem">Home</HashLink>
                            </li>
                            <li role="none">
                                <HashLink className="navigation__link" smooth to="/#about" role="menuitem">About</HashLink>
                            </li>
                            <li role="none">
                                <HashLink className="navigation__link" smooth to="/#contact" role="menuitem">Contact</HashLink>
                            </li>
                        </>
                    )}
                </ul>

                {user ? (
                    <div className="navigation__auth">
                        <span className="navigation__greeting">Hi, {user.username}</span>
                        <button
                            type="button"
                            className="navigation__button"
                            onClick={onLogout}
                            aria-label="Logout"
                            title="Logout"
                        >
                            <FiLogOut /> Logout
                        </button>
                    </div>
                ) : (
                    <div className="navigation__auth">
                        <button
                            type="button"
                            className="navigation__button"
                            onClick={onOpenSignup}
                            aria-label="Signup"
                            title="Signup"
                        >
                            <FiUserPlus /> Sign up
                        </button>
                        <button
                            type="button"
                            className="navigation__button navigation__button--primary"
                            onClick={onOpenLogin}
                            aria-label="Login"
                            title="Login"
                        >
                            <FiLogIn /> Sign in
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
}
