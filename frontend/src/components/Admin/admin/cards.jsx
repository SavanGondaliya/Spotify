import React from 'react';

const cardsData = [
  { count: '1500', label: 'Users' },
  { count: '150', label: 'Artists' },
  { count: '150', label: 'Playlists' },
  { count: '1.5k', label: 'Songs' },
];

const Card = ({ count, label }) => {
  return (
    <div className="card">
      <h3>{count}</h3>
      <p>{label}</p>
    </div>
  );
};

const Cards = () => {
  return (
    <div className="cards">
      {cardsData.map((card, index) => (
        <Card key={index} count={card.count} label={card.label} />
      ))}
    </div>
  );
};

export default Cards;
