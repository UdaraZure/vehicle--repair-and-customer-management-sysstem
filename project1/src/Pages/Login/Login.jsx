import React, { useState, useContext } from "react";
import axios from "axios";
import "./Login.css";
import loginIcon from "./login-icon.png";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../helpers/LoginContext";

export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { setLoginState } = useContext(LoginContext);
  const [loginStat, setLoginStat] = useState({
    Email: "",
    Role: "",
    UserID:"",
    status: false,
  });

  let navigate = useNavigate();

  const login = () => {
    const data = { Email: Email, Password: Password };

    axios
      .post("http://localhost:3001/User/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setLoginState({
            Email: response.data.Email,
            UserID: response.data.UserID,
            Role: response.data.UserRole,
            status: true,
          });
        }
      })
      .then((response) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          axios
            .get("http://localhost:3001/User/Authentication", {
              headers: {
                accessToken: accessToken,
              },
            })
            .then((response) => {
              console.log(response.data);
              if (response.data.error) {
                setLoginStat({ ...loginStat, status: false });
              } else {
                setLoginStat({
                  username: response.data.Email,
                  Role: response.data.UserRole,
                  status: true,
                });
              }

              if (response.data.Role === "Owner") {
                navigate("/OwnerDashboard");
              } else if (response.data.Role === "Manager") {
                navigate("/ManagerDashboard");
              } else if (response.data.Role === "Clark") {
                navigate("/ClarkDashboard");
              } else if (response.data.Role === "Customer") {
                navigate("/CustomerDashboard");
              } else {
                navigate("/Login");
              }
            });
        }
      })
      .catch((error) => {
        console.error("Error occurred", error);
      });
  };

  return (
    <>
      <div className="container-form">
        <div className="card-form">
          <div className="form-header1">
            <img src={loginIcon} alt="" />
            <p className="tittle-word">Log in</p>
          </div>
          <div className="inputBox">
            <input
              type="text"
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <span className="Email">Email</span>
          </div>

          <div className="inputBox">
            <input
              type="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
            <span>Password</span>
          </div>

          <button className="enter" onClick={login}>
            Enter
          </button>
        </div>
      </div>
    </>
  );
}
