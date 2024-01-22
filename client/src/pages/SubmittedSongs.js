// SubmittedSongs.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function SubmittedSongs() {
  // Access the location state
  const location = useLocation();
  const { state } = location;

  // Check if state.submittedSongs exists
  const submittedSongs = state && state.submittedSongs ? state.submittedSongs : [];

  // Render the submitted songs
  return (
      <div>
          <h2>Submitted Songs</h2>
          <ul>
              {submittedSongs.map((song, index) => (
                  <li key={index}>{`${song.name} - ${song.artists}`}</li>
              ))}
          </ul>
      </div>
  );
}

export default SubmittedSongs;
