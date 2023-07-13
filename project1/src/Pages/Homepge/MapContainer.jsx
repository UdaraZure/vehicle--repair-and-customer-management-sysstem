import React from 'react';

const MapEmbed = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.4231338990967!2d79.91826897464733!3d6.839767493158338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae251a215555fc5%3A0x62512bde48d466a8!2sDIAS%20Auto%20Engineers!5e0!3m2!1sen!2slk!4v1689229468280!5m2!1sen!2slk"
      width="400"
      height="250"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Map"
    ></iframe>
  );
};

export default MapEmbed;
