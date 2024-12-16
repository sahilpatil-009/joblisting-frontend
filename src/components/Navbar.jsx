import React, { useEffect, useState } from "react";
import styles from "./styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = ({setIslogin}) => {
  const navigate = useNavigate();
  const [userData, setuserData] = useState();

  const handleLogout = () =>{
    localStorage.removeItem("token");
    setuserData();
    alert("Logged out succesfully")
    setIslogin(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodeToken = jwtDecode(token);
        setuserData(decodeToken);
        setIslogin(true);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <div className={styles.main}>
      <h1>Jobfinder</h1>
      <div className={styles.actionBtns}>
        {userData ? (
          <>
            <button className={styles.login} onClick={handleLogout}>
              Logut
            </button>
            <p className={styles.UserName}>Hello! {userData.name}</p>
          </>
        ) : (
        <>
          <button className={styles.login} onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className={styles.register}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </>
         )}
      </div>
    </div>
  );
};

export default Navbar;
