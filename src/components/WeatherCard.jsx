import React, { useRef, useState } from 'react';
import './styles/weatherCard.css';

const WeatherCard = ({ weather, temp, setTextInput, hasError }) => {
  const [isCelsius, setIsCelsius] = useState(true);
 
  console.log(weather);

  const handleChange = () => {
      setIsCelsius(!isCelsius);
  }

  const city = useRef();

  const handleForm = event => {
    event.preventDefault();
    setTextInput(city.current.value.toLowerCase().trim());
  }

  return (
    <section className='weather'>
      <h1 className='weather_title'>Weather Application</h1>
      <form className='weather_form' onSubmit={handleForm}>
        <input className='textSeach' type="text" ref={city} placeholder='City Find' />
        <button className='form_btn'>Search</button>
      </form>
      {
        hasError ? 
        <>
          <h2>That City was NOT found</h2>
          <h3>Please, try agrain</h3>
        </>
        :
        <>
          <h2 className='weather_city'>{weather?.name}, {weather?.sys.country}</h2>
          <article className='weather_container' >
            <figure className='weather_fig'>
              <img 
                className='weather_img'
                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} 
                alt="weather icon" 
              />
            </figure>
            <div>
              <h3 className="weather_cloud">{weather?.weather[0].desription}</h3>
              <ul className="weather_info">
                <li><span>Wind speed:</span> <span>{weather?.wind.speed} m/s</span> </li>
                <li><span>Clouds:</span> <span>{weather?.clouds.all} %</span> </li>
                <li><span>Pressure:</span> <span>{weather?.main.pressure} hPa</span> </li>
                <li><span>Humidity:</span> <span>{weather?.main.humidity} %</span> </li>
              </ul>
            </div>
          </article>
          <div className='weather_container2'>
            <h3 className="weather_temp">{
              isCelsius ?
                temp?.celsius+' ªC'
              :
                temp?.fahrenheit+' ªF'
            }
            </h3>
            <button className="weather_btn" onClick={handleChange}>
              Change to {isCelsius?'ªF':'ªC'}
            </button>
          </div>
        </>
      }
      <h2>{weather?.name},  {weather?.sys.country} </h2>
      <article>
        <figure>
          <img src={'https://openweathermap.org/img/wn/$10d@2x.png'} alt="" />
        </figure>
      </article>
      <p className='footer'>Made by Kleine Hassler G.</p>
    </section>
  )
}

export default WeatherCard