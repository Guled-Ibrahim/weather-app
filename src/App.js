import cloudBackground from './images/Cloud-background.png';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from './Components/Card';
import moment from 'moment';
const App = () => {
  const [city, setCity] = useState(null);
  const [weatherState, setWeatherState] = useState(null);
  const [temp, setTemp] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState();
  const [weatherForecast, setWeatherForecast] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const locationResponse = await axios.get(
          `https://www.metaweather.com/api/location/search/?lattlong=${position.coords.latitude},${position.coords.longitude}`
        );
        const woeIdResponse = await axios.get(
          `https://www.metaweather.com/api/location/${locationResponse.data[0].woeid}/`
        );
        setWeatherForecast(woeIdResponse.data['consolidated_weather']);
        setCity(woeIdResponse.data.title);
        setWeatherState(
          woeIdResponse.data['consolidated_weather'][0]['weather_state_name']
        );
        setTemp(
          woeIdResponse.data['consolidated_weather'][0][`the_temp`].toFixed(0)
        );
        import(
          `./images/${woeIdResponse.data['consolidated_weather'][0]['weather_state_abbr']}.png`
        ).then((module) => {
          setWeatherIcon(module.default);
        });
      });
    }, 1000);
  }, []);

  return (
    <div className='app__container'>
      <div className='search__container'>
        {/* navbar section */}
        <div className='navbar'>
          <input
            type='text'
            placeholder='Enter location'
            className='navbar__input'
          />
          <button className='navbar__btn'>
            <i className='fas fa-location-arrow fa-lg'></i>
          </button>
        </div>
        {/* weather section */}
        {city && (
          <div className='weather__container'>
            <div className='weather__icon'>
              <img src={cloudBackground} alt='' className='weather__bg' />
              <img src={weatherIcon} alt='icon.png' className='weather__img' />
            </div>
            <div className='weather__temp'>
              <p className='temp__text'>
                {temp ? temp : 0}
                <span className='temp__symbol'>&#8451;</span>
              </p>
            </div>
            <div className='weather__info'>
              <h2 className='weather__text'>{weatherState}</h2>
            </div>
            <div className='weather__present'>
              <p className='weather__day'>
                {
                  moment(weatherForecast.slice(0, 1)[0].applicable_date)
                    .calendar()
                    .split(' at')[0]
                }
              </p>
              <p className='weather__date'>
                {moment(weatherForecast.slice(0, 1).applicable_date).format(
                  'ddd,D MMM'
                )}
              </p>
            </div>
            <div className='weather__location'>
              <i className='fas fa-map-marker-alt fa-lg'>
                <span className='location__text'>{city}</span>
              </i>
            </div>
          </div>
        )}
        {/* weather forcast section */}
        {city && (
          <div className='forecast__container'>
            {weatherForecast
              .slice(1)
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
        )}
      </div>
    </div>
  );
};

export default App;
