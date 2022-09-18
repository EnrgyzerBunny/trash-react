import React from 'react';
import './App.css';
import { BrowserRouter} from "react-router-dom";
import RoutingTable from './RoutingTable';

function App() {
  //usePageTracking();
  return (
    <BrowserRouter>
      <RoutingTable />
    </BrowserRouter>
  );
}

export default App;
