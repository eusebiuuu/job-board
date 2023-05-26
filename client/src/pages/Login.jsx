import { useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material';
import customFetch from '../lib/customFetch';
import { toast } from 'react-toastify';
import { useUserContext } from '../context/user';

const initialState = {
  email: '',
  password: '',
  type: 'candidate',
}

export default function Login() {
  const { onTypeChange, onUserIDChange } = useUserContext();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleFieldChange(e) {
    setFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }
  
  async function handleUserLogin() {
    setLoading(true);
    try {
      const resp = await customFetch.post('/auth/login', formData);
      toast.success(resp.data.msg);
      onTypeChange(resp.data.loginInfo.type);
      onUserIDChange(resp.data.loginInfo.userID);
      setLoading(false);
      navigate('/');
    } catch(err) {
      setLoading(false);
      console.log(err);
      toast.error(err.response.data.msg);
    }
  }

  return (<div className={styles.container}>
    <div className={styles.item1}>
      <h2>Login</h2>
      <TextField label='Email' className={styles.input} name='email' value={formData.email}
        onChange={handleFieldChange} />
      <TextField label='Password' name='password' className={styles.input} value={formData.password}
        onChange={handleFieldChange} />
      <div className={styles.link}>
        <Link to='/forgot-password'>Forgot your password?</Link>
      </div>
      <div className={styles.choice}>
        <label htmlFor='type'>Choose account type</label>
        <select id='type' name='type' value={formData.type} onChange={handleFieldChange}>
          <option value={'candidate'}>Candidate</option>
          <option value={'company'}>Company</option>
        </select>
      </div>
      <button className={styles.btn} onClick={handleUserLogin} disabled={loading}>
        {loading ? <>Loading...</> : <>Login</>}
      </button>
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
