import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "../styles/dashboard.module.css";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Skill from "../components/Skill";
import JobCard from "../components/JobCard";
import { deleteJob, getJobs } from "../services/jobsApi";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const Dashboard = ({ isLogin }) => {
  const [allJobs, setAlljobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [userId, serUserId] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const abortControllerRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill && !skills.includes(selectedSkill)) {
      setSkills((prevSkills) => [...prevSkills, selectedSkill]);
    }
  };

  const handleSkills = (value) => {
    setSkills((prevSkills) => prevSkills.filter((item) => item != value));
  };

  const getAllJobs = useCallback(async () => {
    // cancle any onging request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // create new AbortController
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    try {
      const skillsParam = skills.length ? skills.join(",") : "";
      const res = await getJobs({
        limit,
        offset: offset * limit,
        jobPosition: search || "",
        skills: skillsParam,
        signal,
      });
      if (res.status === 200) {
        const data = await res.json();
        setAlljobs(data.jobs);
        setCount(data.count);
      } else {
        console.error("Fail to fetch jobs", res);
      }
    } catch (error) {
      // Handle abort or other errors
      if (error.name === "AbortError") {
        console.log("Request was cancelled");
      } else {
        console.error("Error fetching jobs", error);
      }
    }
  }, [limit, offset, search, skills]);

  const debouncedFetchJobs = useCallback(() => {
    // clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    // set a new timer
    debounceTimerRef.current = setTimeout(() => {
      getAllJobs();
    }, 1000);
  }, [getAllJobs]);

  // Effect to trigger debouned fetch
  useEffect(() => {
    debouncedFetchJobs();
    // cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [limit, offset, search, skills, debouncedFetchJobs]);

  const handelDeleteJob = async (id) => {
    const res = await deleteJob(id);
    try {
      if (res.status === 200) {
        const data = await res.json();
        console.log(data.message);
        getAllJobs();
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearFilter = () => {
    setSearch("");
    setSkills([]);
    setLimit(10);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodeToken = jwtDecode(token);
        serUserId(decodeToken.id);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.ControlBox}>
        <div className={styles.search}>
          <HiOutlineMagnifyingGlass size={25} style={{ color: "#9C9C9C" }} />
          <input
            type="text"
            placeholder="Type Any Job Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.filter}>
          <select className={styles.skillsOptns} onChange={handleSkillChange}>
            <option value="">Skills</option>
            <option value="JavaScript">JavaSCript</option>
            <option value="HTML5">HTML5</option>
            <option value="CSS3">CSS3</option>
            <option value="React.js">React.js</option>
            <option value="Node.js">Node.js</option>
            <option value="Express.js">Express.js</option>
            <option value="SQL">SQL</option>
          </select>
          <div className={styles.skillDisplay}>
            {skills &&
              skills.map((skill, index) => (
                <Skill key={index} skill={skill} handleSkills={handleSkills} />
              ))}
          </div>
          <div className={styles.actionBtn}>
            {isLogin ? (
              <button
                className={styles.Applybtn}
                onClick={() => navigate("/newjob")}
              >
                +Add Job
              </button>
            ) : (
              <button className={styles.Applybtn}>Apply Filter</button>
            )}
            <button className={styles.ClearBtn} onClick={handleClearFilter}>
              Clear
            </button>
          </div>
        </div>
      </div>
      {allJobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          userId={userId}
          isLogin={isLogin}
          handelDeleteJob={handelDeleteJob}
        />
      ))}
      <div className={styles.paging}>
        <button
          disabled={offset === 0}
          onClick={() => setOffset((offset) => offset - 1)}
          className={styles.Applybtn}
        >
          <FaArrowAltCircleLeft size={20}/>
          Prev
        </button>
        <select value={limit} className={styles.skillsOptns} onChange={(e) => setLimit(e.target.value)}>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
        </select>
        <button
          disabled={offset * limit + limit >= count}
          onClick={() => setOffset((offset) => offset + 1)}
          className={styles.Applybtn}
        >
          Next
          <FaArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
