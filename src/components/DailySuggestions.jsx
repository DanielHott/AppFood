import React from 'react';
import SuggestionCard from './SuggestionCard';
import '../css/explore.css';

function DailySuggestions() {
  const MAX_LENGTH_ARRAY = 12;
  return (
    <>
      <h1> sugestions here</h1>
      <div className="container-suggestion">
        {
          [...Array(MAX_LENGTH_ARRAY).keys()].map((index) => (
            <SuggestionCard key={ index } index={ index } />
          ))
        }
      </div>
    </>
  );
}

export default DailySuggestions;
