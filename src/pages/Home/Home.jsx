import "./styles.css"
import person from "../../assets/images/person.png"

export default function Home() {
    return (<>
        <section className="hero">
            <div className="container text-center">
                <h1>Building the Future of <span className="highlight" id="highlight">You're Bills</span></h1>
                <p className="subtitle">description</p>
                <button className="btn primary">Get Started</button>
            </div>
        </section>

        <section className="features">
            <div className="container">
                <h2 className="section-title">Cards</h2>
            </div>
            <div className="container flex">
                <div className="feature-card" data-aos="zoom-in" data-aos-duration="700">
                    <div className="icon">🔑</div>
                    <h3>Test 1</h3>
                </div>
                <div className="feature-card" data-aos="zoom-in" data-aos-duration="800">
                    <div className="icon">📷</div>
                    <h3>Test 2</h3>
                </div>
                <div className="feature-card" data-aos="zoom-in" data-aos-duration="1000">
                    <div className="icon">✅</div>
                    <h3>test 3</h3>
                </div>
            </div>
        </section>

        <section className="about" id="about">
            <div className="container">
                <h2 className="section-title">About Qaddr</h2>
                <p>
                    Description
                </p>
            </div>
        </section>

        <section className="savings">
            <div className="container">
                <h2 className="section-title">test</h2>
            </div>
            <div className="container flex">
                <div className="savings-card" data-aos="fade-right" data-aos-duration="700">
                    <div className="icon">⌛</div>
                    <h3>test</h3>
                </div>
                <div className="savings-card" data-aos="zoom-in" data-aos-duration="700">
                    <div className="icon">💪</div>
                    <h3>test</h3>
                </div>
                <div className="savings-card" data-aos="fade-left" data-aos-duration="700">
                    <div className="icon">💸</div>
                    <h3>test</h3>
                </div>
            </div>
        </section>

        <section className="reviews">
            <div className="container text-center">
                <h2>What Our Clients Say</h2>
                <div className="review">
                    <img src={person} alt="User Review" />
                    <h3>Turki</h3>
                    <p>
                        My website is Amazing !!!
                    </p>
                </div>
            </div>
        </section>

        <section className="contact" id="contact">
            <h2>Contact Us</h2>
            <p>We’re here to help 24/7. Reach out to us anytime.</p>
            <a href="mailto:qaddr.estimations@gmail.com">
                <button className="btn primary">Contact Us</button>
            </a>
        </section>
    </>
    )
}
