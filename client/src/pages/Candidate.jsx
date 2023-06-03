import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Candidate.module.css'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useUserContext } from '../context/user';
import Loader from '../components/Loader';

export default function Candidate() {
  const [isLoading, setIsLoading] = useState(true);
  const { type, onLogout } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (type !== 'candidate') {
        if (type === 'company') {
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
            }} to='appliedJobs'>Applied jobs</NavLink>
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