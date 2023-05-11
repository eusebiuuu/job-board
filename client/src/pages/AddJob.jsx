import styles from './AddJob.module.css'
import { nanoid } from 'nanoid';
import Chips from '../components/Chips';
import { useDispatch, useSelector } from 'react-redux';
import { addJob, changeBenefits, changeCities, changeDescription, changeExperience, changeJobTypes, changeLocation, changeMinSalary, changeRequirements, changeTitle, clearFields, editJob, getSingleJob } from '../redux/job/jobSlice';
import { allJobTypes, allExperiences, allLocations } from '../utils/filters'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../components/Loader';

export default function AddJob() {
  const { id: jobID } = useParams();
  const jobCreation = !Boolean(jobID);
  const { title, jobTypes, location, cities, benefits, minSalary, experience, 
    requirements, description, isLoading } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (jobCreation) {
      dispatch(clearFields(false));
    } else {
      dispatch(clearFields(true));
      dispatch(getSingleJob(jobID));
    }
  }, []);

  async function submitJob(event) {
    event.preventDefault();
    if (jobCreation) {
      const resp = await dispatch(addJob());
      console.log(resp);
      navigate(`/jobs/${resp.payload.job._id}`);
    } else {
      await dispatch(editJob(jobID));
      navigate(`/jobs/${jobID}`);
    }
  }

  return (<>
  {isLoading
  ? <Loader />
  : <div className={styles.form}>
      <label className={styles.content}>
        <div><h3>Job title</h3></div>
        <div><input value={title} placeholder='Job title' 
          onChange={(e) => dispatch(changeTitle(e.target.value))} /></div>
      </label>
      <div className={styles.content}>
        <div><h3>Job type</h3></div>
        <div className={styles.list}>
          {allJobTypes.map((type, idx) => {
            const classNames = jobTypes.indexOf(type) === -1 ? styles.btn : styles.active;
            return <button key={nanoid()} type='button' id={`type${idx}`} className={classNames} 
              onClick={() => dispatch(changeJobTypes(type))}>{type}</button>
          })}
        </div>
      </div>
      <label className={styles.content}>
        <div><h3>Location</h3></div>
        <div className={styles.singleList}>
          <select value={location} data-testid='location' onChange={e => dispatch(changeLocation(e.target.value))}>
            {allLocations.map(loc => {
              return <option key={loc} value={loc}>{loc}</option>
            })}
          </select>
        </div>
      </label>
      <div className={styles.content}>
        <div><h3>Cities</h3></div>
        <Chips placeholder='City' withRedux onChange={changeCities} value={cities} />
      </div>
      <div className={styles.content}>
        <div><h3>Minimum salary ($)</h3></div>
        <div><input value={minSalary} type='number' step={100} placeholder='Min salary'
        onChange={e => dispatch(changeMinSalary(e.target.value))} /></div>
      </div>
      <div className={styles.content}>
        <div><h3>Experience</h3></div>
        <div className={styles.singleList}>
          <select value={experience} onChange={e => dispatch(changeExperience(e.target.value))}>
            {allExperiences.map(exp => {
              return <option key={exp} value={exp}>{exp}</option>
            })}
          </select>
        </div>
      </div>
      <div className={styles.content}>
        <div><h3>Benefits</h3></div>
        <div>
          <Chips placeholder='Benefit' withRedux onChange={changeBenefits} value={benefits} />
        </div>
      </div>
      <label>
        <h3>Requirements</h3>
        <hr />
        <textarea onChange={e => dispatch(changeRequirements(e.target.value))} value={requirements} rows={10} />
      </label>
      <label>
        <h3>Description</h3>
        <hr />
        <textarea onChange={e => dispatch(changeDescription(e.target.value))} value={description} rows={10} />
      </label>
      <div className={styles.specialBtn}>
        <button type='submit' onClick={submitJob}>
          {jobCreation ? 'Add job' : 'Edit job'}
        </button>
      </div>
    </div>
  }</>);
}
