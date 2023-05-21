import { useEffect, useState } from 'react'
import Filters from '../components/Filters'
import styles from './Announcements.module.css'
import { Link } from 'react-router-dom';
import { getAllAnnouncements } from '../redux/jobs/jobsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import Loader from '../components/Loader';

export default function Announcements(props) {
  const dispatch = useDispatch();
  const { filteredJobs } = useSelector((state) => state.jobs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllAnnouncements());
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  return (<div className={styles.container}>
    <Filters />
    {loading || !filteredJobs
    ? <Loader />
    : <>{filteredJobs.length === 0
      ? <div className={styles.flex}><h2>No announcements found...</h2></div>
      : <>{filteredJobs.map(job => {
          return <div key={nanoid()} className={styles.jobCard}>
            <h3>{job.title}</h3>
            <p>{job.description.substring(0, 150)}&hellip;</p>
            <div className={styles.link}>
              <Link to={`/jobs/${job._id}`}>More info</Link>
            </div>
          </div>
        })}</>
      }</>
    }
  </div>)
}
