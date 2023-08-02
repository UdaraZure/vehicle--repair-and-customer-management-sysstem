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

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {offers.map((offer, index) => (
        <div className="card-container1" key={index}>
          <div className="card1">
            <div className="front-content1">
              <p>{offer.Title}</p>
            </div>
            <div className="content1">
              <p style={{fontSize:"20px"}}>{offer.Description}</p>
              <div className="valid-dates" style={{fontSize:"15px"}} >
                <div>Valid from: {formatDate(offer.FromDate)}</div>
                <div style={{ marginLeft: '10px' }}>Till: {formatDate(offer.TillDate)}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default OfferCard;
