import styles from './Navbar.module.css'
import logo from '../assets/logo.svg'
import { NavLink } from 'react-router-dom'
import { BsFillPersonFill } from 'react-icons/bs'
import { BiLock } from 'react-icons/bi'
import { Button, MenuItem } from '@mui/material'
import { AiOutlineMenu } from 'react-icons/ai'
import { Menu } from '@mui/material';
import { useState } from 'react'
import { CgProfile } from 'react-icons/cg'

function Navbar(props) {
  const [anchor, setAnchor] = useState(null);

  function handleAnchorChange(event) {
    setAnchor(event.currentTarget);
  }

  function handleAnchorClose() {
    setAnchor(null);
  }

  return (<nav className={styles.container}>
    <NavLink to='/'>
      <div className={styles.logo}>
        <img src={logo} alt='logo' />
      </div>
    </NavLink>
    <div className={styles['link-container']}>
      <NavLink to='/jobs'>
        <h3>Search jobs</h3>
      </NavLink>
    </div>
    <div className={styles['link-container']}>
      <Button onClick={handleAnchorChange} disableRipple={true}>
        <h3 className={styles.color}>Profile</h3>
        <h3 className={styles.color}><CgProfile size={25} /></h3>
      </Button>
    </div>
    <Menu open={Boolean(anchor)} anchorEl={anchor} transitionDuration={100} onClick={handleAnchorClose}>
      <MenuItem onClick={handleAnchorClose}>
        <NavLink to='/company/profile'>
          <h4 className={styles.icon}>
            Account
            <BsFillPersonFill size={15} />
          </h4>
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleAnchorClose}>
        <NavLink to='/company/checkout'>
          <h4>Checkout</h4>
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleAnchorClose}>
        <NavLink to='/company/addJob'>
          <h4>Recruiting?</h4>
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleAnchorClose}>
        <NavLink to='/login'>
          <h4 className={styles.icon}>
            Logout
            <BiLock size={15} />
          </h4>
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleAnchorClose}>
        <NavLink to='/company/candidates'>
          <h4>Candidates</h4>
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleAnchorClose}>
        <NavLink to='company/announcements'>
          <h4>Announcements</h4>
        </NavLink>
      </MenuItem>
    </Menu>
    <div className={`${styles['link-container']} ${styles.sidebar}`}>
      <Button>
        <h3 className={styles.color}><AiOutlineMenu size={25} /></h3>
      </Button>
    </div>
  </nav>);
}

export default Navbar;