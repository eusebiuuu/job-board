import { TextField } from '@mui/material'
import styles from './CompanyRegister.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import customFetch from '../lib/customFetch';
import { toast } from 'react-toastify';

const initialState = {
  mainHeadquarter: '',
  name: '',
  email: '',
  phone: '',
  password: '',
}

export default function CompanyRegister(props) {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState({});
  const navigate = useNavigate();
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  function handleFormChange(e) {
    setErr({});
    setFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!formData.email.toLowerCase().match(emailPattern)) {
      setErr(prev => {
        return {
          ...prev,
          'email': 'Please enter a valid email address'
        }
      });
      return;
    }
    if (formData.password.length < 6) {
      setErr(prev => {
        return {
          ...prev,
          'password': 'The password must have at least 6 characters'
        }
      });
      return;
    }
    setIsLoading(true);
    try {
      const resp = await customFetch.post(`/auth/register`, { user: { ...formData, type: 'company' } });
      toast.success(resp.data.msg);
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
      setIsLoading(false);
    }
  }

  return (<form className={styles.form} onSubmit={handleFormSubmit}>
    <div className={styles.input}>
      <TextField label='Name' value={formData.name} name='name' required onChange={handleFormChange} />
    </div>
    <div className={styles.input}>
      <TextField type='email' name='email' error={Boolean(err['email'])} required label='Email' value={formData.email}
        onChange={handleFormChange} />
      <div className={`${err['email'] ? styles.err : styles.hide}`}>{err['email']}</div>
    </div>
    <div className={styles.input}>
      <TextField type='password' name='password' error={Boolean(err['password'])} required
        label='Password' value={formData.password} onChange={handleFormChange} />
      <div className={`${err['password'] ? styles.err : styles.hide}`}>{err['password']}</div>
    </div>
    <div className={styles.input}>
      <TextField label='Phone' name='phone' required value={formData.phone} onChange={handleFormChange} />
    </div>
    <div className={styles.input}>
      <TextField label='Headquarter' name='mainHeadquarter' value={formData.headquarter}
        onChange={handleFormChange} />
    </div>
    <div>
      <button type='submit' className={styles.btn} disabled={isLoading}>
        {isLoading
          ? <>Loading...</>
          : <>Register</>
        }
      </button>
    </div>
  </form>)
}
