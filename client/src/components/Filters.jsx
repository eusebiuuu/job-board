import { useState } from 'react'
import { experience, indexes, jobTypes, locations } from '../utils/filters'
import styles from './Filters.module.css'
import ListElement from './ListElement'
import Chips from './Chips'

const initFilters = [false, false, false, false, false, false, false, false, false];

export default function Filters(props) {
  const { show } = props;
  const [filters, setFilters] = useState(initFilters);
  const [cities, setCities] = useState([]);
  const [salary, setSalary] = useState('');

  function handleFiltersClear() {
    setCities([]);
    setSalary('');
    setFilters(initFilters);
  }

  function handleValueChange(prop) {
    setFilters(prev => {
      return prev.map((elem, idx) => {
        if (idx === indexes.indexOf(prop)) {
          return !elem;
        }
        return elem;
      });
    });
  }

  function handleSalaryChange(event) {
    setSalary(event.target.value);
  }

  return <div className={styles.container}>
    <div className={styles.grid}>
      <div className={styles.item}>
        <h4>Experience</h4>
        {experience.map(elem => {
          return <ListElement key={indexes.indexOf(elem)} text={elem}
            value={filters[indexes.indexOf(elem)]} onValueChange={handleValueChange} />
        })}
      </div>
      <div className={styles.item}>
        <h4>Job type</h4>
        {jobTypes.map(elem => {
          return <ListElement key={indexes.indexOf(elem)} text={elem}
            value={filters[indexes.indexOf(elem)]} onValueChange={handleValueChange} />
        })}
      </div>
      <div className={styles.item}>
        <h4>Location</h4>
        {locations.map(elem => {
          return <ListElement key={indexes.indexOf(elem)} text={elem}
            value={filters[indexes.indexOf(elem)]} onValueChange={handleValueChange} />
        })}
      </div>
      <div className={styles.salary}>
        <h4>Minimum salary ($)</h4>
        <input className={styles['salary-input']} placeholder='Salary' onChange={handleSalaryChange} value={salary} type='number' />
      </div>
    </div>
    <Chips placeholder='City' onChange={setCities} value={cities} />
    {show
    ? <div>
      <button className={styles.filterBtn}>Save filters</button>
      <button className={styles.filterBtn} onClick={handleFiltersClear}>Clear filters</button>
    </div>
    : null
    }
  </div>
}