import { useEffect } from 'react';
import Chips from '../components/Chips';
import logo from '../assets/logo.svg'
import styles from './CandidateProfile.module.css'
import { TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { changeState, editCandidate, getSingleCandidate } from '../redux/candidate/candidateSlice';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

export default function CandidateProfile() {
  const { id } = useParams();
  const personal = !Boolean(id);
  const { firstName, lastName, email, password, phone, birthday, abilities, 
    aboutMe, experience, education, isLoading } = useSelector(state => state.candidate);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (personal) {
        // get the id
      } else {
        await dispatch(getSingleCandidate(id));
      }
    })();
    // eslint-disable-next-line
  }, []);

  function handleCandidateChange() {
    dispatch(editCandidate(id));
  }
  
  function handleFieldChange(e) {
    dispatch(changeState({ name: e.target.name, value: e.target.value }));
  }

  return (<>
    {isLoading || !firstName
    ? <Loader />
    : <div className={styles.container}>
      <h3>Personal data</h3>
      <hr />
      <div className={styles.personal}>
        <div>
          <img src={logo} alt='Company logo' />
          <div>
            <label htmlFor='file'>
              <div className={styles.msg}>Upload a new profile image</div>
            </label>
            <input type='file' id='file' className={styles.upload} accept='.jpg, .svg, .png, .jpeg' />
          </div>
        </div>
        <div>
          <div className={styles.input}>
            <TextField label='First name' name='firstName' value={firstName} required onChange={handleFieldChange} />
          </div>
          <div className={styles.input}>
            <TextField label='Last name' name='lastName' value={lastName} required onChange={handleFieldChange} />
          </div>
          <div className={styles.input}>
            <div>
              <TextField type='email' name='email' required disabled label='Email' value={email} 
                onChange={handleFieldChange} />
            </div>
            <div>
              <button className={styles.change}>Change</button>
            </div>
          </div>
          <div className={styles.input}>
            <TextField disabled type='password' name='password' required label='Password' value={password}
              onChange={handleFieldChange} />
            <div>
              <button className={styles.change}>Change</button>
            </div>
          </div>
          <div className={styles.input}>
            <TextField label='Phone' name='phone' value={phone} onChange={handleFieldChange} />
          </div>
          <div className={styles.input}>
            <TextField label='Birthday' name='birthday' value={birthday} onChange={handleFieldChange} />
          </div>
        </div>
      </div>
      <div className={styles.save}>
        <button onClick={handleCandidateChange}>Save changes</button>
      </div>
      <div className={styles.text}>
        <h3>About me</h3>
        <hr />
        <textarea value={aboutMe} name='aboutMe' onChange={handleFieldChange} rows={10} />
        <div className={styles.save}>
          <button onClick={handleCandidateChange}>Save changes</button>
        </div>
      </div>
      <div className={styles.text}>
        <h3>Experience</h3>
        <hr />
        <textarea value={experience} name='experience' onChange={handleFieldChange} rows={10} />
        <div className={styles.save}>
          <button onClick={handleCandidateChange}>Save changes</button>
        </div>
      </div>
      <div className={styles.text}>
        <h3>Education</h3>
        <hr />
        <textarea value={education} name='education' onChange={handleFieldChange} rows={10} />
        <div className={styles.save}>
          <button onClick={handleCandidateChange}>Save changes</button>
        </div>
      </div>
      <div className={styles.abilities}>
        <h3>Abilities</h3>
        <hr />
        <Chips placeholder='Ability' name='abilities' value={abilities} onChange={handleFieldChange} />
        <div className={styles.save}>
          <button onClick={handleCandidateChange}>Save changes</button>
        </div>
      </div>
      <div className={styles.delete}>
        <button>Delete account</button>
      </div>
    </div>}
  </>)
}
