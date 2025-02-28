import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

export default function Login() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("users", users);
    const user = users.find(u => 
      (u.email === identifier || u.login === identifier) && u.password === password
    );
    if (user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      if (user.role === "admin") {
        navigate("/dashboard");
        return;
      } else {
        navigate("/");
        return;
      }
    }
    alert("Invalid credentials");
  };

  return (
    <LoginForm 
      handleSubmit={handleSubmit} 
      identifier={identifier} 
      setIdentifier={setIdentifier} 
      password={password} 
      setPassword={setPassword} 
    />
  );
}
