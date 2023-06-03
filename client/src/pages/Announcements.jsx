import { useEffect, useState } from 'react'
import Filters from '../components/Filters'
import styles from './Announcements.module.css'
import { changeState, getAllAnnouncements } from '../redux/jobs/jobsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import Loader from '../components/Loader';
import getPaginatedJobs from '../utils/pagination';
import JobCard from '../components/JobCard';

export default function Announcements(props) {
  const dispatch = useDispatch();
  const { filteredJobs, page } = useSelector((state) => state.jobs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllAnnouncements());
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
        ? <div className={styles.flex}><h2>No announcements found...</h2></div>
        : <div className={styles.jobs}>{getPaginatedJobs(null, page, filteredJobs).map(job => {
          return <JobCard key={nanoid()} job={job} personal />
        })}</div>
      }</>
    }
  </div>)
}
