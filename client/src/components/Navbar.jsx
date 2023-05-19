import styles from './Navbar.module.css'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { TbReportSearch } from 'react-icons/tb'
import { useThemeContext } from '../context/theme'
import customFetch from '../lib/customFetch'

function Navbar() {
  const { onThemeToggle } = useThemeContext();
  const [user, setUser] = useState('');
  const [details, setDetails] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resp = await customFetch.get('/auth/showMe');
        if (resp.data.user) {
          setUser(resp.data.user.type);
        }
      } catch (err) {
        console.log(err);
      }
    })();
    console.log('Navbar rendering...');
  }, []);

  return (<nav className={styles.container}>
    <Link to='/'>
      <div className={styles.logo}>
        <img src={logo} alt='logo' />
      </div>
    </Link>
    <div className={styles.theme}>
      <button onClick={onThemeToggle}>
        <h3>Change theme</h3>
      </button>
    </div>
    <div className={styles.allJobs}>
      <Link to='/jobs'>
        <div>
          <div><h3>Search jobs</h3></div>
          <div><TbReportSearch size={25} /></div>
        </div>
      </Link>
    </div>
    <div className={user !== '' ? styles.account : styles.hide}>
      <button onClick={() => setDetails(prev => !prev)}>
        <div>
          <div><h3>Account</h3></div>
          <div><CgProfile size={25} /></div>
        </div>
      </button>
      <div onClick={() => setDetails(prev => !prev)} className={user === '' || !details ? styles.hide : styles.details}>
        {user === 'candidate'
        ? <ul>
          <li>
            <Link to='/company/profile'>
              <h4 className={styles.icon}>
                Profile
                <BsFillPersonFill size={15} />
              </h4>
            </Link>
          </li>
          <li>
            <Link to='/company/checkout'>
              <h4>Checkout</h4>
            </Link>
          </li>
          <li>
            <Link to='/company/addJob'>
              <h4>Recruiting?</h4>
            </Link>
          </li>
          <li>
            <Link to='/company/candidates'>
              <h4>Candidates</h4>
            </Link>
          </li>
          <li>
            <Link to='company/announcements'>
              <h4>Announcements</h4>
            </Link>
          </li>
        </ul>
        : <ul>
          <li>
            <Link to='/candidate/profile'>
              <h4 className={styles.icon}>
                Profile
                <BsFillPersonFill size={15} />
              </h4>
            </Link>
          </li>
          <li>
            <Link to='/candidate/appliedJobs'>
              <h4>Applied jobs</h4>
            </Link>
          </li>
        </ul>
        }
      </div>
    </div>
    <div className={styles.sidebar}>
      <button>
        <AiOutlineMenu size={25} />
      </button>
    </div>
    <div className={styles.auth}>
      {user === ''
        ? <button>
          <Link to='/login'>
            <h3>Login</h3>
          </Link>
        </button>
        : <button onClick={() => setUser('')}>
          <h3>Logout</h3>
        </button>
      }
    </div>
  </nav>);
}

export default Navbar;