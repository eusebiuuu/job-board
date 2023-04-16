import styles from './Navbar.module.css'
import logo from '../assets/logo.svg'
import { NavLink } from 'react-router-dom'
import { BsFillPersonFill,BsLayoutTextSidebarReverse } from 'react-icons/bs'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { BiLock } from 'react-icons/bi'
import { Badge, Button } from '@mui/material'

function Navbar(props) {
    return (<nav className={styles.container}>
        <NavLink to='/'>
            <div className={styles.logo}>
                <img src={logo} alt='logo' />
            </div>
        </NavLink>
        <div className={styles.links}>
            <div className={styles['link-container']}>
                <NavLink to='/jobs'>
                    <h4>Search jobs</h4>
                </NavLink>
            </div>
            <div className={styles['link-container']}>
                <NavLink to='/company/candidates'>
                    <h4>Candidates</h4>
                </NavLink>
            </div>
            <div className={styles['link-container']}>
                <NavLink to='company/announcements'>
                    <h4>Announcements</h4>
                </NavLink>
            </div>
        </div>
        <div className={styles.links}>
            <div className={styles['link-container']}>
                <div className={styles.header}>
                    <Badge badgeContent={20} overlap='circular' color='secondary'>
                        <IoIosNotificationsOutline size={25} />
                    </Badge>
                </div>
            </div>
            <div className={styles['link-container']}>
                <NavLink to='/login'>
                    <h4 className={styles.icon}>
                        Login
                        <BiLock size={18} />
                    </h4>
                </NavLink>
            </div>
            <div className={styles['link-container']}>
                <NavLink to='/company/profile'>
                    <h4 className={styles.icon}>
                        Profile
                        <BsFillPersonFill size={18} />
                    </h4>
                </NavLink>
            </div>
            <div className={styles['link-container']}>
                <NavLink to='/company/checkout'>
                    <h4>Checkout</h4>
                </NavLink>
            </div>
            <div className={styles['link-container']}>
                <NavLink to='/company/addJob'>
                    <h4>Recruiting?</h4>
                </NavLink>
            </div>
        </div>
        <div className={`${styles['link-container']} ${styles.sidebar}`}>
            <Button>
                <BsLayoutTextSidebarReverse size={25} color='#111827' />
            </Button>
        </div>
    </nav>);
}

export default Navbar;