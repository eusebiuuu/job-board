import { TextField } from '@mui/material'
import styles from './CandidateRegister.module.css'
import { useState } from 'react'

export default function CandidateRegister(props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  function handleFullNameChange(event) {
    setFullName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    // set to initial values
  }

  return (<form className={styles.form} onSubmit={handleSubmitForm}>
    <div className={styles.input}>
      <TextField label='Full name' value={fullName} required onChange=  {handleFullNameChange} />
    </div>
    <div className={styles.input}>
      <TextField type='email' required label='Email' value={email} onChange={handleEmailChange} />
    </div>
    <div className={styles.input}>
      <TextField type='password' required label='Password' value={password} onChange={handlePasswordChange} />
    </div>
    <div className={styles.input}>
      <TextField label='Phone' value={phone} onChange={handlePhoneChange} />
    </div>
    <label htmlFor='file'>
      <div className={styles.msg}>Upload profile image:</div>
    </label>
    <input type='file' id='file' className={styles.upload} accept='image/png, image/jpeg, image/jpg' />
    <div>
      <button type='submit' className={styles.btn}>Register</button>
    </div>
  </form>)
}
