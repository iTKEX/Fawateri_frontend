import "./styles.css"

export default function Login() {
    return (
        <>
            <input
                className="message"
                type="text"
                value={alert || ""}
                style={{ display: "none" }}
                readOnly
            />

            <form>
                <main>
                    <div className="logo">
                        <img
                            src="/logo/png/logo-black-removebg-preview.png"
                            alt="logo-black"
                        />
                    </div>

                    <div className="text">
                        <h1>Login,</h1>
                        <h2>Welcome to Qaddr</h2>
                    </div>

                    <div className="login">
                        <br />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                        />
                        <br />

                        <div className="pass">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                            <a href="/reset">Forget Password?</a>
                        </div>

                        <br />
                        <button type="submit">Login</button>
                        <center>
                            <h4>
                                Don’t have an account? <a href="/register">Sign Up</a>
                            </h4>
                        </center>
                    </div>
                </main>
            </form>

            <div className="right">
                <img src="/images/car.png" alt="car" />
            </div>
        </>
    );
}
