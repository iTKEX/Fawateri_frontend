import "./styles.css"
import fawateri from "../../assets/images/FAWATERI.svg";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container flex">
                <div className="company-info">
                    <h3>Company</h3>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>
                <div className="footer-logo">
                    <img src={fawateri} alt="Fawateri Logo" />
                </div>
                <div className="services">
                    <h3>Services</h3>
                    <a href="/login">Login</a>
                    <a href="/register">Sign Up</a>
                </div>
            </div>
            <p className="copyright">&copy; 2025 Fawateri. All rights reserved.</p>
        </footer>
    )
}
