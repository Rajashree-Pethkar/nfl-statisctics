import { Route, Routes, Link } from "react-router-dom";
import Home from "../views/Home";
import Week from "../views/Week";
import MatchDetails from "../views/MatchDetails";
import GameOddsLineMovement from "../views/OddsMovement";

function Navbar() {
  return (
    <div>
      <ul className="nav border-bottom">
        <li className="nav-item">
          <Link to="/" className="nav-link active text-white">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/week" className="nav-link text-white">
            Weekly View
          </Link>
        </li>
      </ul>
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
