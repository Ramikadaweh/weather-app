import React from "react";

const WeatherCard = ({ weather }) => {
  return (
    <div>
      <p className="hour" style={{ marginTop: "200px" }}>
        {weather.date}
      </p>
      <p className="hour">{weather.day.maxtemp_c}ºC</p>
      <img width="100px" src={weather.day.condition.icon} alt="" />
      <p className="temperature">{weather.day.mintemp_c}ºC</p>
    </div>
  );
};

export default WeatherCard;
