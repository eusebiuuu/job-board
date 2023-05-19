import { TextField } from '@mui/material'
import styles from './CandidateRegister.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerCandidate } from '../redux/candidate/candidateSlice';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
}

export default function CandidateRegister(props) {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function handleFormChange(e) {
    setFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    dispatch(registerCandidate(formData));
    setFormData(initialState);
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
      <button type='submit' className={styles.btn}>Register</button>
    </div>
  </form>)
}
