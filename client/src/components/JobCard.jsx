import { Link } from 'react-router-dom'
import styles from './JobCard.module.css'
import logo from '../assets/logo.svg'

export default function JobCard(props) {
  const { title, company, content, id } = props; // imgLink etc.
  return <div className={styles.container}>
    <div className={styles.header}>
      <div>
        <img src={logo} alt='Company logo' />
      </div>
      <div>
        <h3>{title}</h3>
        <h5>{company}</h5>
      </div>
    </div>
    <p>{content.substring(0, 150)}&hellip;</p>
    <Link to={`${id}`}>
      Apply now
    </Link>
  </div>
}