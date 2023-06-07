import { Route, Routes } from 'react-router-dom';

// import views
import Home from '../views/Home';
import Week from '../views/Week';
import MatchDetails from '../views/MatchDetails';
import GameOddsLineMovement from '../views/OddsMovement';

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link text-white" href="/">
                Home
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link text-white" href="/week">
                Weekly View
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home title="placethebet.net" />} />
        <Route path="/week" element={<Week />} />
        <Route path="/matchdetails" element={<MatchDetails />} />
        <Route path="/oddsmovement" element={<GameOddsLineMovement />} />
      </Routes>
    </div>
  );
}

export default Navbar;
