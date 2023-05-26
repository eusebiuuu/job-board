import styles from './AppliedJobs.module.css'
import JobCard from '../components/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { changeState, getAppliedJobs } from '../redux/jobs/jobsSlice';
import Filters from '../components/Filters';
import { nanoid } from 'nanoid';
import getPaginatedJobs from '../utils/pagination';

export default function AppliedJobs() {
  const dispatch = useDispatch();
  const { filteredJobs, page } = useSelector((state) => state.jobs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAppliedJobs());
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  function handleScroll() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight < scrollHeight - 10) {
      return;
    }
    const maxPages = !filteredJobs ? page : Math.ceil(filteredJobs.length / 10);
    // console.log(maxPages, filteredJobs);
    dispatch(changeState({ name: 'page', value: Math.min(page + 1, maxPages) }));
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line 
  }, [page, filteredJobs]);

  return (<div className={styles.container}>
    <Filters />
    {loading || !filteredJobs
      ? <Loader />
      : <>{filteredJobs.length === 0
        ? <div className={styles.flex}><h2>No jobs found...</h2></div>
        : <div>
          {getPaginatedJobs(null, page, filteredJobs).map(job => {
            return <JobCard key={nanoid()} job={job} />
          })}
        </div>
      }</>
    }
  </div>)
}
