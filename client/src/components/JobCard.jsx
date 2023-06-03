import { Link } from 'react-router-dom'
import styles from './JobCard.module.css'
import getDate from '../utils/getDate';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdDateRange, MdWorkOutline } from 'react-icons/md'
import { BiMoneyWithdraw } from 'react-icons/bi'

export default function JobCard(props) {
  const { title, companyID: company, description, location,
    experience, minSalary, createdAt: postDate, _id: id } = props.job;
  const { logo, name } = company;
  const { apply, personal } = props;
  return <div className={styles.container}>
    <div className={styles.header}>
      <div className={!personal ? '' : 'hide'}>
        <img src={logo} alt='Company logo' />
      </div>
      <div>
        <h3>{title}</h3>
        <h5 className={!personal ? '' : 'hide'}>{name}</h5>
      </div>
    </div>
    <p>{description.substring(0, 150)}&hellip;</p>
    <div className={styles.details}>
      <div className={styles.item}><HiOutlineOfficeBuilding size={20} /> {location}</div>
      <div className={styles.item}><MdWorkOutline size={20} /> {experience}</div>
      <div className={styles.item}><MdDateRange size={20} /> {getDate(postDate)}</div>
      <div className={styles.item}><BiMoneyWithdraw size={20} /> {minSalary ? `${minSalary}$` : 'Unspecified'}</div>
    </div>
    <Link to={`/jobs/${id}`}>{apply ? 'Apply now' : 'More info'}</Link>
  </div>
}