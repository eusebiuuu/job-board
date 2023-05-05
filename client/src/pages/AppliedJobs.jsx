import styles from './AppliedJobs.module.css'
import JobCard from '../components/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import { getAppliedJobs } from '../redux/application/applicationSlice';

export default function AppliedJobs() {
  const dispatch = useDispatch();
  const { isLoading, jobs } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(getAppliedJobs());
    // eslint-disable-next-line
  }, []);

  return (<div className={styles.container}>
    {isLoading || !jobs
      ? <Loader />
      : <>{jobs.length === 0
        ? <div className={styles.flex}><h2>No jobs found...</h2></div>
        : <div>
          {jobs.map(job => {
            return <JobCard job={job} />
          })}
        </div>
      }</>
    }
  </div>)
}
