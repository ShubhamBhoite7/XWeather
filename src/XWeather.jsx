import { useState } from "react";
import styles from "./XWeather.module.css";

export default function XWeather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setWeatherData(null);

    try {
      const resp = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=ead7d1e7b45b4c85afb52701252804&q=${city}`
      );
      const data = await resp.json();

      if (data.error) {
        alert("Failed to fetch weather data");
        setLoading(false);
        return;
      }
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Failed to fetch weather data");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={city}
          placeholder="Enter city name "
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={handleClick}>Search</button>
      </div>

      {loading && <p>Loading data…</p>}
      {weatherData && (
        <div className={styles[`weather-cards`]}>
          <div className={styles[`weather-card`]}>
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c} °C</p>
          </div>
          <div className={styles[`weather-card`]}>
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity} %</p>
          </div>
          <div className={styles[`weather-card`]}>
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text} %</p>
          </div>
          <div className={styles[`weather-card`]}>
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} %</p>
          </div>
        </div>
      )}
    </div>
  );
}
