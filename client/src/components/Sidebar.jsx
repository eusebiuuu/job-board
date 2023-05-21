import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css'
import { BiLock } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { useUserContext } from '../context/user';
import { GrClose } from 'react-icons/gr'
import logo from '../assets/logo.svg'
import { CgProfile } from 'react-icons/cg';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { useState } from 'react';

function Sidebar() {
  const { type, sidebar, onSidebarToggle, onLogout } = useUserContext();
  const [details, setDetails] = useState(false);

  return (<div className={`${sidebar ? '' : styles.hide} ${styles.sidebar}`}>
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt='logo' />
      </div>
      <div className={styles.close}>
        <button onClick={onSidebarToggle}>
          <GrClose size={30} />
        </button>
      </div>
    </div>
    <Link onClick={onSidebarToggle} to='/'>
      <div className={styles['link-container']}>
        <h3>Home</h3>
      </div>
    </Link>
    <Link onClick={onSidebarToggle} to='/jobs'>
      <div className={styles['link-container']}>
        <h3>Search jobs</h3>
      </div>
    </Link>
    <div className={`${styles.account} ${type === '' ? styles.hideDetails : ''}`}>
      <button onClick={() => setDetails(prev => !prev)}>
        <div><h3>Account</h3></div>
        <div><CgProfile size={'1.5em'} /></div>
        <div>
          {!details ? <IoMdArrowDropdown size={'1.5em'} /> : <IoMdArrowDropup size={'1.5em'} />}
        </div>
      </button>
    </div>
    <div className={`${!details || type === '' ? styles.hideDetails : ''}`}>
      {type === 'company'
        ? <>
          <Link onClick={onSidebarToggle} to='/company/profile'>
            <div className={styles['link-container']}>
              <div className={styles.flex}>
                <h3>Profile</h3>
                <BsFillPersonFill size={'1.5em'} />
              </div>
            </div>
          </Link>
          <Link onClick={onSidebarToggle} to='/company/checkout'>
            <div className={styles['link-container']}>
              <h3>Checkout</h3>
            </div>
          </Link>
          <Link onClick={onSidebarToggle} to='/company/addJob'>
            <div className={styles['link-container']}>
              <h3>Recruiting?</h3>
            </div>
          </Link>
          <Link onClick={onSidebarToggle} to='/company/announcements'>
            <div className={styles['link-container']}>
              <h3>Announcements</h3>
            </div>
          </Link>
        </>
        : <>
          <Link onClick={onSidebarToggle} to='/candidate/profile'>
            <div className={styles['link-container']}>
              <div className={styles.flex}>
                <h3>Profile</h3>
                <BsFillPersonFill size={'1.5em'} />
              </div>
            </div>
          </Link>
          <Link onClick={onSidebarToggle} to='/candidate/appliedJobs'>
            <div className={styles['link-container']}>
              <h3>AppliedJobs</h3>
            </div>
          </Link>
        </>}
    </div>
    <div className={styles.auth}>
      {type === ''
        ? <Link onClick={onSidebarToggle} to='/login'>
          <div>
            <div className={styles.flex}>
              <h3>Login</h3>
              <BiLock size={22} />
            </div>
          </div>
        </Link>
        : <button onClick={() => onLogout(true)}>
          <h3>Logout</h3>
        </button>
      }
    </div>
  </div>)
}

export default Sidebar;