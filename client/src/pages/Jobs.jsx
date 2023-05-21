import { useEffect, useState } from "react"
import styles from './Jobs.module.css'
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { getAllJobs } from "../redux/jobs/jobsSlice";
import Loader from "../components/Loader";
import { useUserContext } from "../context/user";

export default function Jobs() {
  const { filteredJobs } = useSelector((state) => state.jobs);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { type } = useUserContext();
  
  useEffect(() => {
    dispatch(getAllJobs());
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  return (<div className={styles.container}>
    {isLoading || !filteredJobs
      ? <Loader />
      : <>
        <Filters allJobs={true} />
        <div className={styles.title}>
          {filteredJobs.length !== 0
            ? <h2>Found jobs</h2>
            : <h2>No jobs found...</h2>
          }
        </div>
        <div className={styles.jobs}>
          {filteredJobs.map(job => {
            return <JobCard key={nanoid()} apply={type !== 'company'} job={job} />
          })}
        </div>
      </>
    }
  </div>)
}
