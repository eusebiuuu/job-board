import { TextField } from '@mui/material'
import styles from './CompanyRegister.module.css'
import { useState } from 'react'

export default function CompanyRegister(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [headquarter, setHeadquarter] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
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

  function handleHeadquarterChange(event) {
    setHeadquarter(event.target.value);
  }

  function handleSubmitForm(event) {
    event.preventDefault();
  }

  return (<form className={styles.form} onSubmit={handleSubmitForm}>
    <div className={styles.input}><TextField label='Name' value={name} required onChange=  {handleNameChange} /></div>
    <div className={styles.input}><TextField type='email' required label='Email' value={email} onChange={handleEmailChange} /></div>
    <div className={styles.input}><TextField type='password' required label='Password' value={password} onChange=  {handlePasswordChange} /></div>
    <div className={styles.input}><TextField label='Phone' value={phone} onChange= {handlePhoneChange} /></div>
    <div className={styles.input}><TextField label='Headquarter' value={headquarter} onChange= {handleHeadquarterChange} /></div>
    <label htmlFor='file'>
      <div className={styles.msg}>Upload company logo:</div>
    </label>
    <input type='file' id='file' className={styles.upload} accept='image/png, image/jpeg, image/jpg' />
    <div><button type='submit' className={styles.btn}>Register</button></div>
  </form>)
}
