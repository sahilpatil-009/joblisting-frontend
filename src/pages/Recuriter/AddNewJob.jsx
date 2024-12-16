import React, { useEffect, useState } from "react";
import styles from "/src/styles/newJob.module.css";
import addjobImg from "/src/assets/addJob.png";
import { useNavigate, useParams } from "react-router-dom";
import { AddnewJob } from "../../services/jobsApi";
import { getSpecificJob, updateJob } from "../../services/jobsApi";
const AddNewJob = () => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
    }
  }, [id]);

  const [jobData, setJobData] = useState({
    companyName: "",
    companyLogoUrl: "",
    jobPosition: "",
    salary: "",
    jobType: "",
    jobMode: "",
    jobLocation: "",
    jobDescription: "",
    aboutCompany: "",
    skills: "",
    addInfo: "",
  });

  useEffect(() => {
    if (isEdit && id) {
      const fetcJob = async () => {
        const res = await getSpecificJob(id);
        if (res.status === 200) {
          const data = await res.json();
          setJobData(data);
        } else {
          console.log(res);
        }
      };

      fetcJob();
    }
  }, [isEdit, id]);

  const navigate = useNavigate();
  const AddJobHandler = async (e) => {
    e.preventDefault();
    const res = isEdit ? await updateJob(id, jobData) : await AddnewJob(jobData)
    try {
      const data = await res.json();
      if (res.status === 200) {
        alert(data.message);
      }
      if (res.status === 400) {
        alert(data.message);
      }
      if (res.status === 401) {
        alert("Not Authorized", data.message);
      }
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
    console.log(jobData);
  };

  const CancleJobHandler = (e) => {
    e.preventDefault();
    alert("job Adding Cancle");
    navigate("/");
  };

  return (
    <div className={styles.main}>
      <div className={styles.job}>
        <form className={styles.formData}>
          <div className={styles.headtitle}>
            <h1>Add job description</h1>
          </div>
          <div className={styles.userInput}>
            <label htmlFor="">Company Name</label>
            <input
              type="text"
              placeholder="Enter your company name here"
              value={jobData.companyName}
              name="companyName"
              onChange={(e) =>
                setJobData({ ...jobData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className={styles.userInput}>
            <label htmlFor="">Add Logo Url</label>
            <input
              type="text"
              placeholder="Enter the link"
              value={jobData.companyLogoUrl}
              name="companyLogoUrl"
              onChange={(e) =>
                setJobData({ ...jobData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className={styles.userInput}>
            <label htmlFor="">Job position</label>
            <input
              type="text"
              placeholder="Enter job position"
              value={jobData.jobPosition}
              name="jobPosition"
              onChange={(e) =>
                setJobData({ ...jobData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className={styles.userInput}>
            <label htmlFor="">Monthly salary</label>
            <input
              type="number"
              placeholder="Enter Amount in rupees"
              value={jobData.salary}
              name="salary"
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0) {
                  setJobData({ ...jobData, [e.target.name]: value });
                }
              }}
            />
          </div>
          <div className={styles.userInput}>
            <label htmlFor="">Job Type</label>
            <div className={styles.optns}>
              <select
                value={jobData.jobType}
                name="jobType"
                onChange={(e) =>
                  setJobData({ ...jobData, [e.target.name]: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="full-time">full-time</option>
                <option value="part-time">part-time</option>
                <option value="contract">contract</option>
                <option value="internship">internship</option>
                <option value="freelance">freelance</option>
              </select>
            </div>
          </div>
          <div className={styles.userInput}>
            <label htmlFor="">Remote/ office</label>
            <div className={styles.optns}>
              <select
                value={jobData.jobMode}
                name="jobMode"
                onChange={(e) =>
                  setJobData({ ...jobData, [e.target.name]: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="remote">remote</option>
                <option value="office">office</option>
                <option value="hybrid">hybrid</option>
              </select>
            </div>
          </div>
          <div className={styles.userInput}>
            <label htmlFor="">Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              value={jobData.jobLocation}
              name="jobLocation"
              onChange={(e) =>
                setJobData({ ...jobData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className={styles.userInput}>
            <label htmlFor="">Job Description</label>
            <textarea
              type="text"
              rows="3"
              cols="40"
              placeholder="Type the job description"
              value={jobData.jobDescription}
              name="jobDescription"
              onChange={(e) =>
                setJobData({ ...jobData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className={styles.userInput}>
            <label htmlFor="">About Company</label>
            <textarea
              type="text"
              rows="3"
              cols="40"
              placeholder="Type about your company"
              name="aboutCompany"
              value={jobData.aboutCompany}
              onChange={(e) =>
                setJobData({ ...jobData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className={styles.userInput}>
            <label htmlFor="">Skills Required</label>
            <input
              type="text"
              placeholder="Enter the must have skills"
              name="skills"
              value={jobData.skills}
              onChange={(e) =>
                setJobData({ ...jobData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className={styles.userInput}>
            <label htmlFor="">Information</label>
            <input
              type="text"
              placeholder="Enter the additional information"
              name="addInfo"
              value={jobData.addInfo}
              onChange={(e) =>
                setJobData({ ...jobData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className={styles.userInputBtns}>
            {isEdit ? (
              <button onClick={AddJobHandler}>Update</button>
            ) : (
              <button onClick={AddJobHandler}>+ Add job</button>
            )}
            <button onClick={CancleJobHandler}>Cancle</button>
          </div>
        </form>
      </div>
      <div className={styles.cover}>
        <div className={styles.imageSection}>
          <h1>
            {isEdit
              ? "Recruiter Update job details here"
              : "Recruiter add job details here"}
          </h1>
          <img src={addjobImg} alt="cover image" />
        </div>
      </div>
    </div>
  );
};

export default AddNewJob;
