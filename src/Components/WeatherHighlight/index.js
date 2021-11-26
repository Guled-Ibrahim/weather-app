const WeatherHighlight = ({ children }) => {
  return (
    <div className='wh__card'>
      <p className='wh__card__title'>{children}</p>
      <p className='wh__card__text'>{children}</p>
      <p className=''></p>
    </div>
  );
};

export default WeatherHighlight;
