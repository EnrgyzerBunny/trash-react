import React from 'react';
import './App.css';
import { BrowserRouter, HashRouter } from "react-router-dom";
import RoutingTable from './RoutingTable';

function App() {
  
  return (
    <BrowserRouter>
      <RoutingTable />
    </BrowserRouter>
  );
}

export default App;
