import icon from '../../images/c.png';
const Card = () => {
  return (
    <div className='card'>
      <p className='card__date'>Tomorrow</p>
      <img src={icon} alt='c.png' className='card__icon' />
      <div className='card__temp'>
        <p className='temp__min'>5&#8451;</p>
        <p className='temp__max'>17&#8451;</p>
      </div>
    </div>
  );
};

export default Card;
