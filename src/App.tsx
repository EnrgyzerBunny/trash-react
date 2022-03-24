import React from 'react';
import './App.css';
import AuthExample from './pages/AuthExample';
import Homepage from './pages/Homepage';
import { BrowserRouter } from "react-router-dom";

function App() {
  
  return (
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
  );
}

export default App;
