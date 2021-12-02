import { useState } from 'react';
import moment from 'moment';

const Card = ({ date, minTemp, maxTemp, weatherIcon }) => {
  return (
    <div className='card'>
      <p className='card__date'>{moment(date).format('ddd, D MMM')}</p>
      <img
        className='card__icon'
        src={`https://www.metaweather.com/static/img/weather/${weatherIcon}.svg`}
        alt={`${weatherIcon}.png`}
      />
      <div className='card__temp'>
        <p className='temp__min'>{minTemp.toFixed(0)}&#8451;</p>
        <p className='temp__max'>{maxTemp.toFixed(0)}&#8451;</p>
      </div>
    </div>
  );
};

export default Card;
