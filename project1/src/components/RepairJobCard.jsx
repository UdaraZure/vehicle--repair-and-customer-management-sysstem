import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RepairJobCard.css';
// import { useNavigate } from "react-router-dom";


export const RepairJobCard = ({ searchQuery ,value,}) => {
  const [repairJobs, setRepairJobs] = useState([]);

  // useEffect(() => {
  //  Reload();
  // }, []);

  // let navigate = useNavigate();	

  const Reload = () => {
    // Retrieve the accessToken from Local Storage
    const accessToken = localStorage.getItem('accessToken');

    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));

    // Parse the accessToken to get the EmployeeID (UserID)
    const { UserID: employeeID } = decodedToken;

    // Make the API request with the correct EmployeeID
    axios.get(`http://localhost:3001/Job/getJobByEmployeeID/${employeeID}`)
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

  filteredRepairJobs.map ((value, key) => {
    console.log(value.QuotationID);
    localStorage.setItem("JobID", value.JobID);
  })

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

          <p>{repairJob.QuotationID}</p>
          
        </div>
      </div>
    ))
  );
};
