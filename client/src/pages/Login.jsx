import { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material';
import customFetch from '../lib/customFetch';
import { toast } from 'react-toastify';
import { useUserContext } from '../context/user';
import login from '../assets/login.svg'

const initialState = {
  email: '',
  password: '',
  type: 'candidate',
}

const initLoading = [false, false, false];

export default function Login() {
  const { onTypeChange, onUserIDChange, type } = useUserContext();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(initLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (type !== '') {
      toast.error('You must logout in order to login');
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  function handleFieldChange(e) {
    setFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }
  
  async function handleUserLogin() {
    setLoading([true, false, false]);
    try {
      const resp = await customFetch.post('/auth/login', formData);
      toast.success(resp.data.msg);
      onTypeChange(resp.data.loginInfo.type);
      onUserIDChange(resp.data.loginInfo.userID);
      localStorage.clear();
      setLoading(initLoading);
      navigate('/');
    } catch(err) {
      setLoading(initLoading);
      console.log(err);
      toast.error(err.response.data.msg);
    }
  }

  async function handleTestCandidateLogin() {
    setLoading([false, true, false]);
    try {
      const resp = await customFetch.post('/auth/login', {
        type: 'candidate',
        email: 'jreddel0@drupal.org',
        password: 'ZmIHGN4z9'
      });
      const { userID, type } = resp.data.loginInfo;
      toast.success(`${resp.data.msg}. Wellcome back!`);
      onTypeChange(type);
      onUserIDChange(userID);
      localStorage.clear();
      setLoading(initLoading);
      navigate('/');
    } catch(err) {
      setLoading(initLoading);
      console.log(err);
      toast.error(err.response.data.msg);
    }
  }

  async function handleTestCompanyLogin() {
    setLoading([false, false, true]);
    try {
      const resp = await customFetch.post('/auth/login', {
        type: 'company',
        email: 'scashley0@cdc.gov',
        password: '6CynAWENT'
      });
      const { userID, type } = resp.data.loginInfo;
      toast.success(resp.data.msg);
      onTypeChange(type);
      onUserIDChange(userID);
      localStorage.clear();
      setLoading(initLoading);
      navigate('/');
    } catch(err) {
      setLoading(initLoading);
      console.log(err);
      toast.error(err.response.data.msg);
    }
  }

  return (<div className={styles.container}>
    <div className={styles.item1}>
      <h2>Login</h2>
      <div className={styles.input}>
        <TextField label='Email' name='email' value={formData.email}
          onChange={handleFieldChange} />
      </div>
      <div className={styles.input}>
        <TextField label='Password' type='password' name='password' className={styles.input} value={formData.password}
          onChange={handleFieldChange} />
      </div>
      <div className={styles.link}>
        <Link to='/forgot-password'>Forgot your password?</Link>
      </div>
      <div className={styles.choice}>
        <select name='type' value={formData.type} onChange={handleFieldChange}>
          <option value={'candidate'}>Candidate</option>
          <option value={'company'}>Company</option>
        </select>
      </div>
      <button className={styles.btn} onClick={handleUserLogin} disabled={loading[0]}>
        {loading[0] ? 'Loading...' : 'Login'}
      </button>
      <button className={styles.btn} onClick={handleTestCompanyLogin} disabled={loading[2]}>
        {loading[2] ? 'Loading...' : 'Test company'}
      </button>
      <button className={styles.btn} onClick={handleTestCandidateLogin} disabled={loading[1]}>
        {loading[1] ? 'Loading...' : 'Test candidate'}
      </button>
    </div>
    <div className={styles.image}>
      <img src={login} alt={'Login'} />
    </div>
  </div>)
}
