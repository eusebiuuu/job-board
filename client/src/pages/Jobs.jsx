import { useEffect } from "react"
import styles from './Jobs.module.css'
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { getAllJobs } from "../redux/jobs/jobsSlice";
import Loader from "../components/Loader";

export default function Jobs() {
  const { isLoading, filteredJobs } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
    // eslint-disable-next-line
  }, []);

  return (<div className={styles.container}>
    {isLoading || !filteredJobs
      ? <Loader />
      : <>
          <Filters show={true} />
          <div className={styles.title}>
          {filteredJobs.length !== 0
            ? <h2>Found jobs</h2>
            : <h2>No jobs found...</h2>}
          </div>
          <div className={styles.jobs}>
            {filteredJobs.map(job => {
              return <JobCard key={nanoid()} apply job={job} />
            })}
          </div>
        </>
    }
  </div>)
}
