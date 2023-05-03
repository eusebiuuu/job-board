import { useEffect } from 'react';
import Chips from '../components/Chips';
import logo from '../assets/logo.svg'
import styles from './CandidateProfile.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeAbilities, changeAboutMe, changeBirthday, changeEducation, changeEmail, changeExperience, changeFirstName, changeLastName, changePassword, changePhone, editCandidate, getSingleCandidate } from '../redux/candidate/candidateSlice';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

export default function CandidateProfile() {
  const { id } = useParams();
  const personal = !Boolean(id);
  const { firstName, lastName, email, password, phone, birthday, abilities, 
    aboutMe, experience, education, image } = useSelector(state => state.candidate);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (personal) {
        // get the id
      } else {
        await dispatch(getSingleCandidate(id));
      }
    })();
  }, []);

  function handleCandidateChange() {
    dispatch(editCandidate(id));
  }

  return (<>
    {!firstName
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
            <input type='file' id='file' className={styles.upload} accept='image/png, image/jpeg, image/jpg' />
          </div>
        </div>
        <div>
          <div className={styles.input}>
            <input placeholder='First name' value={firstName} required 
              onChange={(e) => dispatch(changeFirstName(e.target.value))} />
          </div>
          <div className={styles.input}>
            <input placeholder='Last name' value={lastName} required 
              onChange={(e) => dispatch(changeLastName(e.target.value))} />
          </div>
          <div className={styles.input}>
            <div>
              <input type='email' required disabled label='Email' value={email} 
                onChange={(e) => dispatch(changeEmail(e.target.value))} />
            </div>
            <div>
              <button className={styles.change}>
                Change
              </button>
            </div>
          </div>
          <div className={styles.input}>
            <input disabled type='password' required placeholder='Password' value={password}
              onChange={(e) => dispatch(changePassword(e.target.value))} />
            <div>
              <button className={styles.change}>
                Change
              </button>
            </div>
          </div>
          <div className={styles.input}>
            <input placeholder='Phone' value={phone} onChange={(e) => dispatch(changePhone(e.target.value))} />
          </div>
          <div className={styles.input}>
            <input placeholder='Birthday' value={birthday} onChange={(e) => dispatch(changeBirthday(e.target.value))} />
          </div>
        </div>
      </div>
      <div className={styles.save}>
        <button onClick={handleCandidateChange}>Save changes</button>
      </div>
      <div className={styles.text}>
        <h3>About me</h3>
        <hr />
        <textarea value={aboutMe} onChange={e => dispatch(changeAboutMe(e.target.value))} rows={10} />
        <div className={styles.save}>
          <button onClick={handleCandidateChange}>Save changes</button>
        </div>
      </div>
      <div className={styles.text}>
        <h3>Experience</h3>
        <hr />
        <textarea value={experience} onChange={e => dispatch(changeExperience(e.target.value))} rows={10} />
        <div className={styles.save}>
          <button onClick={handleCandidateChange}>Save changes</button>
        </div>
      </div>
      <div className={styles.text}>
        <h3>Education</h3>
        <hr />
        <textarea value={education} onChange={e => dispatch(changeEducation(e.target.value))} rows={10} />
        <div className={styles.save}>
          <button onClick={handleCandidateChange}>Save changes</button>
        </div>
      </div>
      <div className={styles.abilities}>
        <h3>Abilities</h3>
        <hr />
        <Chips placeholder='Ability' value={abilities} withRedux onChange={changeAbilities} />
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
