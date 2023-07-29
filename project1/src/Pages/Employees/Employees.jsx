import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Employees.css";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [editID, setEditID] = useState(-1);
  const [editedValues, setEditedValues] = useState({
    EmpName: "",
    Description: "",
  });
  const [response, setResponse] = useState();

  const initialValues = {
    Role: "",
    EmpName: "",
    Address: "",
    TelNo: "",
    Email: "",
    NIC: "",
    Gender: "",
    BirthDay: "",
    StartDate: "",
    UserName: "",
    Password: "",
    ConfirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    Role: Yup.string().required("Must Enter the Role"),
    EmpName: Yup.string().min(5).max(50).required("Must Enter the name"),
    Address: Yup.string().max(100).required("Must Enter the address"),
    TelNo: Yup.string()
      .required("Must Enter the telephone number")
      .test("telNo", "Invalid Telephone number format", (value) => {
        // Custom validation function
        if (!value) {
          return false; // Fail validation if the value is empty
        }
        // Check if the TelNo starts with "07" and contains 8 other digits
        return /^07\d{8}$/.test(value);
      }),
    Email: Yup.string()
      .email("Invalid email format")
      .required("Must Enter the email"),
    NIC: Yup.string()
      .required("You must input your NIC")
      .test("nic-validation", "Invalid NIC format", (value) => {
        if (!value) {
          return false; // Fail validation if the value is empty
        }

        // Check if the NIC matches the format of 9 digits followed by 'V' or 'X'
        const nicPattern1 = /^[0-9]{9}[VX]$/;

        // Check if the NIC consists of 12 unique digits
        const nicPattern2 = /^\d{12}$/;

        return nicPattern1.test(value) || nicPattern2.test(value);
      }),
    Gender: Yup.string().required("You must input your gender"),
    BirthDay: Yup.date()
      .required("You must input your birthday")
      .test(
        "is-before-today",
        "Birthday should be a date before today",
        function (value) {
          return value < new Date();
        }
      ),
    StartDate: Yup.date().required("You must input your start date"),
    Password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must not exceed 50 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:3001/employees", values, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        const newValues = {
          ...values,
          UserID: response.data.EmployeeID,
          UserRole: values.Role,
        };
        console.log(newValues);
        axios.post("http://localhost:3001/User", newValues);
      })
      .then((response) => {
        setResponse(response.data);
        toast.success("Employee creaated successfully!");
        console.log("success");
        resetForm();
        // window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/employees")
      .then((response) => {
        const { data } = response;
        if (data && data.length > 0) {
          setEmployees(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, [response]);

  const handleEdit = (id) => {
    // Show confirmation popup
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this Employee?"
    );
    if (!confirmUpdate) {
      return;
    }
    setEditID(id);
  };

  const handleUpdate = (id, updatedEmployee) => {
    axios
      .put(`http://localhost:3001/employees/${id}`, updatedEmployee)
      .then((response) => {
        console.log("Employee updated successfully");
        setEditID(-1); // Reset the edit ID to exit edit mode
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.EmployeeID === id ? updatedEmployee : employee
          )
        );
      })
      .catch((error) => {
        console.log("Error updating Employee:", error);
      });
  };

  const handleInputChange = (e, fieldName, index) => {
    const { name, value } = e.target;
    const updatedEmployees = [...employees];
    updatedEmployees[index][fieldName] = value;

    // Check if the Status field is being changed
    if (fieldName === "Status" && value === "Resigned") {
      // Set the EndDate to today's date
      updatedEmployees[index].EndDate = formatDate(new Date()); // Use the formatDate function to get the formatted date
    }

    setEditedValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));

    setEmployees(updatedEmployees);
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return ""; // Return an empty string if the date is null
    }
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="EmployeeContainer">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="form-container">
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              Add Employees
            </p>

            <label className="label">Role:</label>
            <ErrorMessage name="Role" component="span" />
            <Field as="select" id="InputEmployee" name="Role" className="field">
              <option value="">Select Role</option>
              <option value="Clark">Clark</option>
              <option value="Manager">Manager</option>
              <option value="Owner">Owner</option>
            </Field>

            <label className="label">Employee Name:</label>
            <ErrorMessage name="EmpName" component="span" />
            <Field
              id="InputEmployee"
              name="EmpName"
              className="field"
              placeholder="Name..."
            />

            <label className="label">Address:</label>
            <ErrorMessage name="Address" component="span" />
            <Field
              id="InputEmployee"
              name="Address"
              className="field"
              placeholder="Address"
            />

            <label className="label">Telephone Number:</label>
            <ErrorMessage name="TelNo" component="span" />
            <Field
              id="InputEmployee"
              name="TelNo"
              className="field"
              placeholder="07********"
            />

            <label className="label">Email:</label>
            <ErrorMessage name="Email" component="span" />
            <Field
              id="InputEmployee"
              name="Email"
              className="field"
              placeholder="***@gmail.com"
            />

            <label className="label">NIC:</label>
            <ErrorMessage name="NIC" component="span" />
            <Field
              id="InputEmployee"
              name="NIC"
              className="field"
              placeholder="*********V/X"
            />

            <label className="label">Gender:</label>
            <ErrorMessage name="Gender" component="span" />
            <div className="field">
              <label>
                <Field
                  type="radio"
                  name="Gender"
                  value="Male"
                  className="radio-input"
                />
                Male
              </label>
              <label>
                <Field
                  type="radio"
                  name="Gender"
                  value="Female"
                  className="radio-input"
                />
                Female
              </label>
              <label>
                <Field
                  type="radio"
                  name="Gender"
                  value="Other"
                  className="radio-input"
                />
                Other
              </label>
            </div>

            <label className="label">Birth Day:</label>
            <ErrorMessage name="BirthDay" component="span" />
            <Field
              type="date"
              id="InputEmployee"
              name="BirthDay"
              className="field"
              placeholder=""
            />

            <label className="label">Start Date:</label>
            <ErrorMessage name="StartDate" component="span" />
            <Field
              type="date"
              id="InputEmployee"
              name="StartDate"
              className="field"
              placeholder=""
            />

            <label className="label">Password:</label>
            <ErrorMessage name="Password" component="span" />
            <Field
              id="InputEmployee"
              name="Password"
              type="password" // Set the type attribute to "password"
              className="field"
              placeholder=""
            />

            <label className="label">Confirm Password:</label>
            <ErrorMessage name="ConfirmPassword" component="span" />
            <Field
              id="InputEmployee"
              name="ConfirmPassword"
              type="password" // Set the type attribute to "password"
              className="field"
              placeholder=""
            />

            <button type="submit" className="submit-button">
              Submit
            </button>
            <ToastContainer position="top-center" autoClose={3000} />
          </Form>
        </Formik>
      </div>

      <div>
        <table className="employee-table">
          <thead>
            <tr>
              <th className="table-head">Employee ID</th>
              <th className="table-head">Role</th>
              <th className="table-head">Employee Name</th>
              <th className="table-head">Address</th>
              <th className="table-head">Telephone Number</th>
              <th className="table-head">NIC</th>
              <th className="table-head">End Date</th>
              <th className="table-head">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) =>
              employee.EmployeeID === editID ? (
                <tr key={employee.EmployeeID}>
                  <td>{employee.EmployeeID}</td>
                  <td>
                    <input
                      type="text"
                      value={employees[index].Role}
                      onChange={(e) => handleInputChange(e, "Role", index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={employees[index].EmpName}
                      onChange={(e) => handleInputChange(e, "EmpName", index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={employees[index].Address}
                      onChange={(e) => handleInputChange(e, "Address", index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={employees[index].TelNo}
                      onChange={(e) => handleInputChange(e, "TelNo", index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={employees[index].NIC}
                      onChange={(e) => handleInputChange(e, "NIC", index)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formatDate(employees[index].EndDate)}
                      onChange={(e) => handleInputChange(e, "EndDate", index)}
                    />
                  </td>

                  <td>
                    <select
                      value={employees[index].Status}
                      onChange={(e) => handleInputChange(e, "Status", index)}
                    >
                      <option value="Active">Active</option>
                      <option value="Resigned">Resigned</option>
                    </select>
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        handleUpdate(employee.id, employees[index])
                      }
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={employee.id}>
                  <td>{employee.EmployeeID}</td>
                  <td>{employee.Role}</td>
                  <td>{employee.EmpName}</td>
                  <td>{employee.Address}</td>
                  <td>{employee.TelNo}</td>
                  <td>{employee.NIC}</td>
                  <td>{formatDate(employee.EndDate)}</td>
                  <td>{employee.Status}</td>
                  <td>
                    <button onClick={() => handleEdit(employee.EmployeeID)}>
                      Edit
                    </button>
                    {/* <button onClick={() => handleDelete(employee.EmployeeID)}>Delete</button> */}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Employees;
