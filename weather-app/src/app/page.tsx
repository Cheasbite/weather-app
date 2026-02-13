"use client"
import { ChangeEvent, useState } from "react";

const api_path = "/api/weather?"
let input_placeholder = "Enter a City (Example: Phnom Penh)"

function response() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('')
  const [userinput, setUserinput] = useState('')

  const fetch_weather_data = async (e: ChangeEvent) => {
    e.preventDefault();
    if (userinput === "") {
      return [fetch_weather_data, null, null, userinput, setUserinput]
    }

    const weather_response = await fetch(`${api_path}city=${userinput}`)
    if (!weather_response.ok) {
      alert("Error! " + userinput + " is invalid!")
      return [fetch_weather_data, null, null, userinput, setUserinput]
    }

    const weather_data = await weather_response.json()
    setWeather(weather_data)
    setCity(userinput)
  }

  return [fetch_weather_data, weather, city, userinput, setUserinput]
}

function weatherDisplay(weather_array: any) {
  if (weather_array === null) {
    return (null);
  }

  return (
    <section id="section">
      <div id="0">
        <h2>
          <span className="m-25 text-violet-400/80">Result: <br /></span>
          Location: {weather_array.name} <br />
          Temperature: {weather_array.main.temp}°C <br />
          Humidity: {weather_array.main.humidity} <br />
          Description: {weather_array.weather[0].description}
        </h2>
      </div>
    </section>
  );
}

function cityInput(Handler: any, userinput: any, setUserinput: Function) {
  return (
    <form onSubmit={Handler}>
      <input placeholder={input_placeholder} type="text" size={80} 
      value={userinput}
      onChange={(e) => setUserinput(e.target.value)} />
    </form>
  );
}

export default function Home() {

  const [Handler, weather, _, userinput, setUserinput] = response()

  return (
    <div>
      <main>
        <h1 id="init">Welcome to my<span id="w_dec"><strong>Weather Webpage</strong></span>!</h1>
        <p>Enter a <span id="City">City Name</span> and press <span id="Enter">Enter</span> to begin.</p>

        {cityInput(Handler, userinput, setUserinput)}

        {weatherDisplay(weather)}

        <footer>
          <p>&copy; My Weather Wabpage.</p>
        </footer>
      </main>
    </div>
  );
}
