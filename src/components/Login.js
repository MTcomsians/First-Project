import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css'; 

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      history.push("/");
      props.showAlert ? props.showAlert("Logged in Successfully", "success") : console.log("Logged in Successfully");
    } else {
      props.showAlert ? props.showAlert("Invalid Details", "danger") : console.log("Invalid Details");
    }
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='login-container mt-3'>
      {/* Separate container for heading */}
      <div className='login-heading-box'>
        <h2 className='login-heading'>Login to continue to INotebook</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onchange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onchange}
            name="password"
            id="password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;
