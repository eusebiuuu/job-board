import { Link } from 'react-router-dom'
import styles from './JobCard.module.css'
import logo from '../assets/logo.svg'

export default function JobCard(props) {
  const { title, company, description, _id: id } = props.job; // imgLink etc.
  const { apply } = props;
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
    <p>{description.substring(0, 150)}&hellip;</p>
    {apply
      ? <Link to={`/jobs/${id}`}>Apply now</Link>
      : <Link to={`/jobs/${id}`}>More info</Link>}
  </div>
}