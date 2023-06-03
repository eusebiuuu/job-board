import { useEffect, useState } from "react"
import styles from './Jobs.module.css'
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { changeState, getAllJobs } from "../redux/jobs/jobsSlice";
import Loader from "../components/Loader";
import { useUserContext } from "../context/user";
import getPaginatedJobs from "../utils/pagination";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

export default function Jobs() {
  const { filteredJobs, page, limit } = useSelector((state) => state.jobs);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { type } = useUserContext();

  useEffect(() => {
    dispatch(getAllJobs());
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  function handleFieldChange(e) {
    dispatch(changeState({ name: e.target.name, value: Number.parseInt(e.target.value, 10) }));
  }

  return (<div className={styles.container}>
    {isLoading || !filteredJobs
      ? <Loader />
      : <>
        <Filters allJobs={true} />
        <div className={styles.select}>
          <label htmlFor="limit">Jobs display limit</label>
          <select value={limit} id="limit" name="limit" onChange={handleFieldChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className={styles.title}>
          {filteredJobs.length !== 0
            ? <h2>Found jobs</h2>
            : <h2>No jobs found...</h2>
          }
        </div>
        <div className={styles.jobs} data-testid='jobs'>
          {getPaginatedJobs(limit, page, filteredJobs).map(job => {
            return <JobCard key={nanoid()} apply={type !== 'company'} job={job} />
          })}
        </div>
        <div className={styles.btns}>
          <button disabled={page === 1}
            onClick={() => dispatch(changeState({ name: 'page', value: page - 1 }))}>
            <AiOutlineLeft size={25} />
          </button>
          <div>Page: {page}</div>
          <button disabled={filteredJobs.length <= page * limit}
            onClick={() => dispatch(changeState({ name: 'page', value: page + 1 }))}>
            <AiOutlineRight size={25} />
          </button>
        </div>
      </>
    }
  </div>)
}
