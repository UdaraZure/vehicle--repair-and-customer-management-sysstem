import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './ManagerDashboard.css';

function ManagerDashboard() {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Quotation');
        const filteredQuotations = response.data.filter(
          (quotation) => quotation.QuotationStatus === 'manager approval pending'
        );
        setQuotations(filteredQuotations);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuotations();
  }, []);

  const assignToMe = async (quotationId) => {
    try {
      await axios.put(`http://localhost:3001/Quotation/${quotationId}`, {
        assignedTo: 'current user',
      });
      setQuotations((prevQuotations) =>
        prevQuotations.filter((quotation) => quotation.QuotationID !== quotationId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb-3" fill>
      <Tab eventKey="New Repair Jobs" title="New Repair Jobs">
        <Table striped bordered hover className="repair-table">
          <thead>
            <tr>
              <th>Quotation ID</th>
              <th>Customer Name</th>
              
            </tr>
          </thead>
          <tbody>
            {quotations.map((quotation) => (
              <tr key={quotation.QuotationID}>
                <td>{quotation.QuotationID}</td>
                <td>{quotation.JobID}</td>
                <td>
                  <Button variant="primary" onClick={() => assignToMe(quotation.QuotationID)}>
                    Assign to Me
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Tab>
      <Tab eventKey="profile" title="Profile"></Tab>
      <Tab eventKey="longer-tab" title="Loooonger Tab">
        Tab content for Loooonger Tab
      </Tab>
    </Tabs>
  );
}

export default ManagerDashboard;