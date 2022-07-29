import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CLEAR } from "../redux/actions";
import { useSelector } from "react-redux";
import "./navBar.css";

export default function NavBar() {
  const user = useSelector((user) => user);
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: CLEAR });
  };

  const current = new Date().getHours();
  useEffect(() => {
    current >= 5 && current < 12
      ? setMsg("Good morning")
      : current >= 12 && current < 18
      ? setMsg("Good afternoon")
      : setMsg("Good evening");
  }, [current]);

  return (
    <div className="nav">
      <h3 style={{ color: "rgb(0, 183, 255)", marginLeft: "2%" }}>
        {msg} {user.name}
      </h3>
      <h3>
        <button
          className="navbtn"
          onClick={handleLogout}
          style={{ marginRight: "20px" }}
        >
          logout
        </button>
      </h3>
    </div>
  );
}
