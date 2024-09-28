import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState({
    humidity: null,
    windSpeed: null,
    temperature: null,
    location: '',
    icon: ''
  });

  const allIcons = {
    "1000": clear_icon, // Sunny/Clear
    "1003": cloud_icon, // Partly Cloudy
    "1006": cloud_icon, // Cloudy
    "1009": cloud_icon, // Overcast
    "1030": drizzle_icon, // Mist
    "1063": rain_icon, // Patchy rain possible
    "1066": snow_icon, // Patchy snow possible
    "1069": drizzle_icon, // Patchy sleet possible
    "1072": drizzle_icon, // Patchy freezing drizzle possible
    "1087": rain_icon, // Thundery outbreaks possible
    "1114": snow_icon, // Blowing snow
    "1117": snow_icon, // Blizzard
    "1135": drizzle_icon, // Fog
    "1147": drizzle_icon, // Freezing fog
    "1150": drizzle_icon, // Patchy light drizzle
    "1153": drizzle_icon, // Light drizzle
    "1168": drizzle_icon, // Freezing drizzle
    "1171": drizzle_icon, // Heavy freezing drizzle
    "1180": rain_icon, // Patchy light rain
    "1183": rain_icon, // Light rain
    "1186": rain_icon, // Moderate rain at times
    "1189": rain_icon, // Moderate rain
    "1192": rain_icon, // Heavy rain at times
    "1195": rain_icon, // Heavy rain
    "1198": drizzle_icon, // Light freezing rain
    "1201": drizzle_icon, // Moderate or heavy freezing rain
    "1204": drizzle_icon, // Light sleet
    "1207": drizzle_icon, // Moderate or heavy sleet
    "1210": snow_icon, // Patchy light snow
    "1213": snow_icon, // Light snow
    "1216": snow_icon, // Patchy moderate snow
    "1219": snow_icon, // Moderate snow
    "1222": snow_icon, // Patchy heavy snow
    "1225": snow_icon, // Heavy snow
    "1237": snow_icon, // Ice pellets
    "1240": rain_icon, // Light rain shower
    "1243": rain_icon, // Moderate or heavy rain shower
    "1246": rain_icon, // Torrential rain shower
    "1249": drizzle_icon, // Light sleet showers
    "1252": drizzle_icon, // Moderate or heavy sleet showers
    "1255": snow_icon, // Light snow showers
    "1258": snow_icon, // Moderate or heavy snow showers
    "1261": snow_icon, // Light showers of ice pellets
    "1264": snow_icon, // Moderate or heavy showers of ice pellets
    "1273": rain_icon, // Patchy light rain with thunder
    "1276": rain_icon, // Moderate or heavy rain with thunder
    "1279": snow_icon, // Patchy light snow with thunder
    "1282": snow_icon, // Moderate or heavy snow with thunder
  };

  const search = async (city) => {
    if (city === ""){
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=04f1f739df874cf9ad180208242809&q=${city}&aqi=no`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok){
        alert(data.message);
        return;
      }

      console.log(data);
      setWeatherData({
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        temperature: Math.floor(data.current.temp_c),
        location: data.location.name,
        icon: allIcons[data.current.condition.code] || data.current.condition.icon
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Jhelum");
  }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
      </div>
      {weatherData?<>
        <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}°c</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="Humidity" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="Wind Speed" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </>:<></>}
      
    </div>
  );
};
export default Weather;
