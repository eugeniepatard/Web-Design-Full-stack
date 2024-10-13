import './Categories.css';
import { NavLink } from 'react-router-dom';

export default function Categories() {
  return (
    <div className="categories">
      <div className="listcat">
        <h1 className="category-titre">Categories</h1>
        <NavLink to="/category/action" className="btn-categories">
          Action
        </NavLink>
        <NavLink to="/category/adventure" className="btn-categories">
          Adventure
        </NavLink>
        <NavLink to="/category/animation" className="btn-categories">
          Animation
        </NavLink>
        <NavLink to="/category/comedy" className="btn-categories">
          Comedy
        </NavLink>
        <NavLink to="/category/crime" className="btn-categories">
          Crime
        </NavLink>
        <NavLink to="/category/documentary" className="btn-categories">
          Documentary
        </NavLink>
        <NavLink to="/category/drama" className="btn-categories">
          Drama
        </NavLink>
        <NavLink to="/category/family" className="btn-categories">
          Family
        </NavLink>
        <NavLink to="/category/fantasy" className="btn-categories">
          Fantasy
        </NavLink>
        <NavLink to="/category/horror" className="btn-categories">
          Horror
        </NavLink>
        <NavLink to="/category/music" className="btn-categories">
          Music
        </NavLink>
        <NavLink to="/category/romance" className="btn-categories">
          Romance
        </NavLink>
        <NavLink to="/category/sf" className="btn-categories">
          SF
        </NavLink>
        <NavLink to="/category/thriller" className="btn-categories">
          Thriller
        </NavLink>
      </div>
    </div>
  );
}
