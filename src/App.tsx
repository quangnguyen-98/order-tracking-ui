import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from './containers/Dashboard';
import UserPage from './containers/User';
import MerchantPage from './containers/Merchant';
import DriverPage from './containers/Driver';
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
