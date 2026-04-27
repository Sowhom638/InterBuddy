import React, {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GiTireIronCross } from "react-icons/gi";
import { MdHistory } from "react-icons/md";
import { VscMenu } from "react-icons/vsc";
import axios from "axios";
import "../style/header.scss";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const {user, handleGoogleRegister, handleLogout} = useAuth();
  const [googleError, setGoogleError] = useState(null);
  const [isMenubarOpen, setIsMenuBarOpen] = useState(false);
  const navigate = useNavigate();


  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then(async (resp) => {
        await handleGoogleRegister({
          username: resp?.data?.name,
          email: resp?.data?.email,
          picture: resp?.data?.picture,
        });
      })
      .catch((error) => setGoogleError(error))
      .finally(() => {
        navigate('/');
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => setGoogleError(error),
  });

  const logout = async () => {
    await handleLogout();
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link to="/home" className="header__logo">
          <span className="header__title">💻InterBuddy</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="header__nav header__nav--desktop">
          <div className="header__actions">
            {user && (
              <Link to="/history" className="header__link">
                <MdHistory className="header__icon" />
                <span>History</span>
              </Link>
            )}
            {user && (
              <div className="header__user">
                <div className="header__avatar">
                  <img
                    src={user?.picture}
                    alt={user?.username}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="header__username">{user?.username}</span>
              </div>
            )}
            {user ? (
              <button onClick={logout} className="header__btn header__btn--logout">
                Log Out
              </button>
            ) : (
              <button onClick={login} className="header__btn header__btn--signin">
                Sign in
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="header__mobile-toggle"
          onClick={() => setIsMenuBarOpen(!isMenubarOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenubarOpen}
        >
          {isMenubarOpen ? <GiTireIronCross /> : <VscMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav className={`header__nav header__nav--mobile ${isMenubarOpen ? "header__nav--mobile--open" : ""}`}>
        <ul className="header__menu">
          {user && (
            <li className="header__menu-item">
              <Link to="/history" className="header__menu-link" onClick={() => setIsMenuBarOpen(false)}>
                <MdHistory className="header__icon" />
                <span>History</span>
              </Link>
            </li>
          )}
          {user && (
            <li className="header__menu-item header__menu-item--user">
              <div className="header__avatar header__avatar--large">
                <img
                  src={user?.picture}
                  alt={user?.username}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="header__username">{user?.username}</span>
            </li>
          )}
          {user ? (
            <li className="header__menu-item">
              <button onClick={() => { logout(); setIsMenuBarOpen(false); }} className="header__btn header__btn--logout header__btn--mobile">
                Log Out
              </button>
            </li>
          ) : (
            <li className="header__menu-item">
              <button onClick={login} className="header__btn header__btn--signin header__btn--mobile">
                Sign in
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;