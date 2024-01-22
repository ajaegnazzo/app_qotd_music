// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SubmittedSongs from './pages/SubmittedSongs';
import './App.css';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/submitted-songs" element={<SubmittedSongs />} />
          <Route path="/" element={<Navigate to="/home" />} /></Routes>
    </Router>
  );
};

export default App;
