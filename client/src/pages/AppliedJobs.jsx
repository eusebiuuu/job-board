import styles from './AppliedJobs.module.css'
import JobCard from '../components/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { getAppliedJobs } from '../redux/jobs/jobsSlice';
import Filters from '../components/Filters';
import { nanoid } from 'nanoid';

export default function AppliedJobs() {
  const dispatch = useDispatch();
  const { filteredJobs } = useSelector((state) => state.jobs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAppliedJobs());
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  return (<div className={styles.container}>
    <Filters />
    {loading || !filteredJobs
      ? <Loader />
      : <>{filteredJobs.length === 0
        ? <div className={styles.flex}><h2>No jobs found...</h2></div>
        : <div>
          {filteredJobs.map(job => {
            return <JobCard key={nanoid()} job={job} />
          })}
        </div>
      }</>
    }
  </div>)
}
