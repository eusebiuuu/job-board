import CandidateRegister from '../components/CandidateRegister';
import CompanyRegister from '../components/CompanyRegister';
import styles from './Register.module.css'
import { useState } from 'react'

export default function Register(props) {
  const [candidate, setCandidate] = useState(false);

  function handleCandidateChange(val) {
    setCandidate(val);
  }

  return (<div className={styles.container}>
    <h2>Register to our platform</h2>
    <div className={styles.btns}>
      <button className={candidate ? '' : styles.active} onClick={() => handleCandidateChange(false)}>Company</button>
      <button className={candidate ? styles.active : ''} onClick={() => handleCandidateChange(true)}>Candidate</button>
    </div>
    {candidate
    ? <CandidateRegister />
    : <CompanyRegister />}
  </div>)
}
