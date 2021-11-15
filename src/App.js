import showerIcon from './images/Shower.png';
const App = () => {
  return (
    <div className='app__container'>
      <div className='search__container'>
        <div className='navbar'>
          <input
            type='text'
            placeholder='Enter location'
            className='navbar__input'
          />
          <button className='navbar__btn'>
            <i className='fas fa-map-marker-alt fa-lg'></i>
          </button>
        </div>
        <div className='weather__container'>
          <div className='weather__icon'>
            <img src={showerIcon} alt='shower.png' />
          </div>
          <div className='weather__temp'>
            <span className='temp__one'>1</span>
            <span className='temp__two'>
              5<span className='temp__symbol'>&#8451;</span>
            </span>
          </div>
          <div className='weather__info'>
            <h2 className='weather__text'>shower</h2>
          </div>
          <div className='weather__date'>
            <p className='weather__day'>today</p>
            <p className='weather__month'>fri, 5 jun</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
