// SubmittedSongs.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header'
import './SubmittedSongs.css'

function SubmittedSongs() {
  // Access the location state
  const location = useLocation();
  const { state } = location;

  // Check if state.submittedSongs exists
  const submittedSongs = state && state.submittedSongs ? state.submittedSongs : [];

  console.log('Submitted Songs Page:', submittedSongs);

  // Render the submitted songs
  return (
      <div>
        <Header />
          <h2 className = 'title'>Submitted Songs</h2>
          <ul className = 'list'>
              {submittedSongs.map((song, index) => (
                  <li key={index}>{`${song.name} - ${song.artists}`}</li>
              ))}
          </ul>
      </div>
  );
}

export default SubmittedSongs;
