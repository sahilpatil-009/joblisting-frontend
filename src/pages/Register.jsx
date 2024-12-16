import React, { useEffect, useState } from "react";
import styles from "../styles/register.module.css";
import loginImg from "../assets/login.png";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../services/userApi";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    newUserEmail: "",
    userMobile: "",
    newUserPassword: "",
    checkbox: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newError = {};
    if (!formData.userName.trim()) newError.userName = "Name is Required";
    if (!formData.newUserEmail.trim())
      newError.newUserEmail = "Email is Required";
    if (!formData.userMobile.trim()) newError.userMobile = "Mobile is Required";
    if (formData.userMobile.trim().length !== 10)
      newError.userMobile = "Invalid Mobile";
    if (!formData.newUserPassword.trim())
      newError.newUserPassword = "Password is Required";
    if (!formData.checkbox) newError.checkbox = "You must agree to the terms.";
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handelRegisterUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return console.log("fields required");
    }
    try {
      const formattedData = {
        name: formData.userName,
        email: formData.newUserEmail,
        mobile: formData.userMobile,
        password: formData.newUserPassword,
      };
      const res = await userRegister(formattedData);
      const data = await res.json();
      if(res.status === 200){
        console.log(data)
        alert("Register Succefully", data.message);
      }else{
        alert(data.message);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.login}>
        <form className={styles.formData}>
          <div className={styles.headtitle}>
            <h1>Create an account</h1>
            <p>Your personal job finder is here</p>
          </div>
          <div className={styles.userInput}>
            <input
              className={styles.inputFiled}
              type="text"
              placeholder="Name"
              name="userName"
              value={formData.userName}
              required
              onChange={handleChange}
            />
            <p
              style={{ visibility: errors.userName ? "visible" : "hidden" }}
              className={styles.worningMsg}
            >
              {errors.userName || "Field is Required"}
            </p>
            <input
              className={styles.inputFiled}
              type="email"
              placeholder="Email"
              name="newUserEmail"
              value={formData.newUserEmail}
              required
              onChange={handleChange}
            />
            <p
              style={{ visibility: errors.newUserEmail ? "visible" : "hidden" }}
              className={styles.worningMsg}
            >
              {errors.newUserEmail || "Field is Required"}
            </p>
            <input
              className={styles.inputFiled}
              type="mobile"
              placeholder="Mobile"
              name="userMobile"
              value={formData.userMobile}
              required
              onChange={handleChange}
            />
            <p
              style={{ visibility: errors.userMobile ? "visible" : "hidden" }}
              className={styles.worningMsg}
            >
              {errors.userMobile || "Field is Required"}
            </p>
            <input
              className={styles.inputFiled}
              type="password"
              placeholder="Password"
              name="newUserPassword"
              value={formData.newUserPassword}
              required
              onChange={handleChange}
            />
            <p
              style={{
                visibility: errors.newUserPassword ? "visible" : "hidden",
              }}
              className={styles.worningMsg}
            >
              {errors.newUserPassword || "Field is Required"}
            </p>
            <div className={styles.check}>
              <input
                type="checkbox"
                name="checkbox"
                value={formData.checkbox}
                onClick={handleChange}
              />
              <label htmlFor="">
                By creating an account, I agree to our terms of use and privacy
                policy
              </label>
            </div>
            <p
              style={{ visibility: errors.checkbox ? "visible" : "hidden" }}
              className={styles.worningMsg}
            >
              {errors.checkbox || "Check this box if you want to proceed"}
            </p>
          </div>
          <div className={styles.formBottom}>
            <button className={styles.submitBtn} onClick={handelRegisterUser}>
              Create Account
            </button>
            <p>
              Already have an account??{" "}
              <a onClick={() => navigate("/login")}>Sign In</a>{" "}
            </p>
          </div>
        </form>
      </div>
      <div className={styles.cover}>
        <div className={styles.imageSection}>
          <h1>Your Personal Job Finder</h1>
          <img src={loginImg} alt="cover image" />
        </div>
      </div>
    </div>
  );
};

export default Register;
