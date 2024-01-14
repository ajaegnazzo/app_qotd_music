import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CLIENT_ID = "af8678c5b22244a99d40b72f02519018";
const CLIENT_SECRET = "825f240bb7d9401fac1225ca7537b347";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  // Search
  async function search() {
    console.log("Search for " + searchInput);

    // Get request using search to get the Song ID
    var trackParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var searchData = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track', trackParameters)
      .then(response => response.json());

    // Extract relevant information from the response
    const tracks = searchData.tracks.items.map(item => ({
      id: item.id,
      name: item.name,
      artists: item.artists.map(artist => artist.name).join(', '),
      imageUrl: item.album.images.length > 0 ? item.album.images[0].url : null,
    }));

    // Update state with the search results
    setSearchResults(tracks);
  }

  return (
    <div className="App">
      <Container>
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
      </Container>
      <Container>
        <Row className="mx-2 row row-cols-4">
          {searchResults.map(track => (
            <Card key={track.id}>
              {track.imageUrl && <Card.Img src={track.imageUrl} />}
              <Card.Body>
                <Card.Title>{track.name}</Card.Title>
                <Card.Text>{track.artists}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
