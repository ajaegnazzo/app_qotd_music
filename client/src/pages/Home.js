// Home.js
import React, { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import SubmittedSongs from './SubmittedSongs'; // Import the new component
import { Link, useNavigate } from 'react-router-dom';

const CLIENT_ID = "af8678c5b22244a99d40b72f02519018";
const CLIENT_SECRET = "825f240bb7d9401fac1225ca7537b347";


function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [submittedSongs, setSubmittedSongs] = useState([]);
  const [showSubmittedSongs, setShowSubmittedSongs] = useState(false); // Track whether to show submitted songs

  const navigate = useNavigate();

  useEffect(() => {
    // API Access Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  async function search() {
    console.log("Search for " + searchInput);

    var trackParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var searchData = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track', trackParameters)
      .then(response => response.json());

    const tracks = searchData.tracks.items.map(item => ({
      id: item.id,
      name: item.name,
      artists: item.artists.map(artist => artist.name).join(', '),
      imageUrl: item.album.images.length > 0 ? item.album.images[0].url : null,
    }));

    setSearchResults(tracks);
  }

  function handleCardClick(track) {
    setSelectedTrack(track);
  }

  function handleSubmission(selectedTrack) {
    setSubmittedSongs(prevSongs => [...prevSongs, selectedTrack]);
    setSelectedTrack(null);
    setShowSubmittedSongs(true); // Show the submitted songs when a song is submitted
    navigate('/submitted-songs');
  }

  return (
    <div className="App">
      <Container>
         {/* Company Name and Text Blurb */}
         <div className='text-blurb'>
          <h1>Dulcet</h1>
          <p>Some blurb we have</p>
        </div>
        {/* Routing Links */}
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/submitted-songs">Submitted Songs</Link>
          </li>
        </ul>
      </nav>
        <div>
          <h2>What song are you looking for?</h2>
        </div>

        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search For Song"
            type="input"
            onKeyPress={event => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>
            Search
          </Button>
        </InputGroup>

        {selectedTrack && (
          <InputGroup className="mb-3" size="lg">
            <FormControl
              value={`${selectedTrack.name} - ${selectedTrack.artists}`}
              readOnly
            />
            <Button onClick={() => handleSubmission(selectedTrack)}>
              Submit
            </Button>
          </InputGroup>
        )}
      </Container>

      <Container>
        <Row className="mx-2 row row-cols-5">
          {searchResults.map(track => (
            <a key={track.id} href="#" onClick={() => handleCardClick(track)} className="custom-card col-lg-2 col-md-2 col-sm-2 col-2">
              <Card>
                {track.imageUrl && <Card.Img src={track.imageUrl} />}
                <Card.Body>
                  <Card.Title>{track.name}</Card.Title>
                  <Card.Text>{track.artists}</Card.Text>
                </Card.Body>
              </Card>
            </a>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;

