import axios from 'axios';
import React, { useState,useEffect } from 'react';

const Card = ({ count, label }) => {
    return (
    <div className="card">
      <h3>{count}</h3>
      <p>{label}</p>
    </div>
  );
};

const Cards = () => {
  
    const [cardsData , setCardsData] = useState();
    
    useEffect(() => {

      console.log("called..");
      
      axios.get(`http://localhost:5000/projectpartner`,{
          headers:{
            "Content-Type":"application/json"
          }
        }).then((res) => {
          if(res.status === 200){
            setCardsData(res.data);
          }
        }).catch((error) => {
          console.log(error);
        })
      }, []); 
      
      return (
        <div className="cards">
        {cardsData?.map((card, index) => (
          <Card key={index} count={Object.keys(card)} label={Object.values(card)} />
        ))}
    </div>
  )
};

export default Cards;