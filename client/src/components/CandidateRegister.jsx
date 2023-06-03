import { TextField } from '@mui/material'
import styles from './CandidateRegister.module.css'
import { useState } from 'react'
import { toast } from 'react-toastify';
import customFetch from '../lib/customFetch';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
}

export default function CandidateRegister() {
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
    if (formData.firstName.length === 0) {
      setErr(prev => {
        return {
          ...prev,
          'firstName': 'The first name must not be empty'
        }
      });
      return;
    }
    if (formData.lastName.length === 0) {
      setErr(prev => {
        return {
          ...prev,
          'lastName': 'The last name must not be empty'
        }
      });
      return;
    }
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
    if (formData.phone.length === 0) {
      setErr(prev => {
        return {
          ...prev,
          'phone': 'The phone field must not be empty'
        }
      });
      return;
    }
    setIsLoading(true);
    try {
      const resp = await customFetch.post(`/auth/register`, { user: { ...formData, type: 'candidate' } });
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
      <TextField label='First name' value={formData.firstName} name='firstName'
        error={Boolean(err['firstName'])} onChange={handleFormChange} />
      <div className={`${err['firstName'] ? styles.err : styles.hide}`}>{err['firstName']}</div>
    </div>
    <div className={styles.input}>
      <TextField label='Last name' value={formData.lastName} name='lastName'
        error={Boolean(err['lastName'])} onChange={handleFormChange} />
      <div className={`${err['lastName'] ? styles.err : styles.hide}`}>{err['lastName']}</div>
    </div>
    <div className={styles.input}>
      <TextField type='email' name='email' label='Email' value={formData.email}
        error={Boolean(err['email'])} onChange={handleFormChange} />
      <div className={`${err['email'] ? styles.err : styles.hide}`}>{err['email']}</div>
    </div>
    <div className={styles.input}>
      <TextField type='password' name='password' error={Boolean(err['password'])}
        label='Password' value={formData.password} onChange={handleFormChange} />
        <div className={`${err['password'] ? styles.err : styles.hide}`}>{err['password']}</div>
    </div>
    <div className={styles.input}>
      <TextField label='Phone' value={formData.phone} error={Boolean(err['phone'])} name='phone' onChange={handleFormChange} />
      <div className={`${err['phone'] ? styles.err : styles.hide}`}>{err['phone']}</div>
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
