import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const registersUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      alert(res.message);
    } catch (error) {
      console.log("sorry for api",error);
    }
  };
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 ">Register</h1>
        <form
          action=""
          className="max-w-md m-auto border"
          onSubmit={registersUser}
        >
          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="email"
            placeholder="@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?
            <Link className="pl-2 text-gray-600 underline" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
