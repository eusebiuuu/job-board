import { useState } from 'react'
import Filters from '../components/Filters'
import styles from './Announcements.module.css'
import { Link } from 'react-router-dom';

const jobTitle = 'Web developer';
const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum vitae dictumst sit vitae, mi imperdiet sit. Lectus eleifend aliquam nibh mauris, pretium. Lectus magnis lorem massa urna felis porta.'

export default function Announcements(props) {
  const [title, setTitle] = useState('');

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  return (<div className={styles.container}>
    <Filters show={false} />
    <div className={styles.search}>
      <input placeholder='Search jobs' onChange={handleTitleChange} value={title} />
    </div>
    <div className={styles.jobCard}>
      <h3>{jobTitle}</h3>
      <p>{description}</p>
      <div className={styles.link}>
        <Link to='/jobs/:id'>More info</Link>
      </div>
    </div>
    <div className={styles.jobCard}>
      <h3>{jobTitle}</h3>
      <p>{description}</p>
      <div className={styles.link}>
        <Link to='/jobs/:id'>More info</Link>
      </div>
    </div>
    <div className={styles.jobCard}>
      <h3>{jobTitle}</h3>
      <p>{description}</p>
      <div className={styles.link}>
        <Link to='/jobs/:id'>More info</Link>
      </div>
    </div>
    <div className={styles.jobCard}>
      <h3>{jobTitle}</h3>
      <p>{description}</p>
      <div className={styles.link}>
        <Link to='/jobs/:id'>More info</Link>
      </div>
    </div>
  </div>)
}
