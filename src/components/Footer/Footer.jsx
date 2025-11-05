/**
 * Table of Contents
 * - Imports
 * - UI (Component)
 */


// Imports
import "./styles.css";
import fawateri from "../../assets/images/FAWATERI.svg";

// UI (Component)
export default function Footer({ user }) {
    return (
        <footer className="site-footer" role="contentinfo">
            <div className="site-footer__inner">
                <div className="site-footer__column">
                    <h3 className="site-footer__title">Company</h3>
                    <a className="site-footer__link" href="#about">About</a>
                    <a className="site-footer__link" href="#contact">Contact</a>
                </div>

                <div className="site-footer__logo">
                    <img src={fawateri} alt="Fawateri Logo" />
                </div>

                <div className="site-footer__column">
                    <h3 className="site-footer__title">Services</h3>
                    {user ? (
                        <a className="site-footer__link" href="/bills">Bills</a>
                    ) : (
                        <>
                            <a className="site-footer__link" href="/login">Login</a>
                            <a className="site-footer__link" href="/register">Sign Up</a>
                        </>
                    )}
                </div>
            </div>

            <p className="site-footer__copyright">
                &copy; 2025 Fawateri. All rights reserved.
            </p>
        </footer>
    );
}
