/**
 * Table of Contents
 * - Imports
 * - UI (Component)
 * - Hooks (State/Refs/Effects)
 * - Handlers
 */

// Imports
import Home from "../Home/Home";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Bills from "../Bills/Bills";
import { Routes, Route, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Popup from "../../components/Popup/Popup";
import SignupForm from "../../components/Forms/SignupForm";
import LoginForm from "../../components/Forms/LoginForm";
import * as usersAPI from "../../utilities/users-api";
import "./App.css";

// UI (Component)
export default function App() {

  // Hooks (State/Refs/Effects)
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState({ open: false, type: null });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (!user && window.location.pathname !== '/') {
      navigate('/');
    }
  }, [user, navigate]);

  // Handlers
  function openSignup() { setAuthModal({ open: true, type: "signup" }); }
  function openLogin() { setAuthModal({ open: true, type: "login" }); }
  function closeAuth() { setAuthModal({ open: false, type: null }); }

  function handleLogout() {
    usersAPI.logout();
    localStorage.removeItem("user");
    setUser(null);
    navigate('/');
  }

  function handleAuthSuccess(nextUser) {
    if (nextUser) localStorage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser || null);
    closeAuth();
  }

  return (
    <div className="app">
      <NavBar
        user={user}
        onOpenSignup={openSignup}
        onOpenLogin={openLogin}
        onLogout={handleLogout}
      />

      {authModal.open && (
        <Popup modalAction={authModal.open} setModalAction={closeAuth}>
          {authModal.type === "signup" ? (
            <SignupForm onClose={closeAuth} onSuccess={handleAuthSuccess} />
          ) : (
            <LoginForm onClose={closeAuth} onSuccess={handleAuthSuccess} />
          )}
        </Popup>
      )}

      <main className="app__content">
        <Routes>
          <Route path="/*" element={<Home onOpenLogin={openLogin} />} />
          <Route
            path="/bills"
            element={user ? <Bills /> : <Home />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
