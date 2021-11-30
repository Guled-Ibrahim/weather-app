import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
/* import moment from 'moment';
import Card from './Components/WeatherForecast';
import WeatherHighlightCard from './Components/WeatherHighlight'; */

const App = () => {
  const [loading, isLoading] = useState(true);
  const [city, setCity] = useState();
  const [weatherState, setWeatherState] = useState();
  const [temp, setTemp] = useState();
  const [weatherIcon, setWeatherIcon] = useState();
  const [weatherForecast, setWeatherForecast] = useState();
  const [toggleNavbar, isToggleNavbar] = useState(true);
  const [cityInput, setCityInput] = useState('');

  const getDataGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        axios
          .get(
            `https://www.metaweather.com/api/location/search/?lattlong=${position.coords.latitude},${position.coords.longitude}`
          )
          .then(({ data }) => {
            /* weather data for specific city */
            axios
              .get(`https://www.metaweather.com/api/location/${data[0].woeid}/`)
              .then(({ data }) => {
                setWeatherState(
                  data.consolidated_weather[0].weather_state_name
                );
                setTemp(data.consolidated_weather[0].the_temp);
                setWeatherForecast(data.consolidated_weather);
                import(
                  `./images/${data.consolidated_weather[0].weather_state_abbr}.png`
                ).then((module) => {
                  setWeatherIcon(module.default);
                });
              });
            setCity(data[0].title);
            isLoading(false);
          });
      },
      () => alert('please enable location')
    );
  };

  useEffect(() => {
    cityInput !== ''
      ? console.log('using searched location')
      : getDataGeolocation();
  }, [city]);

  return loading ? (
    <p>loading...</p>
  ) : (
    <div className='app__container'>
      {toggleNavbar ? (
        <div className='navbar'>
          <input
            type='text'
            placeholder='Enter location'
            className='navbar__input'
            onFocus={() => isToggleNavbar(!toggleNavbar)}
          />
          <button className='navbar__btn'>
            <i className='fas fa-map-marker-alt fa-lg'></i>
          </button>
        </div>
      ) : (
        <div className='dropdown' style={{ height: '100vh' }}>
          <div
            className='dropdown__close'
            onClick={() => isToggleNavbar(!toggleNavbar)}
          >
            <i className='fas fa-times fa-lg'></i>
          </div>
          <div className='dropdown__search'>
            <input
              type='text'
              placeholder='search location'
              className='dropdown__input'
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            />
            <button
              className='dropdown__btn'
              onClick={() => {
                isToggleNavbar(!toggleNavbar);
                setCity(cityInput);
              }}
            >
              search
            </button>
            <i className='fas fa-search search__icon'></i>
          </div>
          {/* previous search results */}
        </div>
      )}
      {/* cw stands for current weather */}
      <div className='cw__container'>
        <img
          src={weatherIcon}
          alt={`${weatherIcon}.png`}
          className='cw__icon'
        />
        <p className='cw__temp'>
          {temp?.toFixed(0)}
          <span className='temp__symbol'>&#8451;</span>
        </p>
        <p className='cw__state'>{weatherState}</p>
        <div className='cw__info'>
          <p className='cw__present'>{moment().calendar().split(' at')[0]}</p>
          <p className='cw__date'>{moment().format('ddd, D MMM')}</p>
        </div>
        <div className='cw__location'>
          <i className='fas fa-map-marker-alt fa-lg'>
            <span className='location__name'>{city}</span>
          </i>
        </div>
      </div>
    </div>
  );
};

export default App;
