import React, { useEffect, useState } from "react";
import axios from "axios";

function Weather() {
  const [pnameinput, setPnameInput] = useState("");
  const [pname, setPname] = useState("");
  const [cityInput, setInputCity] = useState("");
  const [city, setCity] = useState("");
  const [good, setGood] = useState("");
  const [nowday, setNowDay] = useState("");
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState(null);
  const [errorCity, setErrorCity] = useState("");
  const [namepop, setNamePop] = useState(true);

  useEffect(() => {
    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth();
    const months = [
      "Jan", "Feb", "March", "April", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const currentMonth = months[month];
    const currentDate = `${date} ${currentMonth}`;
    setNowDay(currentDate);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      if (hours >= 5 && hours < 12) {
        setGood("Good Morning,");
      } else if (hours >= 12 && hours < 18) {
        setGood("Good Afternoon,");
      } else if (hours >= 18 && hours < 21) {
        setGood("Good Evening,");
      } else {
        setGood("Good Night,");
      }
      console.log(hours)
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`);
      
    };

    const timer = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(timer);
  }, []);

  const API_KEY = "92b6230384b544f430df71e440adb207";

  const Weatherfetching = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setErrorCity("");
    } catch (err) {
      setErrorCity("City not found");
      setWeather(null);
    }
  };

  const cityChange = () => {
    setCity(cityInput);
    setInputCity("");
    Weatherfetching(cityInput);
    
  };
  console.log(weather);
  useEffect(()=>{
    let localName = localStorage.getItem("name");
    if(localName) {
      setPname(localName);
      setNamePop(false)
    }else {
      setNamePop(true)
    }
  

  },[])
  return (
    <section className="weather-main">
      <div className="weather-container">
        {namepop ? (<div className="name-input">
          <h4>May I Know Your Name?</h4>
           <input type="text" placeholder="Enter Your Name..." onChange={(e)=> setPnameInput(e.target.value)}/>
           <button onClick={()=> {setPname(pnameinput); setNamePop(false); 
            localStorage.setItem('name', pnameinput );
            const value = localStorage.getItem('name');
            setPname(value);
           }}>Submit</button>
           <button onClick={()=> {setNamePop(false); setPname("User");}}>Close</button>
        </div>
        ) : null}
        <div className="weather-box">
          <div className="weather-header">
            <div className="weather-greeting">
              <h1>
                {good}
                <br />
                <span>{pname}</span>
              </h1>
            </div>
            <div className="weather-time">
              <h1>
                {nowday}, {time}
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="form-box">
            <input
              type="text"
              onChange={(e) => setInputCity(e.target.value)}
              placeholder="Enter city..."
              value={cityInput}
            />
            <button onClick={cityChange} aria-label="Search">
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>

          {/* City Name or Error */}
          <div className="weather-city-name">
            <h2>{weather ? city : errorCity}</h2>
          </div>

          {/* Weather Data */}
          {weather ? (
            <div className="weather-main-box">
              <div className="weather-icon">
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                  />
              </div>
              <div className="weather-temp">
                <h3>{weather.main.temp}°C</h3>
              </div>
              <div className="weather-status">
                <h5>{weather.weather[0].main}</h5>
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </section>
  );
}

export { Weather };