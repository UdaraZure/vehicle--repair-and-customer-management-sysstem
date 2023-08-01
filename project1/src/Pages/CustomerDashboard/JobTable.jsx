// JobTable.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./JobTable.css";

function JobTable({ customerID , handleJobClick }) {
  const [jobData, setJobData] = useState([]);

  // Function to get user ID from access token
  const accessToken = localStorage.getItem("accessToken");
  const token = jwt_decode(accessToken);
  const userID = token.UserID;

  useEffect(() => {
    // Only fetch the jobs if the current user is a customer
    if (userID === customerID) {
      axios
        .get(`http://localhost:3001/Job?CustomerID=${userID}`)
        .then((response) => {
          // Filter the jobs that match the customerID with the accessToken's UserID
          const filteredJobs = response.data
            .filter((job) => job.CustomerID === customerID)
            .map((job) => ({
              ...job,
            }));

          // Fetch and update the QuotationStatus for each job
          const fetchQuotationStatus = async () => {
            for (const job of filteredJobs) {
              try {
                const quotationsResponse = await axios.get(`http://localhost:3001/Quotation?JobID=${job.JobID}`);
                const quotationStatus = quotationsResponse.data[0]?.QuotationStatus || "New";
                job.QuotationStatus = quotationStatus;
              } catch (error) {
                console.error("Error fetching quotation data:", error);
              }
            }
            setJobData([...filteredJobs]); // Update state with the modified array
          };

          fetchQuotationStatus();
        })
        .catch((error) => {
          console.error("Error fetching job data:", error);
        });
    }
  }, [userID, customerID]);

  return (
    <div className="job-table-container">
      <table className="job-table">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Description</th>
            <th>Customer ID</th>
            <th>Quotation Status</th>
          </tr>
        </thead>
        <tbody>
          {jobData.map((job) => (
          <tr key={job.JobID} onClick={() => handleJobClick(job)}>
          <td>{job.JobID}</td>
              <td>{job.JobDescription}</td>
              <td>{job.CustomerID}</td>
              <td>{job.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobTable;
