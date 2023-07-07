import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OfferCard() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/offers')
      .then((res) => {
        setOffers(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {offers.map((offer, index) => (
        <div className="card-container1" key={index}>
          <div className="card1">
            <div className="front-content1">
              <p>{offer.Title}</p>
            </div>
            <div className="content1">
              <p>{offer.Description}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default OfferCard;
