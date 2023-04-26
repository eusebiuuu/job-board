import { NavLink, Outlet } from 'react-router-dom';
import styles from './Candidate.module.css'

export default function Candidate(props) {
  return (<div>
    <nav className={styles.pages}>
      <div className={styles.link}>
        <NavLink className={({ isActive }) => {
          return isActive ? styles.activeLink : '';
        }} to='profile'>Profile</NavLink>
      </div>
      <div className={styles.link}>
        <NavLink className={({ isActive }) => {
          return isActive ? styles.activeLink : '';
        }} to='appliedJobs'>Applied jobs</NavLink>
      </div>
    </nav>
    <hr />
    <div className={styles.content}>
      <Outlet />
    </div>
  </div>)
}