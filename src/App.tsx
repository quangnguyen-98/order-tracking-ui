import React, { Fragment } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from './pages/Dashboard';
import UserPage from './pages/User';
import MerchantPage from './pages/Merchant';
import DriverPage from './pages/Driver';
import './App.css';

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />}>
            {/* <Route index element={<Home />} /> */}

          </Route>
          <Route path="/user" element={<UserPage />}>
            {/* <Route path=":teamId" element={<Team />} /> */}
            {/* <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} /> */}
          </Route>
          <Route path="merchant" element={<MerchantPage />}>

          </Route>

          <Route path="driver" element={<DriverPage />}>

          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
