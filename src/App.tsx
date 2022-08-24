import React from 'react';
import './App.css';
import { BrowserRouter, HashRouter } from "react-router-dom";
import RoutingTable from './RoutingTable';
import { usePageTracking } from './reportWebVitals';

function App() {
  //usePageTracking();
  return (
    <BrowserRouter>
      <RoutingTable />
    </BrowserRouter>
  );
}

export default App;
