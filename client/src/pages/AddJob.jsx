import { useState } from 'react';
import styles from './AddJob.module.css'
import { nanoid } from 'nanoid';
import Chips from '../components/Chips';

const jobTypes = ['part-time', 'full-time', 'internship'];
const experiences = ['at least 2 years', 'no experience', 'at least 5 years'];
const locations = ['office', 'remote', 'hybrid'];

export default function AddJob(props) {
  const [title, setTitle] = useState('');
  const [jobType, setJobType] = useState([]);
  const [location, setLocation] = useState('');
  const [cities, setCities] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [requirements, setRequirements] = useState('');
  const [description, setDescription] = useState('');

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleJobTypeChange(val) {
    setJobType(prev => {
      if (prev.indexOf(val) === -1) {
        return [...prev, val];
      }
      return prev.map(elem => {
        if (elem === val) {
          return null;
        }
        return elem;
      })
    });
  }

  function handleLocationChange(event) {
    setLocation(event.target.value);
  }

  function handleSalaryChange(event) {
    setSalary(event.target.value);
  }

  function handleExperienceChange(event) {
    setExperience(event.target.value);
  }

  function handleRequirementsChange(event) {
    setRequirements(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    // reset values
  }

  return (<form className={styles.form} onSubmit={handleFormSubmit}>
    <label className={styles.content}>
      <div><h3>Job title</h3></div>
      <div><input value={title} placeholder='Job title' onChange={handleTitleChange} /></div>
    </label>
    <div className={styles.content}>
      <div><h3>Job type</h3></div>
      <div className={styles.list}>
        {jobTypes.map(type => {
          const classNames = jobType.indexOf(type) === -1 ? styles.btn : styles.active;
          return <button key={nanoid()} type='button' className={classNames} onClick={() => handleJobTypeChange(type)}>{type}</button>
        })}
      </div>
    </div>
    <label className={styles.content}>
      <div><h3>Location</h3></div>
      <div className={styles.singleList}>
        <select value={location} onChange={handleLocationChange}>
          {locations.map(loc => {
            return <option key={loc} value={loc}>{loc}</option>
          })}
        </select>
      </div>
    </label>
    <div className={styles.content}>
      <div><h3>Cities</h3></div>
        <Chips placeholder='City' onChange={setCities} value={cities} />
    </div>
    <div className={styles.content}>
      <div><h3>Minimum salary ($)</h3></div>
      <div><input value={salary} type='number' step={100} placeholder='Min salary' onChange={handleSalaryChange} /></div>
    </div>
    <div className={styles.content}>
      <div><h3>Experience</h3></div>
      <div className={styles.singleList}>
        <select value={experience} onChange={handleExperienceChange}>
          {experiences.map(exp => {
            return <option key={exp} value={exp}>{exp}</option>
          })}
        </select>
      </div>
    </div>
    <div className={styles.content}>
      <div><h3>Benefits</h3></div>
      <div>
        <Chips placeholder='Benefit' onChange={setBenefits} value={benefits} />
      </div>
    </div>
    <label>
      <h3>Requirements</h3>
      <hr />
      <textarea onChange={handleRequirementsChange} value={requirements} rows={10} />
    </label>
    <label>
      <h3>Description</h3>
      <hr />
      <textarea onChange={handleDescriptionChange} value={description} rows={10} />
    </label>
    <div className={styles.specialBtn}>
      <button onClick={handleFormSubmit} type='submit'>Post Job</button>
    </div>
  </form>)
}
