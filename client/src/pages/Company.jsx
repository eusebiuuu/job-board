import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import styles from './Company.module.css'
import { useUserContext } from '../context/user';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';

export default function Company() {
  const { type, onLogout } = useUserContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (type !== 'company') {
        if (type === 'candidate') {
          toast.error('Unauthorized to access this route. Logging out...');
          await onLogout();
        } else {
          toast.error('Unauthorized to access this route');
        }
        navigate('/');
        return;
      }
      setIsLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  return (<div>
    {isLoading
      ? <Loader />
      : <>
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
      </>
    }
  </div>)
}