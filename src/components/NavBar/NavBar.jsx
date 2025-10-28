import "./styles.css"
import fawateri from "../../assets/images/FAWATERI.svg";
import { Link } from "react-router";


export default function NavBar() {
    return (
        <header>
            <nav className="navbar">
                <div className="container">
                    <div className="logo">
                        <img src={fawateri} alt="Logo" />
                    </div>
                    <ul className="nav-links">
                        <li><a href="#Home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <div className="auth-buttons">
                        <button className="btn register">Signup</button>
                        <Link to={"/login"}>
                        <button className="btn login">Login</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}
