import './Hero.css';
import img from '../images/DSC01767-1800.jpg';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__img">
        <img src={img} alt="" width="900" height="450" />
      </div>
    </div>
  );
}
