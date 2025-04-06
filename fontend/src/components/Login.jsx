import React, { useContext, useState } from "react";
import Header from "./Header";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setUser(res.data.user);
        alert(res.data.message);
        setRedirect(true);
        console.log(res.data);
      } else {
        alert("res", res.data.message);
      }
    } catch (error) {
      // alert("sorry for api", error);
      alert(error.response.data.message);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 ">Login</h1>
        <form
          action=""
          className="max-w-md m-auto border"
          onSubmit={handelLogin}
        >
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
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link className="pl-2 text-gray-600 underline" to="/register">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
