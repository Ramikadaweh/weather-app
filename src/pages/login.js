import React, { useState } from "react";
import weatherImg from "../images/weather.jpg";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { SAVE } from "../redux/actions";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    country: "",
  });
  const [error, setError] = useState(null);

  function isValidEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(user.email)) {
      setError("Email is invalid");
      return;
    } else {
      setError(null);
    }
    dispatch({ type: SAVE, payload: user });
    navigate("/weatherNow");
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="login">
      <div>
        <img className="logimg" src={weatherImg} alt=""></img>
      </div>
      <form className="formLog" id="login_form" onSubmit={handleSubmit}>
        <h1 style={{ color: "#00BFFF" }}>Good to see you again</h1>
        <p className="psign">Log in</p>
        <div>
          <input
            type="text"
            placeholder="name"
            name="name"
            value={user.name}
            onChange={handleChange}
          ></input>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          ></input>
          {error && <p style={{ color: "red", margin: "5px 0" }}>{error}</p>}
          <input
            type="text"
            placeholder="country"
            name="country"
            value={user.country}
            onChange={handleChange}
          ></input>
          <br />
          <button className="btn" type="submit">
            login
          </button>
        </div>
      </form>
    </div>
  );
}
