import { allExperiences, allJobTypes, allLocations } from '../utils/filters'
import styles from './Filters.module.css'
import ListElement from './ListElement'
import Chips from './Chips'
import { useDispatch, useSelector } from 'react-redux'
import { changeCities, changeExperiences, changeJobTypes, changeKeywords, changeLocations, changeMinSalary, clearFilters, filterJobs } from '../redux/jobs/jobsSlice'
import { nanoid } from 'nanoid'
import { useEffect } from 'react'


export default function Filters(props) {
  const { show } = props;
  const dispatch = useDispatch();
  const { experiences, minSalary, locations, keywords, jobTypes, cities } = useSelector((state) => state.jobs);

  useEffect(() => {
    // dispatch(filterJobs());
    // eslint-disable-next-line
  }, [minSalary, experiences, locations, keywords, jobTypes, cities]);

  return <div className={styles.container}>
      <div className={styles.searchbar}>
        <input className={styles.input} onChange={(e) => dispatch(changeKeywords(e.target.value))}
          value={keywords} placeholder={'Search jobs'} />
      </div>
      <div className={styles.grid}>
        <div className={styles.item}>
          <h4>Experience</h4>
          {allExperiences.map(elem => {
            return <ListElement key={nanoid()} text={elem} value={experiences}
              onValueChange={() => dispatch(changeExperiences(elem))} />
          })}
        </div>
        <div className={styles.item}>
          <h4>Job type</h4>
          {allJobTypes.map((elem, idx) => {
            return <ListElement key={nanoid()} idx={idx} text={elem} value={jobTypes}
              onValueChange={() => dispatch(changeJobTypes(elem))} />
          })}
        </div>
        <div className={styles.item}>
          <h4>Location</h4>
          {allLocations.map(elem => {
            return <ListElement key={nanoid()} text={elem} value={locations}
              onValueChange={() => dispatch(changeLocations(elem))} />
          })}
        </div>
        <div className={styles.salary}>
          <h4>Minimum salary ($)</h4>
          <input className={styles['salary-input']} placeholder='Salary' step={500}
            onChange={(e) => dispatch(changeMinSalary(e.target.value))} value={minSalary} type='number' />
        </div>
      </div>
      <Chips placeholder='City' withRedux onChange={changeCities} value={cities} />
      <div>
        {show
          ? <button className={styles.filterBtn}>Save filters</button>
          : null
        }
        <button className={styles.filterBtn} onClick={() => dispatch(clearFilters())}>Clear filters</button>
      </div>
    </div>
}