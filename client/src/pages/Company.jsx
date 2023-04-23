import { NavLink, Outlet } from 'react-router-dom'
import styles from './Company.module.css'

export default function Company(props) {
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
        }} to='announcements'>Announcements</NavLink>
      </div>
      <div className={styles.link}>
        <NavLink className={({ isActive }) => {
          return isActive ? styles.activeLink : '';
        }} to='addJob'>Add job</NavLink>
      </div>
      <div className={styles.link}>
        <NavLink className={({ isActive }) => {
          return isActive ? styles.activeLink : '';
        }} to='checkout'>Checkout</NavLink>
      </div>
    </nav>
    <hr />
    <div className={styles.content}>
      <Outlet />
    </div>
  </div>)
}