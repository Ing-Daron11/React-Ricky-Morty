import React from 'react';

export default function EpisodeInput({ onEpisodeChange }) {
  return (
    <div>
      <input 
        type="number" 
        placeholder="Enter episode number" 
        onChange={(e) => onEpisodeChange(e.target.value)}
      />
    </div>
  );
}