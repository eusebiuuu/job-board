import { toast } from 'react-toastify';
import CandidateRegister from '../components/CandidateRegister';
import CompanyRegister from '../components/CompanyRegister';
import { useUserContext } from '../context/user';
import styles from './Register.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [candidate, setCandidate] = useState(false);
  const { type } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (type) {
      toast.warning('You must be logged out in order to register');
      navigate('/');
    }
  }, []);

  function handleCandidateChange(val) {
    setCandidate(val);
  }

  return (<div className={styles.container}>
    <h2>Register to our platform</h2>
    <div className={styles.btns}>
      <button className={candidate ? styles.default : styles.active}
        onClick={() => handleCandidateChange(false)}>Company</button>
      <button className={candidate ? styles.active : styles.default}
        onClick={() => handleCandidateChange(true)}>Candidate</button>
    </div>
    {candidate ? <CandidateRegister /> : <CompanyRegister />}
  </div>)
}
