import { allExperiences, allJobTypes, allLocations } from '../utils/filters'
import styles from './Filters.module.css'
import ListElement from './ListElement'
import Chips from './Chips'
import { useDispatch, useSelector } from 'react-redux'
import { filterJobs } from '../redux/jobs/jobsSlice'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'

const initialState = {
  experiences: [],
  minSalary: '',
  locations: [],
  keywords: '',
  jobTypes: [],
  cities: [],
}

export default function Filters(props) {
  const { allJobs } = props;
  const dispatch = useDispatch();
  const { jobs } = useSelector(state => state.jobs);
  const [filters, setFilters] = useState(() => {
    if (allJobs && localStorage.getItem('filters')) {
      return JSON.parse(localStorage.getItem('filters'));
    } else {
      return initialState;
    }
  });
  // console.log(filters);

  useEffect(() => {
    if (allJobs) {
      localStorage.setItem('filters', JSON.stringify(filters));
    }
    dispatch(filterJobs(filters));
    // eslint-disable-next-line
  }, [filters, jobs]);

  function handleFiltersChange(e) {
    const field = e.target.name, val = e.target.value;
    setFilters(prev => {
      if (['jobTypes', 'experiences', 'locations'].includes(field)) {
        const idx = prev[field].indexOf(val);
        if (idx !== -1) {
          return {
            ...prev,
            [field]: prev[field].filter((elem, curIdx) => {
              if (curIdx !== idx) {
                return elem;
              }
              return null;
            })
          }
        }
        return {
          ...prev,
          [field]: [...prev[field], val],
        }
      }
      return {
        ...prev,
        [field]: val
      }
    })
  }

  function handleFiltersClear() {
    setFilters(initialState);
  }

  return <div className={styles.container}>
    <div className={styles.searchbar}>
      <input className={styles.input} name='keywords' onChange={handleFiltersChange}
        value={filters.keywords} placeholder={'Search jobs'} />
    </div>
    <div className={styles.grid}>
      <div className={styles.item}>
        <h3>Experience</h3>
        {allExperiences.map((elem, idx) => {
          return <ListElement key={nanoid()} name='experiences' idx={idx} text={elem} value={filters.experiences}
            onValueChange={handleFiltersChange} />
        })}
      </div>
      <div className={styles.item}>
        <h3>Job type</h3>
        {allJobTypes.map((elem, idx) => {
          return <ListElement key={nanoid()} name='jobTypes' idx={idx} text={elem} value={filters.jobTypes}
            onValueChange={handleFiltersChange} />
        })}
      </div>
      <div className={styles.item}>
        <h3>Location</h3>
        {allLocations.map((elem, idx) => {
          return <ListElement key={nanoid()} name='locations' idx={idx} text={elem} value={filters.locations}
            onValueChange={handleFiltersChange} />
        })}
      </div>
    </div>
    <div className={styles.salary}>
      <label htmlFor='salary'>
        <h3>Salary ($):</h3>
      </label>
      <input className={styles['salary-input']} placeholder='Salary' name='minSalary' step={500}
        onChange={handleFiltersChange} value={filters.minSalary} type='number' id='salary' />
    </div>
    <Chips placeholder='City' name='cities' onChange={handleFiltersChange} value={filters.cities} />
    <div>
      <button className={styles.filterBtn} onClick={handleFiltersClear}>Clear filters</button>
    </div>
  </div>
}