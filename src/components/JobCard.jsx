import React from "react";
import styles from "./styles/jobcard.module.css";
import { HiUsers } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

const JobCard = ({ job, userId, isLogin, handelDeleteJob }) => {
  const navigate = useNavigate();
  const handleViewDetails = async (id) => {
    navigate(`/job/${id}`);
  };

  return (
    <div className={styles.jobCard}>
      <div className={styles.Cardetails}>
        <div className={styles.logo}>
          <img src={job?.companyLogoUrl} alt={job.companyName} />
        </div>
        <div className={styles.details}>
          <h2 className={styles.Jobrole}>{job.jobPosition}</h2>
          <div className={styles.compDetails}>
            <p>
              <HiUsers size={15} /> 11-50
            </p>
            <p>₹ {job.salary}</p>
            <p> <FaLocationDot /> {job.jobLocation}</p>
          </div>
          <div className={styles.jobDetails}>
            <p>{job.jobMode}</p>
            <p>{job.jobType}</p>
          </div>
        </div>
      </div>
      <div className={styles.displaySkills}>
        <div className={styles.Allskills}>
          {job.skills.slice(0, 4).map((skill, index) => (
            <p key={index}>{skill}</p>
          ))}
        </div>
        <div className={styles.collectBtns}>
        <button
          className={styles.viewDtalBtn}
          onClick={() => handleViewDetails(job._id)}
        >
          View Details
        </button>
        {isLogin && userId === job.user && (
          <>
            <button
              className={styles.editButton}
              onClick={() => navigate(`/editjob/${job._id}`)}
            >
              Edit Job
            </button>
            <button
              className={styles.editButton}
              onClick={() => handelDeleteJob(job._id)}
            >
              Delete Job
            </button>
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
