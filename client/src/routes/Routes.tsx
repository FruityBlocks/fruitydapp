import { Navigate, Route, Routes } from "react-router";
import Home from "./Home";
import MarketPlace from "./MarketPlace";
import Profile from "./Profile";
import Sell from "./Sell";
import ConnectWallet from "./ConnectWallet";
import { ProtectedRoute } from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/connect-wallet" element={<ConnectWallet />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buy"
        element={
          <ProtectedRoute>
            <MarketPlace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sell"
        element={
          <ProtectedRoute>
            <Sell />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
