import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import "./weatherExtended.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";

export default function WeatherExtended() {
  const { id: flag } = useParams();
  const user = useSelector((user) => user);

  const [data, setData] = useState([]);

  const config = {
    headers: { key: process.env.REACT_APP_WEATHER_API_KEY },
  };
  var currentDate = Date.now();
  const newDate = new Date(currentDate);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const changedDay = newDate.setDate(newDate.getDate() - 4);
  const adapted = new Date(changedDay);
  const oldDay = adapted.getDate();
  const oldMonth = adapted.getMonth() + 1;

  const [loading, setLoading] = useState(false);

  const country = user.country;

  useEffect(() => {
    setLoading(true);
    let endpoint = {};
    if (flag === "prev") {
      endpoint = `http://api.weatherapi.com/v1/history.json?q=${country}&dt=${year}-${oldMonth}-${oldDay}&end_dt=${year}-${month}-${day}`;
    } else {
      endpoint = `http://api.weatherapi.com/v1/forecast.json?q=${country}&days=4`;
    }

    axios
      .get(endpoint, config)
      .then((response) => {
        setLoading(false);
        const data = response.data;
        setData(response.data.forecast.forecastday);
      })
      .catch((err) => console.log(err));
  }, []);
  const backArrow = "<- ";

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <NavBar />
      {loading ? (
        <b className="loader loader-ex">Loading...</b>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Link
            to="/weatherNow"
            style={{
              color: "#fff",
              position: "absolute",
              top: "80px",
              left: "30px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <b>{backArrow}</b>Back
          </Link>

          {data.map((weather, index) => {
            return <WeatherCard key={index} weather={weather} />;
          })}
        </div>
      )}
    </div>
  );
}
