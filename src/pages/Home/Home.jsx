/**
 * Table of Contents
 * - Imports
 * - UI (Component)
 * - Handlers
 */

// Imports
import "./styles.css";
import person from "../../assets/images/Person.svg";
import {
    FiArrowRightCircle,
    FiKey,
    FiCamera,
    FiCheckCircle,
    FiShield,
    FiDollarSign,
    FiFileText,
} from "react-icons/fi";
import { useNavigate } from "react-router";

// UI (Component)
export default function Home({ user, onOpenLogin }) {
    const navigate = useNavigate();

    // Handlers
    const handleGetStarted = () => {
        if (user) {
            navigate("/bills");
        } else {
            onOpenLogin?.();
        }
    };

    return (
        <main className="home">
            {/* Hero */}
            <section className="home__hero" id="home">
                <div className="home__hero-container">
                    <h1 className="home__hero-title">
                        Manage <span className="home__hero-highlight" id="highlight">Your Bills</span> in One Place
                    </h1>
                    <p className="home__hero-subtitle">
                        Fawateri keeps your receipts, warranties, and service records safely stored and easy to find—whenever you need them.
                    </p>

                    <button
                        className="home__button home__button--primary"
                        aria-label="Get started"
                        title="Get started"
                        type="button"
                        onClick={handleGetStarted}
                    >
                        Get started now
                        <FiArrowRightCircle className="home__button-icon" />
                    </button>
                </div>
            </section>

            {/* Features */}
            <section className="home__section home__features">
                <div className="home__section-container">
                    <div className="home__section-header">
                        <h2 className="home__section-title">Get Going</h2>
                    </div>

                    <div className="home__cards" role="list">
                        <article
                            className="home__card home__card--feature"
                            role="listitem"
                            data-aos="zoom-in"
                            data-aos-duration="700"
                        >
                            <div className="home__card-icon"><FiKey /></div>
                            <h3 className="home__card-title">Sign in</h3>
                        </article>

                        <article
                            className="home__card home__card--feature"
                            role="listitem"
                            data-aos="zoom-in"
                            data-aos-duration="800"
                        >
                            <div className="home__card-icon"><FiCamera /></div>
                            <h3 className="home__card-title">Upload your bills</h3>
                        </article>

                        <article
                            className="home__card home__card--feature"
                            role="listitem"
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                        >
                            <div className="home__card-icon"><FiCheckCircle /></div>
                            <h3 className="home__card-title">Saved successfully</h3>
                        </article>
                    </div>
                </div>
            </section>

            {/* About */}
            <section className="home__section home__about" id="about">
                <div className="home__section-container">
                    <div className="home__section-header">
                        <h2 className="home__section-title">About Fawateri</h2>
                    </div>
                    <p className="home__paragraph home__paragraph--center">
                        Fawateri is a simple, secure way to store all types of bills—purchases, car service, device repairs, and more.
                        Keep proof of purchase handy for warranty claims, share records when needed, and find any bill in seconds.
                    </p>
                </div>
            </section>

            {/* Benefits */}
            <section className="home__section home__savings">
                <div className="home__section-container">
                    <div className="home__section-header">
                        <h2 className="home__section-title">Why Fawateri</h2>
                    </div>

                    <div className="home__cards" role="list">
                        <article
                            className="home__card home__card--savings"
                            role="listitem"
                            data-aos="fade-right"
                            data-aos-duration="700"
                        >
                            <div className="home__card-icon"><FiFileText /></div>
                            <h3 className="home__card-title">Warranty tracking</h3>
                        </article>

                        <article
                            className="home__card home__card--savings"
                            role="listitem"
                            data-aos="zoom-in"
                            data-aos-duration="700"
                        >
                            <div className="home__card-icon"><FiShield /></div>
                            <h3 className="home__card-title">Secure cloud backup</h3>
                        </article>

                        <article
                            className="home__card home__card--savings"
                            role="listitem"
                            data-aos="fade-left"
                            data-aos-duration="700"
                        >
                            <div className="home__card-icon"><FiDollarSign /></div>
                            <h3 className="home__card-title">Save time & money</h3>
                        </article>
                    </div>
                </div>
            </section>

            {/* Reviews */}
            <section className="home__section home__reviews">
                <div className="home__section-container">
                    <div className="home__section-header home__section-header--center">
                        <h2 className="home__section-title">What Our Clients Say</h2>
                    </div>

                    <div className="home__review-card">
                        <img className="home__review-avatar" src={person} alt="User Review" />
                        <h3 className="home__review-author">Turki</h3>
                        <p className="home__review-text">My website is amazing!</p>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="home__contact" id="contact">
                <div className="home__section-container home__section-container--center">
                    <h2 className="home__contact-title">Contact Us</h2>
                    <p className="home__contact-text">
                        We’re here to help 24/7. Reach out to us anytime.
                    </p>
                    <a className="home__contact-link" href="mailto:info.bills@fawateri.com">
                        <button
                            className="home__button home__button--primary"
                            aria-label="Contact us"
                            title="Contact us"
                            type="button"
                        >
                            Contact Us
                        </button>
                    </a>
                </div>
            </section>
        </main>
    );
}
