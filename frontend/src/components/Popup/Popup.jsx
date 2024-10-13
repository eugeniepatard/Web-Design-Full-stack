import './Popup.css';
import Descritpion from '../MovieDesc/MovieDesc';

export default function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          x
        </button>
        <Descritpion movie_id={props.movie_id} />
      </div>
    </div>
  ) : (
    ''
  );
}
