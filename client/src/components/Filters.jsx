import { useState } from 'react'
import { experience, indexes, jobTypes, locations } from '../utils/filters'
import styles from './Filters.module.css'
import ListElement from './ListElement'
import { TiDeleteOutline } from 'react-icons/ti'

const initFilters = [false, false, false, false, false, false, false, false, false];

export default function Filters(props) {
  const { show } = props;
  const [filters, setFilters] = useState(initFilters);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');
  const [salary, setSalary] = useState('');

  function handleFiltersClear() {
    setCity('');
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

  function handleCityAdd(event) {
    event.preventDefault();
    setCity('');
    const exist = cities.find(curCity => {
      if (city.toLowerCase() === curCity.toLowerCase()) {
        return city;
      }
      return null;
    });
    setCities((cities) => {
      if (!exist) {
        return [...cities, city];
      }
      return cities;
    });
  }

  function handleCityDelete(val) {
    setCities(cities => {
      const curIdx = cities.indexOf(val);
      return cities.filter((elem, idx) => {
        if (curIdx !== idx) {
          return elem;
        }
        return null;
      })
    })
  }

  function handleCityChange(event) {
    setCity(event.target.value);
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
    <div className={styles.list}>
      {cities.map((elem, idx) => {
        return <div key={idx} className={styles.city}>
          <div className={styles.cityFlex}>
            <button onClick={() => handleCityDelete(elem)}>
              <TiDeleteOutline size={25} />
            </button>
            <div>{elem}</div>
          </div>
        </div>
      })}
      <form onSubmit={handleCityAdd}>
        <input required onChange={handleCityChange} value={city} placeholder={'City'} />
        <button className={styles.btn} type='submit'>Add city</button>
      </form>
    </div>
    {show
    ? <div>
      <button className={styles.filterBtn}>Save filters</button>
      <button className={styles.filterBtn} onClick={handleFiltersClear}>Clear filters</button>
    </div>
    : null
    }
  </div>
}