import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RepairJobCard.css';
// import { useNavigate } from "react-router-dom";

export const RepairJobCard = ({ searchQuery ,value } ) => {
  const [repairJobs, setRepairJobs] = useState([]);

  // useEffect(() => {
  //  Reload();
  // }, []);

  // let navigate = useNavigate();	

  const Reload = () => {
    axios.get('http://localhost:3001/Job')
      .then((res) => {
        setRepairJobs(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Reload();
   }, [value]);
 

  // Function to filter repair jobs based on searchQuery
  const filteredRepairJobs = repairJobs.filter((repairJob) =>
    repairJob.JobID.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    filteredRepairJobs.map((repairJob, index) => (
      <div className="jobcard" 
      key={index}
      onClick={() => {
        // Open the repair job in a new page
        window.open(`/RepairJob/${repairJob.JobID}`, "_blank");
      }} >
        <div className="img"></div>
        <div className="textBox">
          <div className="textContent">
            <p className="h1">{repairJob.JobID}</p>
          </div>
          <p className="p">{repairJob.JobDescription}</p>
        </div>
      </div>
    ))
  );
};
