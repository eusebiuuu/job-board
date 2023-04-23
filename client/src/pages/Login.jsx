import { useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (<div className={styles.container}>
    <div className={styles.item1}>
      <h2>Login</h2>
      <TextField id='outlined-basic' label='Email' className={styles.input} value={email} onChange={handleEmailChange} />
      <TextField id='outlined-basic' label='Password' className={styles.input} value={password} onChange={handlePasswordChange} />
      <div className={styles.link}>
        <Link to='/forgotPassword'>Forgot your password?</Link>
      </div>
      <button className={styles.btn}>Login</button>
    </div>
    <div className={styles.item2}>
      <h2>Not registered?</h2>
      <h4>Search & apply</h4>
      <p>Lorem ipsum dolor sit amet, consectetur</p>
      <h4>Find your dream job</h4>
      <p>Lorem ipsum dolor sit amet, consectetur</p>
      <h4>Find the perfect candidates</h4>
      <p>Lorem ipsum dolor sit amet, consectetur</p>
      <button className={styles.btn}>
        <Link to='/register'>Register</Link>
      </button>
    </div>
  </div>)
}
