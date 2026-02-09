"use client"
import { useState } from "react";

export default function Home() {
  const [weather, setweather] = useState(null)
  const [city, setCity] = useState('')
  const [userinput, Setuserinput] = useState('')

  const func = async (e: any) => {
    e.preventDefault();
    try {
      const req = await fetch(`/api/weather?city=${userinput}`)
      const data = await req.json();
      setweather(data)
      setCity(userinput)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <main>
        <h1 id="init">Welcome to my<span id="w_dec"><strong>Weather Webpage</strong></span>!</h1>
        <p>Enter a <span id="City">City Name</span> and press <span id="Enter">Enter</span> to begin.</p>
        <form onSubmit={func}>
          <input placeholder="Enter a City (Example: Phnom Penh)" type="text" size={80} 
          value={userinput}
          onChange={(e) => Setuserinput(e.target.value)} />
        </form>
        {
          weather && weather.main &&
          <section id="section">
            <div id="0">
              <h2>
                <span className="m-25 text-violet-400/80">Result: <br /></span>
                Location: {weather.name} <br />
                Temperature: {weather.main.temp}°C <br />
                Humidity: {weather.main.humidity} <br />
                Description: {weather.weather[0].description}
              </h2>
            </div>
          </section>
        }
        <footer>
          <p>&copy; My Weather Wabpage.</p>
        </footer>
      </main>
    </div>
  );
}
