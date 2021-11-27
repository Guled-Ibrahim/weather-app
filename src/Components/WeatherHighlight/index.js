const WeatherHighlight = ({ title, unit, measurement, children }) => {
  return (
    <div className='wh__card'>
      <p className='wh__title'> {title}</p>
      <p className='wh__unit'>
        {unit && unit.toFixed(0)}
        <span className='wh__measurement'>{measurement}</span>
      </p>
      {children}
    </div>
  );
};

export default WeatherHighlight;
