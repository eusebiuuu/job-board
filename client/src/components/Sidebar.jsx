import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css'
import { BiLock } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';

function Sidebar(props) {
  return (<div className={`${styles.hide} ${styles.sidebar}`}>
    <NavLink to='/jobs'>
      <div className={styles['link-container']}>
        <h3>Search jobs</h3>
      </div>
    </NavLink>
    <NavLink to='/company/candidates'>
      <div className={styles['link-container']}>
        <h3>Candidates</h3>
      </div>
    </NavLink>
    <NavLink to='/company/announcements'>
      <div className={styles['link-container']}>
        <h3>Announcements</h3>
      </div>
    </NavLink>
    <NavLink to='/login'>
      <div className={styles['link-container']}>
        <div className={styles.flex}>
          <h3>Login</h3>
          <BiLock size={'1.8em'} />
        </div>
      </div>
    </NavLink>
    <NavLink to='/company/profile'>
      <div className={styles['link-container']}>
        <div className={styles.flex}>
          <h3>Profile</h3>
          <BsFillPersonFill size={'1.8em'} />
        </div>
      </div>
    </NavLink>
    <NavLink to='/company/checkout'>
      <div className={styles['link-container']}>
        <h3>Checkout</h3>
      </div>
    </NavLink>
    <NavLink to='/company/addJob'>
      <div className={styles['link-container']}>
        <h3>Recruiting?</h3>
      </div>
    </NavLink>
  </div>)
}

export default Sidebar;