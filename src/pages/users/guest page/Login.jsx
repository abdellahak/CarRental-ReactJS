import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import InfoAlert from "../../../components/context/InfoAlert";

export default function Login() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
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
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setAlertMessage(isEnglish ? "Please fill in all fields" : "يرجى ملء جميع الحقول");
      setAlertVisible(true);
      return;
    }
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
    setAlertMessage(isEnglish? "Invalid username or password" : "اسم المستخدم أو كلمة المرور غير صحيحة");
    setAlertVisible(true);
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  return (
    <>
      {alertVisible && (
        <InfoAlert     
          onClose={handleCloseAlert} 
          onConfirm={handleCloseAlert} 
          title={isEnglish? "Login Error" : "خطأ في تسجيل الدخول"}
          message={alertMessage} 
        />
      )}
      <LoginForm 
        handleSubmit={handleSubmit} 
        identifier={identifier} 
        setIdentifier={setIdentifier} 
        password={password} 
        setPassword={setPassword} 
      />
    </>
  );
}
