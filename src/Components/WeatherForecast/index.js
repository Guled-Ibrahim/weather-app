import { useState } from 'react';
import moment, { max } from 'moment';

const Card = ({ date, minTemp, maxTemp, weatherIcon, toggleTemp }) => {
  const celciusToFarheint = (temp) => (temp * 9) / 5 + 32;

  return (
    <div className='card'>
      <p className='card__date'>{moment(date).format('ddd, D MMM')}</p>
      <img
        className='card__icon'
        src={`https://www.metaweather.com/static/img/weather/${weatherIcon}.svg`}
        alt={`${weatherIcon}.png`}
      />
      <div className='card__temp'>
        <p className='temp__min'>
          {toggleTemp
            ? minTemp.toFixed(0)
            : celciusToFarheint(minTemp).toFixed(0)}
          &#8451;
        </p>
        <p className='temp__max'>
          {toggleTemp
            ? maxTemp.toFixed(0)
            : celciusToFarheint(maxTemp).toFixed(0)}
          &#8451;
        </p>
      </div>
    </div>
  );
};

export default Card;
