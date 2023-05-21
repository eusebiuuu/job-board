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

export default function CandidateRegister(props) {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleFormChange(e) {
    setFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
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
      <TextField label='First name' value={formData.firstName} name='firstName' required onChange={handleFormChange} />
    </div>
    <div className={styles.input}>
      <TextField label='Last name' value={formData.lastName} name='lastName' required onChange={handleFormChange} />
    </div>
    <div className={styles.input}>
      <TextField type='email' name='email' required label='Email' value={formData.email} onChange={handleFormChange} />
    </div>
    <div className={styles.input}>
      <TextField type='password' name='password' required label='Password' value={formData.password}
        onChange={handleFormChange} />
    </div>
    <div className={styles.input}>
      <TextField label='Phone' value={formData.phone} name='phone' onChange={handleFormChange} />
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
