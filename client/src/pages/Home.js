// Home.js

import React, { useState, useEffect } from 'react';
import { Container, Form, Button, FormControl, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'

const CLIENT_ID = "af8678c5b22244a99d40b72f02519018";
const CLIENT_SECRET = "825f240bb7d9401fac1225ca7537b347";

function Home(props) {
    const [accessToken, setAccessToken] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);


    const [submittedSongs, setSubmittedSongs] = useState([]);
    const [showSubmittedSongs, setShowSubmittedSongs] = useState(false);

    const navigate = useNavigate();

    const handleSubmission = () => {
        if (selectedTrack) {
            setSubmittedSongs((prevSongs) => [...prevSongs, selectedTrack]);
            setSelectedTrack(null);
            setShowSubmittedSongs(true)

            navigate('/submitted-songs', { state: { submittedSongs: [...submittedSongs, selectedTrack] } });
        }
    };

    useEffect(() => {
        if (showSubmittedSongs) {
            console.log('Submitted song:', submittedSongs)
            navigate('/submitted-songs');
        }
    }, [showSubmittedSongs, submittedSongs, navigate]);

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

    async function search(query) {
        console.log("Search for " + query);

        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        var trackParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        // Fetch suggestions based on the user's input
        var suggestionsData = await fetch('https://api.spotify.com/v1/search?q=' + query + '&type=track', trackParameters)
            .then(response => response.json());

        const suggestionTracks = suggestionsData.tracks.items.map(item => ({
            id: item.id,
            name: item.name,
            artists: item.artists.map(artist => artist.name).join(', '),
        }));

        setSuggestions(suggestionTracks);
    }

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setSearchInput(inputValue);

        // Trigger search function on each input change
        search(inputValue);
    };

    function handleSuggestionClick(track) {
        setSelectedTrack(track);
        setSearchInput(`${track.name} - ${track.artists}`);
        setSuggestions([]); // Clear suggestions when a suggestion is clicked
    }

    return (
        <div className="App">
            <Header />
            <Container className='content'>
                <div className='text-blurb'>
                    <p>Hi, we're Elias and Jae, and we're making tools to better our relationship with music.
                        This is our first idea, a facilitation of peer-to-peer music recommendation meant to combat
                        the algorithmically-driven, circular nature of music discovery today.<br /><br />

                        This is a web-based MVP, meant to test the interaction model behind the idea. Simply
                        answer the question we ask with the song of your choice. Once you answer, you can see what
                        others answered, and can like, save, and chat with them about it.
                    </p>
                </div>
                <div className='QOTD'>
                    <h2>What song are you looking for?</h2>
                    <Form.Group as={Col} controlId="formSearch">
                        <FormControl
                            placeholder="Search For Song"
                            type="input"
                            onChange={handleInputChange}
                            value={searchInput}
                            style={{
                                width: '90%', 
                                marginTop: '5px',
                                // Add any other styles you want to customize
                            }}
                        />

                        {/* Display auto-suggestions */}
                        {suggestions.length > 0 && (
                            <div className="autosuggest" style={{ maxHeight: '160px', overflowY: 'auto' }}>
                                {suggestions.map((track, index) => (
                                    <div 
                                        key={track.id} 
                                        onClick={() => handleSuggestionClick(track)}
                                        style={{
                                            cursor: 'pointer',
                                            padding: '4px',
                                            borderBottom: '1px solid #fff',
                                            background: '#C8D5BB'
                                        }}>
                                        {`${track.name} - ${track.artists}`}
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* Submit button */}
                        <Button 
                            onClick={handleSubmission} 
                            variant="primary"
                            style={{
                                width: '10%',
                                marginTop: '2px',
                            }}
                            >
                            Submit
                        </Button>
                    </Form.Group>
                </div>

            </Container>
        </div>
    );
}

export default Home;
