import React, { useState } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    $.post("http://localhost:3001/login", {
      email: user.email,
      password: user.password,
    })
      .done((res) => {
        console.log(res);
        localStorage.setItem("Mentor", res.data.id);
        return Navigate("/");
      })
      .fail((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
