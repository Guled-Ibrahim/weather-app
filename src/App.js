import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
/* import cookie from 'js-cookie'; */
import ClipLoader from 'react-spinners/ClipLoader';
import Card from './Components/WeatherForecast';
import WeatherHighlightCard from './Components/WeatherHighlight';

const App = () => {
  const [loading, isLoading] = useState(true);
  const [city, setCity] = useState();
  const [weatherState, setWeatherState] = useState();
  const [temp, setTemp] = useState();
  const [weatherIcon, setWeatherIcon] = useState();
  const [weatherForecast, setWeatherForecast] = useState();
  const [toggleNavbar, isToggleNavbar] = useState(true);
  const [cityInput, setCityInput] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  /*  cookie.set('searchHistory', ['hello', 'world']); */
  /*   const [searchCookies, setSearchCookies] = useCookies([]); */

  const getDataGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        isLoading(true);
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
                setWeatherIcon(data.consolidated_weather[0].weather_state_abbr);
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
      ? axios
          .get(`https://www.metaweather.com/api/location/search/?query=${city}`)
          .then(({ data }) => {
            axios
              .get(`https://www.metaweather.com/api/location/${data[0].woeid}/`)
              .then(({ data }) => {
                setWeatherState(
                  data.consolidated_weather[0].weather_state_name
                );
                setTemp(data.consolidated_weather[0].the_temp);
                setWeatherForecast(data.consolidated_weather);
                setWeatherIcon(data.consolidated_weather[0].weather_state_abbr);
              });
          })
      : getDataGeolocation();
  }, [city]);

  return loading ? (
    <div className='loading'>
      <ClipLoader color={'#9ca3af'} loading={loading} size={150} />
    </div>
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
              onChange={(e) => setCityInput(e.target.value.toLowerCase())}
            />
            <button
              className='dropdown__btn'
              onClick={() => {
                setCity(cityInput);
                setSearchHistory((prev) => [cityInput, ...prev]);
                isToggleNavbar(!toggleNavbar);
              }}
            >
              search
            </button>
            <i className='fas fa-search search__icon'></i>
          </div>
          <ul className='dropdown__list'>
            {searchHistory.map((item) => {
              return (
                <li
                  className='dropdown__item'
                  key={item}
                  onClick={(e) => {
                    setCity(e.target.innerText);
                    isToggleNavbar(!toggleNavbar);
                  }}
                >
                  {item}
                  <span>
                    <i className='fas fa-chevron-right'></i>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {/* current weather section*/}
      <div className='cw__container'>
        <img
          src={`https://www.metaweather.com/static/img/weather/${weatherIcon}.svg`}
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
      {/* weather forecast section */}
      <div className='wf__container'>
        {/* weather forecast cards */}
        <div className='card__container'>
          {weatherForecast
            ?.slice(1)
            .map(
              ({
                id,
                applicable_date,
                min_temp,
                max_temp,
                weather_state_abbr,
              }) => {
                return (
                  <Card
                    key={id}
                    date={applicable_date}
                    minTemp={min_temp}
                    maxTemp={max_temp}
                    weatherIcon={weather_state_abbr}
                  />
                );
              }
            )}
        </div>
        {/* weather highlights section */}
        <p className='detail__text'>todays highlights</p>
        <div className='wh__container'>
          {weatherForecast
            ?.slice(0, 1)
            .map(
              ({
                wind_speed,
                wind_direction,
                wind_direction_compass,
                humidity,
                visibility,
                air_pressure,
              }) => {
                return (
                  <Fragment>
                    <WeatherHighlightCard
                      key={1001}
                      title={'wind status'}
                      unit={wind_speed}
                      measurement={'mph'}
                      children={
                        <p>
                          <i
                            className='fas fa-location-arrow fa-sm wh__icon'
                            style={{
                              transform: `rotate(${
                                wind_direction.toFixed(0) - 45
                              }deg)`,
                            }}
                          ></i>
                          <span>{wind_direction_compass}</span>
                        </p>
                      }
                    />
                    ;
                    <WeatherHighlightCard
                      key={1002}
                      title='humidity'
                      unit={humidity}
                      measurement='%'
                      children={
                        <div className='wh__progress'>
                          <div
                            className='progress__percentage'
                            style={{ width: `${humidity}%` }}
                          ></div>
                        </div>
                      }
                    />
                    ;
                    <WeatherHighlightCard
                      key={1003}
                      title='visibility'
                      unit={visibility}
                      measurement=' miles'
                    />
                    ;
                    <WeatherHighlightCard
                      key={1004}
                      title='air pressure'
                      unit={air_pressure}
                      measurement='mb'
                    />
                    ;
                  </Fragment>
                );
              }
            )}
        </div>
        {/* footer section */}
        <div className='footer'>
          <p className='footer__text'>
            Created by:{' '}
            <a href='https://github.com/gman112' className='footer__link'>
              Guled Ibrahim
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
