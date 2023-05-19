import { allExperiences, allJobTypes, allLocations } from '../utils/filters'
import styles from './Filters.module.css'
import ListElement from './ListElement'
import Chips from './Chips'
import { useDispatch } from 'react-redux'
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
    // console.log('Filtering...');
    dispatch(filterJobs(filters));
    // eslint-disable-next-line
  }, [filters]);

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
          <h4>Experience</h4>
          {allExperiences.map(elem => {
            return <ListElement key={nanoid()} name='experiences' text={elem} value={filters.experiences}
              onValueChange={handleFiltersChange} />
          })}
        </div>
        <div className={styles.item}>
          <h4>Job type</h4>
          {allJobTypes.map((elem, idx) => {
            return <ListElement key={nanoid()} name='jobTypes' idx={idx} text={elem} value={filters.jobTypes}
              onValueChange={handleFiltersChange} />
          })}
        </div>
        <div className={styles.item}>
          <h4>Location</h4>
          {allLocations.map(elem => {
            return <ListElement key={nanoid()} name='locations' text={elem} value={filters.locations}
              onValueChange={handleFiltersChange} />
          })}
        </div>
        <div className={styles.salary}>
          <h4>Minimum salary ($)</h4>
          <input className={styles['salary-input']} placeholder='Salary' name='minSalary' step={500}
            onChange={handleFiltersChange} value={filters.minSalary} type='number' />
        </div>
      </div>
      <Chips placeholder='City' name='cities' onChange={handleFiltersChange} value={filters.cities} />
      <div>
        <button className={styles.filterBtn} onClick={handleFiltersClear}>Clear filters</button>
      </div>
    </div>
}