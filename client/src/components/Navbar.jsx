import styles from './Navbar.module.css'
import logo from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import { useEffect, useRef, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { TbReportSearch } from 'react-icons/tb'
import { useThemeContext } from '../context/theme'
import { useUserContext } from '../context/user'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'

function Navbar() {
  const { onThemeToggle } = useThemeContext();
  const { type, onSidebarToggle, onLogout } = useUserContext();
  const [details, setDetails] = useState(false);
  const containerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDetails(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }; 
  }, [containerRef]);

  return (<nav className={styles.container} ref={containerRef}>
    <Link to='/'>
      <div className={styles.logo}>
        <img src={logo} alt='logo' />
      </div>
    </Link>
    <div className={styles.theme}>
      <button onClick={onThemeToggle}>
        <h3>Theme</h3>
      </button>
    </div>
    <div className={styles.allJobs}>
      <Link to='/jobs'>
        <div>
          <div><h3>Search jobs</h3></div>
          <div><TbReportSearch size={23} /></div>
        </div>
      </Link>
    </div>
    <div className={type !== '' ? styles.account : styles.hide}>
      <button onClick={() => setDetails(prev => !prev)}>
        <div>
          <div><h3>Account</h3></div>
          <div><CgProfile size={25} /></div>
          <div>
            {!details ? <IoMdArrowDropdown size={25} /> : <IoMdArrowDropup size={25} />}
          </div>
        </div>
      </button>
      <div onClick={() => setDetails(prev => !prev)} className={type === '' || !details ? styles.hide : styles.details}>
        {type === 'company'
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
      <button onClick={onSidebarToggle}>
        <AiOutlineMenu size={25} />
      </button>
    </div>
    <div className={styles.auth}>
      {type === ''
        ? <button>
          <Link to='/login'>
            <h3>Login</h3>
          </Link>
        </button>
        : <button onClick={() => {onLogout(true); navigate('/')}}>
          <h3>Logout</h3>
        </button>
      }
    </div>
  </nav>);
}

export default Navbar;