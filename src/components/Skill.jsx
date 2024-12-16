import React from 'react'
import { IoMdClose } from "react-icons/io";
import styles from "./styles/skill.module.css"
const Skill = ({skill, handleSkills}) => {
  return (
    <div className={styles.skill}>
        <p>{skill}</p>
        <button onClick={()=>handleSkills(skill)}><IoMdClose /></button>
    </div>
  )
}

export default Skill