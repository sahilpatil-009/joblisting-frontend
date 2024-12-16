import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSpecificJob } from "../services/jobsApi";
import styles from "../components/styles/viewDetails.module.css";
import { PiMoneyFill } from "react-icons/pi";
import { FaCalendarDay } from "react-icons/fa";

const ViewDetails = ({isLogin}) => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDetails = async () => {
    try {
      const res = await getSpecificJob(id);
      if (res.status === 200) {
        const data = await res.json();
        setJob(data);
        setLoading(false);
      }
      if (res.status === 404) {
        alert(res.message);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching data
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.headLine}>
          <h1>
            {job.jobPosition} work from {job.jobMode} {job.jobType} at{" "}
            {job.companyName}
          </h1>
        </div>
        <div className={styles.jobDetail}>
          <div className={styles.detailhead}>
            <p>1w ago</p>
            <p>{job.jobType}</p>
            <div className={styles.logo}>
              <img src={job?.companyLogoUrl} alt={job.companyName} />
            </div>
          </div>
          <div className={styles.jobTitle}>
            <h1>{job.jobPosition}</h1>
            { isLogin && (<button onClick={()=> navigate(`/editjob/${id}`)}>Edit Job</button>)}
          </div>
          <p className={styles.Location}>{job.jobLocation}</p>
          <div className={styles.stipendDtal}>
            <div>
              <p>
                <PiMoneyFill size={20} /> Stipend
              </p>
              <p>Rs 25000/month</p>
            </div>
            <div>
              <p>
                {" "}
                <FaCalendarDay /> Duration
              </p>
              <p>6 months</p>
            </div>
          </div>
          <div className={styles.AboutCompany}>
            <h3>About company</h3>
            <p>{job.aboutCompany}</p>
          </div>
          <div className={styles.AboutCompany}>
            <h3>About the job/internship</h3>
            <p>{job.jobDescription}</p>
          </div>
          <div className={styles.AboutCompany}>
            <h3>Skill(s) required</h3>
            <div className={styles.skillBox}>
              {job.skills.map((skill, index) => (
                <p key={index}>{skill}</p>
              ))}
            </div>
            <div className={styles.AboutCompany}>
              <h3>Additional Information</h3>
              <p>{job.addInfo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
