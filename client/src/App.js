// App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SubmittedSongs from './pages/SubmittedSongs';

export default function App() {
  const [submittedSongs, setSubmittedSongs] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={<Home submittedSongs={submittedSongs} setSubmittedSongs={setSubmittedSongs} />}
          />
          <Route
            path="/submitted-songs"
            element={<SubmittedSongs submittedSongs={submittedSongs} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}