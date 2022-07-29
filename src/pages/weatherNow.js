import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function WeatherNow() {
  const user = useSelector((user) => user);

  const [data, setData] = useState({
    icon: "",
    text: "",
    temp: "",
    hum: "",
    press: "",
  });

  const [loading, setLoading] = useState(false);
  const config = {
    headers: { key: process.env.REACT_APP_WEATHER_API_KEY },
  };

  const country = user.country;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://api.weatherapi.com/v1/current.json?q=${country}`, config)
      .then((response) => {
        let resData = response.data.current;
        setLoading(false);
        setData(response.data.current);
        setData({
          icon: resData.condition.icon,
          text: resData.condition.text,
          temp: resData.temp_c,
          hum: resData.humidity,
          press: resData.pressure_mb,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      {loading ? (
        <b className="loader">Loading...</b>
      ) : (
        <section className="today-weather">
          <img
            width="200px"
            src={data.icon}
            alt=""
            srcSet=""
            style={{ marginTop: "8%" }}
          />
          <p className="weather-now">{data.text}</p>

          <div>
            <h2>Temperature</h2>
            <h1>{data.temp} ºC</h1>
            <p>
              <span className="today-humidity-title">Humidity: </span>
              <b className="today-humidity-value">{data.hum}%</b>
              <span className="today-Pressure-title"> Pressure: </span>
              <b className="today-Pressure-value">{data.press}mb</b>
            </p>
          </div>
          <p>
            The weather for previous days ?
            <Link to="/weatherExtended/prev">previous days</Link>
          </p>
          <p>
            The weather for next days ?
            <Link to="/weatherExtended/next">next days</Link>
          </p>
        </section>
      )}
    </div>
  );
}
