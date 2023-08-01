import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./ManagerDashboard.css";
import jwtDecode from "jwt-decode";
import QuotationModal from "../../components/QuotationModal";

function ManagerDashboard() {
  const [quotations, setQuotations] = useState([]);
  const [asignedQuotations, setAsignedQuotations] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [rejectedQuotations, setRejectedQuotations] = useState([]);


  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Quotation");
        const filteredQuotations = response.data.filter(
          (quotation) => quotation.QuotationStatus === "Quotation Created"
        );
        setQuotations(filteredQuotations);
  
        const accessToken = localStorage.getItem("accessToken");
        const decodedToken = jwtDecode(accessToken);
        const userID = decodedToken.UserID;
  
        const filteredAssignedQuotations = response.data.filter(
          (quotation) =>
            (quotation.QuotationStatus === "Manager Assigned" ||
      quotation.QuotationStatus === "Returned To Manager") &&
            quotation.ManagerID === userID
        );
        setAsignedQuotations(filteredAssignedQuotations);
  
        const filteredRejectedQuotations = response.data.filter(
          (quotation) => quotation.QuotationStatus === "Manager Rejected Once" && 
          quotation.ManagerID === userID
        );
        setRejectedQuotations(filteredRejectedQuotations);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchQuotations();
  }, []);
  

  // Function to handle the "Assign to Me" button click
  const handleAssignToMe = async (quotationID) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const decodedToken = jwtDecode(accessToken);
      const userID = decodedToken.UserID;

      const response = await axios.put(
        `http://localhost:3001/Quotation/${quotationID}`,
        {
          QuotationStatus: "Manager Assigned",
          ManagerID: userID,
        }
      );

      await axios.put(
        `http://localhost:3001/Job/updateJobStatus/${quotationID}`,
        {
          Status: "Manager Assigned",
        }
      );

      // Update the quotations state after successful update
      setQuotations(
        (prevQuotations) =>
          prevQuotations.map((quotation) =>
            quotation.QuotationID === quotationID
              ? { ...quotation, QuotationStatus: "Manager Assigned" }
              : quotation
          )

        // setAsignedQuotations((prevQuotations) =>
        //   prevQuotations.map((quotation) =>
        //     quotation.QuotationID === quotationID
        //       ? { ...quotation, Status: "Manager Assigned" }
        //       : quotation
        //   )
        // )
      );

      console.log("Quotation updated successfully:", response.data);
    } catch (error) {
      console.log("Error updating quotation:", error);
    }
  };

  return (
    <>
      <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="New Repair Jobs" title="New Repair Jobs">
          <Table striped bordered hover className="repair-table">
            <thead>
              <tr>
                <th>Quotation ID</th>
                <th>Job ID</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((quotation) => (
                <tr key={quotation.QuotationID}>
                  <td>{quotation.QuotationID}</td>
                  <td>{quotation.JobID}</td>
                  <td>{quotation.JobDescription}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleAssignToMe(quotation.QuotationID)}
                    >
                      Assign to Me
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="profile" title="My Repair Jobs">
          <Table striped bordered hover className="repair-table">
            <thead>
              <tr>
                <th>Quotation ID</th>
                <th>Job ID </th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {asignedQuotations.map((quotation) => (
                <tr
                  key={quotation.QuotationID}
                  onClick={() => setSelectedQuotation(quotation)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{quotation.QuotationID}</td>
                  <td>{quotation.JobID}</td>
                  <td>{quotation.JobDescription}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        
        {/* <Table striped bordered hover className="repair-table">
    <thead>
      <tr>
        <th>Quotation ID</th>
        <th>Job ID</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {rejectedQuotations.map((quotation) => (
        <tr
          key={quotation.QuotationID}
          onClick={() => setSelectedQuotation(quotation)}
          style={{ cursor: "pointer" }}
        >
          <td>{quotation.QuotationID}</td>
          <td>{quotation.JobID}</td>
          <td>{quotation.JobDescription}</td>
        </tr>
      ))}
    </tbody>
  </Table>         */}
  
 
      </Tabs>
      {selectedQuotation && (
        <QuotationModal
          quotation={selectedQuotation}
          onClose={() => setSelectedQuotation(null)}
        />
      )}
    </>
  );
}

export default ManagerDashboard;
