import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";


export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setID] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState([]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  useEffect(() => {
    // Fetch the user data from the server
    const fetchUsersData = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get("/Auth/allUsers");
=======
        const response = await axios.get("http://localhost:7185/api/Auth/allUsers");
>>>>>>> 9f2d8fd698c77e732b5e6a0e1803f9e67a90740c
        setUserData(response.data); // Save the fetched data in the state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsersData();
  }, []);

  // login
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setErrorMessage("Email and password are required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Invalid email format.");
    } else if (password.length < 4) {
      setErrorMessage("Password should be at least 4 characters long.");
    } else {
      const url = "http://localhost:7185/api/Auth/login";
      const data = {
        ID: id,
        Email: email,
        Password: password,
      };
      axios
        .post(url, data)
        .then((res) => {
          console.log(res.data);
          if (res.data.users === null) {
            message.error(res.data.message + " Please try again");
          } else {
            switch (res.data.users.accountType) {
              case 0:
                localStorage.setItem("id", res.data.users.id);
                localStorage.setItem("firstName", res.data.users.firstName);
                localStorage.setItem("lastName", res.data.users.lastName);
                localStorage.setItem("accountType", res.data.users.accountType);
                localStorage.setItem("birthday", res.data.users.birthday);
                localStorage.setItem("email", res.data.users.email);
                localStorage.setItem("address", res.data.users.address);
                localStorage.setItem("phone", res.data.users.phone);
                localStorage.setItem("departmentName", res.data.users.departmentName);
                localStorage.setItem("departmentId", res.data.users.departmentId);
                localStorage.setItem("imageData", res.data.users.imageData);
                localStorage.setItem("imageMimeType", res.data.users.imageMimeType);
                localStorage.setItem("token", res.data.token);

                navigate("/users/admin");
                message.success("Admin user Login successful");
                break;
              case 1: // Manager login
                localStorage.setItem("id", res.data.users.id);
                localStorage.setItem("firstName", res.data.users.firstName);
                localStorage.setItem("lastName", res.data.users.lastName);
                localStorage.setItem("accountType", res.data.users.accountType);
                localStorage.setItem("birthday", res.data.users.birthday);
                localStorage.setItem("email", res.data.users.email);
                localStorage.setItem("address", res.data.users.address);
                localStorage.setItem("phone", res.data.users.phone);
                localStorage.setItem("departmentName", res.data.users.departmentName);
                localStorage.setItem("departmentId", res.data.users.departmentId);
                localStorage.setItem("imageData", res.data.users.imageData);
                localStorage.setItem("imageMimeType", res.data.users.imageMimeType);
                navigate("/users/manager");
                message.success("Manager user Login successful");
                break;
              case 2: // Staff login
                localStorage.setItem("id", res.data.users.id);
                localStorage.setItem("firstName", res.data.users.firstName);
                localStorage.setItem("lastName", res.data.users.lastName);
                localStorage.setItem("accountType", res.data.users.accountType);
                localStorage.setItem("birthday", res.data.users.birthday);
                localStorage.setItem("email", res.data.users.email);
                localStorage.setItem("address", res.data.users.address);
                localStorage.setItem("phone", res.data.users.phone);
                localStorage.setItem("departmentName", res.data.users.departmentName);
                localStorage.setItem("departmentId", res.data.users.departmentId);
                localStorage.setItem("imageData", res.data.users.imageData);
                localStorage.setItem("imageMimeType", res.data.users.imageMimeType);
                navigate("/users/staff");
                message.success("Staff user Login successful");
                break;
              default:
                // Handle other account types if needed
                break;
            }
          }
        })
        .catch((error) => {
          console.error("error" + error);
          setErrorMessage("An error occurred during login.");
        });
    }
  };

  const handleRegisterClick = () => {
    // Perform any necessary actions here, then navigate to the desired page
    navigate("/register"); // Replace "/register" with the path of the registration page
  };

  return (
    <div className="box-form">
      <div className="left">
        <div className="overlay">
          <h1>BOFFO SYSTEM LABS</h1>
        </div>
      </div>
      <div className="right">
        <h4>LOGIN</h4>
        <p>Welcome to our LMS System </p>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <br />

          {errorMessage && <div className="error">{errorMessage}</div>}

          <br />
          <p>Forget password</p>
          {userData.length === 0 && (
            <a href="#" onClick={handleRegisterClick}>You can Register here...</a>
          )}
          <button>Login</button>
        </form>

        <br />
        <br />
        <div className="remember-me--forget-password"></div>
      </div>
    </div>
  );
};
