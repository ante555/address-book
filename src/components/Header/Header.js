import React from "react";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { logOut } = UseAuth();

  const handleLogout = async () => {
    try {
      // setError("");
      await logOut();
      navigate("/");
    } catch {
      // setError("Failed to sign up");
    }
  };

  return (
    <header className="header">
      <div className="container__items">
        <div className="container__tittle">
          <h1 className="header__title"> Moj adresar </h1>
        </div>
        <button className="header--button" onClick={handleLogout}>
          Odjavite se
        </button>
      </div>
    </header>
  );
};

export default Header;
