import { useState } from 'react';
import moment from 'moment';

const Card = ({ date, minTemp, maxTemp, weatherIcon }) => {
  const [icon, setIcon] = useState();
  import(`../../images/${weatherIcon}.png`).then((module) => {
    setIcon(module.default);
  });
  return (
    <div className='card'>
      <p className='card__date'>{moment(date).format('ddd, D MMM')}</p>
      <img className='card__icon' src={icon} alt={`${weatherIcon}.png`} />
      <div className='card__temp'>
        <p className='temp__min'>{minTemp.toFixed(0)}&#8451;</p>
        <p className='temp__max'>{maxTemp.toFixed(0)}&#8451;</p>
      </div>
    </div>
  );
};

export default Card;
