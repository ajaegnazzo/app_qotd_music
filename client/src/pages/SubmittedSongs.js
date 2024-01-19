import React from 'react';
import { Card } from 'react-bootstrap';

function SubmittedSongs({ submittedSongs }) {
  // Check if submittedSongs is not defined or is an empty array
  if (!submittedSongs || submittedSongs.length === 0) {
    return <div>No submitted songs yet.</div>;
  }

  return (
    <div>
      <h2>Submitted Songs</h2>
      <div className="row row-cols-5">
        {submittedSongs.map((track, index) => (
          <div key={index} className="custom-card col-lg-2 col-md-2 col-sm-2 col-2">
            <Card>
              {track.imageUrl && <Card.Img src={track.imageUrl} />}
              <Card.Body>
                <Card.Title>{track.name}</Card.Title>
                <Card.Text>{track.artists}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubmittedSongs;
