import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from './pages/Dashboard';
import UserPage from './pages/User';
import MerchantPage from './pages/Merchant';
import DriverPage from './pages/Driver';
import './App.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />}></Route>
          <Route path="/user" element={<UserPage />}></Route>
          <Route path="/merchant" element={<MerchantPage />}></Route>
          <Route path="/driver" element={<DriverPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
