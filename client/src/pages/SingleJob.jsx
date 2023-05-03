import styles from './SingleJob.module.css'
import logo from '../assets/logo.svg'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux';
import { deleteJob, getSingleJob } from '../redux/job/jobSlice';
import Loader from '../components/Loader';
import { useEffect } from 'react';

export default function SingleJob(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { job, isLoading } = useSelector(state => state.job);

  useEffect(() => {
    dispatch(getSingleJob(id));
  }, []);

  async function handleJobDelete() {
    await dispatch(deleteJob(id));
    navigate('/jobs');
  }

  return (<div className={styles.container}>
    {isLoading || !job
    ? <Loader />
    : <>
        <h2>Job details</h2>
        <div className={styles.flexBtns}>
          <button className={styles.btn1}>Cancel application</button>
          <div>
            <button className={styles.btn2}>
              <Link to={`/editJob/${id}`}>Edit job</Link>
            </button>
            <button className={styles.btn2} onClick={handleJobDelete}>
              Delete job
            </button>
            <button className={styles.btn2}>
              <Link to={`/candidates/${job._id}`}>Candidates</Link>
            </button>
          </div>
        </div>
        <div className={styles.details}>
          <p>Posted at {job.createdAt}</p>
          <div className={styles.header}>
            <div>
              <h2>{job.title}</h2>
              <h3>Company</h3>
            </div>
            <div className={styles.image}>
              <img src={logo} alt='Company logo' />
            </div>
          </div>
          <h2>Description</h2>
          <p>{job.description}</p>
          <h2>Requirements</h2>
          <br />
          <div className={styles.req}>{job.requirements}</div>
          <ul className={styles.list}>
            <h2>Benefits</h2>
            {job.benefits.map(elem => {
              return <li key={nanoid()}>{elem}</li>
            })}
          </ul>
          <h2>Minimum salary: 
            {Number(job.minSalary)
            ? ` ${Number(job.minSalary)}$`
            : ' Unspecified'
          }</h2>
          <br />
          <ul className={styles.list}>
            <h2>Cities</h2>
            {job.cities.map(elem => {
              return <li key={nanoid()}>{elem}</li>
            })}
          </ul>
          <h2>Location: {job.location}</h2>
          <br />
          <h2>Experience: {job.experience}</h2>
          <br />
          <ul className={styles.list}>
            <h2>Job type</h2>
            {job.jobTypes.map(elem => {
              return <li key={nanoid()}>{elem}</li>
            })}
          </ul>
        </div>
      </>
    }
  </div>)
}
