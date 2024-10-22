import React, { useState, useEffect } from 'react';
import Card from '../components/CharacterCard';
import '../CharacterPage.css'; 

//------------- constantes ------------------
export default function CharacterPage() {
  const [characters, setCharacters] = useState([]);
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [episodeInfo, setEpisodeInfo] = useState({name: '', air_date: ''});
  const [darkMode, setDarkMode] = useState(false);

  //-----------------funciones------------------

  useEffect(() => {
    if (episodeNumber) {
      fetchCharactersByEpisode(episodeNumber);
    }
  }, [episodeNumber]);

  const fetchCharactersByEpisode = async (episodeNum) => {
    setLoading(true);
    try {
      const episodeResponse = await fetch(`https://rickandmortyapi.com/api/episode/${episodeNum}`);
      const episodeData = await episodeResponse.json();
      setEpisodeInfo({name: episodeData.name, air_date: episodeData.air_date});
      const characterPromises = episodeData.characters.map(characterUrl => 
        fetch(characterUrl).then(res => res.json())
      );
      const charactersData = await Promise.all(characterPromises);
      setCharacters(charactersData);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setCharacters([]);
    }
    setLoading(false);
  };

   // Para el modo oscuro :3
   const toggleDarkMode = () => {
     setDarkMode(prevMode => !prevMode);
  };


 
//------------ Devuelve los componentes de la página ------------------
return (
  
  <div className={darkMode ? 'dark-mode' : 'light-mode'}>
    <h1>Rick and Morty Episode</h1>
    
    <button className= "dark-mode-toggle" onClick={toggleDarkMode}>
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
    <p><br /></p>
    {episodeInfo.name && (
      <div>
        <h2>Episode: {episodeInfo.name}</h2>
        <h2>Air Date: {episodeInfo.air_date}</h2>
      </div>
    )}

    <input 
      type="number" 
      placeholder="Enter episode number" 
      onChange={(e) => setEpisodeNumber(e.target.value)}
    />
    
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="character-list">
        {characters.map(character => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    )}
  </div>
);
}

 