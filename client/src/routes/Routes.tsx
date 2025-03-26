import { Route, Routes } from "react-router";
import Home from "./Home";
import MarketPlace from "./MarketPlace";
import Profile from "./Profile";
import Sell from "./Sell";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/buy" element={<MarketPlace />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/sell" element={<Sell />} />
    </Routes>
  );
};

export default AppRoutes;
