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
      <TextField type='email' name='email' required label='Email' value={formData.email}
        onChange={handleFormChange} />
    </div>
    <div className={styles.input}>
      <TextField type='password' name='password' required label='Password' value={formData.password}
        onChange={handleFormChange} />
      </div>
    <div className={styles.input}>
      <TextField label='Phone' name='phone' value={formData.phone} onChange={handleFormChange} />
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
