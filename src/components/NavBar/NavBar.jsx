import "./styles.css"
import fawateri from "../../assets/images/FAWATERI.svg";
import { Link } from "react-router";
import { HashLink } from "react-router-hash-link";

export default function NavBar() {
    return (
        <header>
            <nav className="navbar">
                <div className="container">
                    <div className="logo">
                        <img src={fawateri} alt="Logo" />
                    </div>
                    <ul className="nav-links">
                        <li>
                            <HashLink smooth to="/#home">Home</HashLink>
                        </li>
                        <li>
                            <HashLink smooth to="/#about">About</HashLink>
                        </li>
                        <li>
                            <HashLink smooth to="/#contact">Contact</HashLink>
                        </li>
                        <Link to={"/bills"}>
                            <li>Bills</li>
                        </Link>
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
