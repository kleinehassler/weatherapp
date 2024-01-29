
import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import WeatherCard from './components/WeatherCard';
import randomIndex from './services/randomIndex'; 
import bgArray from './utils/fondos.json';

const ApiKey = "3683072a005959a9e3820791c76597a5";

function App() {
  const [ coords, setCoords ] = useState();
  const [ weather, setWeather ] = useState();
  const [ temp, setTemp ] = useState();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ textInput, setTextInput ] = useState('');
  const [ finder, setFinder ] = useState();
  const [ hasError, setHasError ]= useState(false);

  const success = position => {
    const geopos = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    }
    setCoords(geopos);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const bgImg = randomIndex(bgArray);
  const [bgApp, setBgApp] = useState(bgImg);
  
  const bgStyle = {
    backgroundImage: `url('../assets/photos/${bgApp}.jpg')`,
 }

    

  useEffect( () => {
    if(coords){
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${ApiKey}`;
      axios.get(url)
        .then(res => {
          const obj1 = {
            celsius: (res.data.main.temp - 273.15).toFixed(2),
            fahrenheit: ((res.data.main.temp - 273.15) * (9/5) + 32).toFixed(2),
          }
          setTemp(obj1);
          setHasError(false);
          setWeather(res.data);
        })
        .catch(err => {
          setHasError(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [coords]);

  useEffect(() => {
    if(textInput) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${textInput}&appid=${ApiKey}`;
      axios.get(url)
      .then(res =>{
        setFinder(res.data)

        const obj2 = {
          celsius: (res.data.main.temp - 273.15).toFixed(2),
          fahrenheit: ((res.data.main.temp - 273.15) * (9/5) + 32).toFixed(2),
        }
        setTemp(obj2);
        setHasError(false);
        setWeather(res.data);
      })
        .catch(err => {
          setHasError(true);
          console.log(err);
        })          
    }
  }, [textInput]);
  
  console.log(bgStyle);

  return (
  <div className='app' style={bgStyle}>
    {
      isLoading ?
        <div className="loading">
          <img src='../public/assets/background/loading.gif' alt="Cargando..." />
        </div>
        :
        textInput ?
          <WeatherCard 
            weather={finder}
            temp={temp}
            setTextInput={setTextInput}
            hasError={hasError}
          />
          :
          <WeatherCard
            weather={weather}
            temp={temp}
            setTextInput={setTextInput}
            hasError={hasError}
          />
    }
  </div>
  )
}

export default App
