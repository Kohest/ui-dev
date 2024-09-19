import React, { useState } from "react";
import "./WeatherCard.css";
import search from "../images/weather/search.png";
import rainIcon from "../images/weather/rain.png";
import cloudsIcon from "../images/weather/clouds.png";
import clearIcon from "../images/weather/clear.png";
import mistIcon from "../images/weather/mist.png";
import humidityIcon from "../images/weather/humidity.png";
import windIcon from "../images/weather/wind.png";

const apiKey = "8c4ecc3c61f6e532a7afd52b3226ea5c";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
  weather: {
    main: string;
  }[];
}
enum Colors {
  basic = "linear-gradient(135deg, #00feba, #5b548a)",
  black = "linear-gradient(135deg, #63746f, #1e1c27)",
  white = "linear-gradient(135deg, #c4d8d3, #716f79)",
}

interface Props {
  color?: keyof typeof Colors;
}

const weatherIcons: { [key: string]: string } = {
  Clouds: cloudsIcon,
  Rain: rainIcon,
  Clear: clearIcon,
  Mist: mistIcon,
  default: rainIcon,
};

const getWeatherIcon = (main: string) =>
  weatherIcons[main] || weatherIcons.default;

export const WeatherCard: React.FC<Props> = ({ color = "basic" }) => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<{
    data: WeatherData | null;
    icon: string;
  }>({ data: null, icon: rainIcon });
  const [error, setError] = useState<boolean>(false);

  const checkWeather = async (city: string) => {
    try {
      const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
      if (!response.ok) throw new Error("City not found");

      const data: WeatherData = await response.json();
      setWeather({
        data,
        icon: getWeatherIcon(data.weather[0].main),
      });
      setError(false);
    } catch (error) {
      setError(true);
      setWeather({ data: null, icon: rainIcon });
    }
  };

  const handleSearchClick = () => {
    if (city.trim() !== "") {
      checkWeather(city);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div
      className={"main__content"}
      style={{
        background: Colors[color],
      }}
    >
      <div className={"search"}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          spellCheck="false"
        />
        <button onClick={handleSearchClick}>
          <img src={search} alt="search" />
        </button>
      </div>
      {error ? (
        <div className={"error"}>
          <p>Wrong city name</p>
        </div>
      ) : (
        weather.data && (
          <div className={"weather"}>
            <img src={weather.icon} alt="weather" className={"weather__icon"} />
            <h1 className={"temp"}>{Math.round(weather.data.main.temp)}°C</h1>
            <h2 className={"city"}>{weather.data.name}</h2>
            <div className={"details"}>
              <div className="col col_first">
                <img src={humidityIcon} alt="humidity" />
                <div>
                  <p className="humidity">{weather.data.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col col_second">
                <img src={windIcon} alt="wind" />
                <div>
                  <p className="wind">{weather.data.wind.speed} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
