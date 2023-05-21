import styles from './SingleJob.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid'
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import customFetch from '../lib/customFetch';
import { toast } from 'react-toastify';
import { useUserContext } from '../context/user';

export default function SingleJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { type, userID } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [job, setJob] = useState({});
  const [apply, setApply] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await customFetch.get(`/jobs/${id}`);
        setJob(response.data.job);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.msg);
      }
      if (type === 'candidate') {
        try {
          const response = await customFetch.get(`/applications/${id}`);
          const val = response.data.application ? false : true;
          setApply(val);
        } catch (err) {
          console.log(err);
          toast.error(err.response.data.msg);
        }
      }
      setIsLoading(false);
    })();
  }, []);

  async function handleApplyChange() {
    setApplyLoading(true);
    if (apply) {
      try {
        const response = await customFetch.post(`/applications/${id}`);
        toast.success(response.data.msg);
        setApply(false);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.msg);
      }
    } else {
      try {
        const response = await customFetch.delete(`/applications/${id}`);
        toast.success(response.data.msg);
        setApply(true);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.msg);
      }
    }
    setApplyLoading(false);
  }

  async function handleJobDelete() {
    setDeleteLoading(true);
    try {
      const response = await customFetch.delete(`/jobs/${id}`);
      toast.success(response.data.msg);
      setDeleteLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
      setDeleteLoading(false);
    }
    navigate('/jobs');
  }
  const ownedJobs = type === 'company' && userID === job?.companyID?._id;

  return (<div className={styles.container}>
    {isLoading
    ? <Loader />
    : <>
        <h2>Job details</h2>
        <div className={styles.flexBtns}>
          {type !== 'company'
            ? <>
              <button className={`${styles.btn1} ${apply ? '' : styles.hide}`} onClick={handleApplyChange}>
                {applyLoading
                  ? 'Loading...'
                  : 'Apply now'
                }
              </button>
              <button className={`${styles.btn1} ${!apply ? '' : styles.hide}`} onClick={handleApplyChange}>
                {applyLoading
                  ? 'Loading...'
                  : 'Cancel application'
                }
              </button>
            </>
            : null
          }
          <div>
            <button className={`${styles.btn2} ${ownedJobs ? '' : styles.hide}`}>
              <Link to={`/editJob/${id}`}>Edit job</Link>
            </button>
            <button className={`${styles.btn2} ${ownedJobs ? '' : styles.hide}`} onClick={handleJobDelete}>
              {deleteLoading ? 'Loading...' : 'Delete job'}
            </button>
            <button className={`${styles.btn2} ${ownedJobs ? '' : styles.hide}`}>
              <Link to={`/candidates/${job._id}`}>Candidates</Link>
            </button>
          </div>
        </div>
        <div className={styles.details}>
          <p>Posted at {job.createdAt}</p>
          <div className={styles.header}>
            <div>
              <h2>{job.title}</h2>
              <h3>{job.companyID.name}</h3>
            </div>
            <div className={styles.image}>
              <img src={job.companyID.logo} alt='Company logo' />
            </div>
          </div>
          <h2>Description</h2>
          <div>{job.description}</div>
          <h2>Requirements</h2>
          <br />
          <div>{job.requirements}</div>
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
            }
          </h2>
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
