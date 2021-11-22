import { useState } from 'react';
import showerIcon from './images/Shower.png';
const App = () => {
  const [city, setCity] = useState('city');
  const [woeId, setwoeId] = useState(null);
  const [weatherState, setWeatherState] = useState(null);
  const [temp, setTemp] = useState(null);
  const [weatherIcon, setWeathericon] = useState(null);
  return (
    <div className='app__container'>
      <div className='search__container'>
        <div className='navbar'>
          <input
            type='text'
            placeholder='Enter location'
            className='navbar__input'
          />
          <button
            className='navbar__btn'
            onClick={() => {
              navigator.geolocation.getCurrentPosition((success) => {
                fetch(
                  `https://www.metaweather.com/api/location/search/?lattlong=${success.coords.latitude},${success.coords.longitude}`
                )
                  .then((res) => res.json())
                  .then((data) => {
                    setCity(data[0].title);
                    setwoeId(data[0].woeid);
                  });
                fetch(`https://www.metaweather.com/api/location/${woeId}/`)
                  .then((res) => res.json())
                  .then((data) => {
                    setWeatherState(
                      data['consolidated_weather'][0]['weather_state_name']
                    );
                    setTemp(
                      data['consolidated_weather'][0]['the_temp'].toFixed(0)
                    );
                  });
              });
            }}
          >
            <i className='fas fa-location-arrow fa-lg'></i>
          </button>
        </div>
        <div className='weather__container'>
          <div className='weather__icon'>
            <img src={showerIcon} alt='shower.png' />
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
            <p className='weather__day'>today</p>
            <p className='weather__date'>fri, 5 jun</p>
          </div>
          <div className='weather__location'>
            <i className='fas fa-map-marker-alt fa-lg'>
              <span className='location__text'>{city}</span>
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
