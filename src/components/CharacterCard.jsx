import React from 'react';

export default function Card({ character }) {
  if (!character) {
    return <div>No character data available</div>;
  }

  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>Species: {character.species}</p>
      <p>Status: {character.status}</p>
    </div>
  );
}