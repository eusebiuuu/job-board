import { useState } from 'react';
import Chips from '../components/Chips';
import logo from '../assets/logo.svg'
import styles from './CandidateProfile.module.css'
import { TextField } from '@mui/material';

export default function CandidateProfile(props) {
  const [firstName, setFirstName] = useState('frgrtv');
  const [lastName, setLastName] = useState('frgrtv');
  const [email, setEmail] = useState('ferfv');
  const [password, setPassword] = useState('frewwfe');
  const [phone, setPhone] = useState('fwerefref');
  const [birthday, setBirthday] = useState('fwerefref');
  const [abilities, setAbilities] = useState([]);
  const [aboutMe, setAboutMe] = useState('Ante justo, vitae fermentum varius risus curabitur. Orci nisi, arcu vestibulum ultrices suspendisse gravida egestas. At amet turpis velit et malesuada sit duis nunc. Mauris vestibulum, eget sit mauris mollis dolor eget. Interdum netus eget nullam sem id purus. Ornare ornare tellus sed blandit dolor. Quis at tristique integer urna dignissim elit purus lectus sagittis. Porttitor lacus, ut morbi diam et mauris, quam. At malesuada tristique amet egestas dapibus nec purus amet. Diam nec cum penatibus tellus elementum egestas consectetur. Suspendisse et quam lorem morbi facilisi ante at proin diam. Quis pellentesque quam nec, viverra. Tempus, elementum interdum nunc pulvinar dui.');
  const [experience, setExperience] = useState('Ante justo, vitae fermentum varius risus curabitur. Orci nisi, arcu vestibulum ultrices suspendisse gravida egestas. At amet turpis velit et malesuada sit duis nunc. Mauris vestibulum, eget sit mauris mollis dolor eget. Interdum netus eget nullam sem id purus. Ornare ornare tellus sed blandit dolor. Quis at tristique integer urna dignissim elit purus lectus sagittis. Porttitor lacus, ut morbi diam et mauris, quam. At malesuada tristique amet egestas dapibus nec purus amet. Diam nec cum penatibus tellus elementum egestas consectetur. Suspendisse et quam lorem morbi facilisi ante at proin diam. Quis pellentesque quam nec, viverra. Tempus, elementum interdum nunc pulvinar dui.');
  const [education, setEducation] = useState('Ante justo, vitae fermentum varius risus curabitur. Orci nisi, arcu vestibulum ultrices suspendisse gravida egestas. At amet turpis velit et malesuada sit duis nunc. Mauris vestibulum, eget sit mauris mollis dolor eget. Interdum netus eget nullam sem id purus. Ornare ornare tellus sed blandit dolor. Quis at tristique integer urna dignissim elit purus lectus sagittis. Porttitor lacus, ut morbi diam et mauris, quam. At malesuada tristique amet egestas dapibus nec purus amet. Diam nec cum penatibus tellus elementum egestas consectetur. Suspendisse et quam lorem morbi facilisi ante at proin diam. Quis pellentesque quam nec, viverra. Tempus, elementum interdum nunc pulvinar dui.');

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
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

  function handleBirthdayChange(event) {
    setBirthday(event.target.value);
  }

  function handleAboutMeChange(event) {
    setAboutMe(event.target.value);
  }

  function handleExperienceChange(event) {
    setExperience(event.target.value);
  }

  function handleEducationChange(event) {
    setEducation(event.target.value);
  }

  return (<div className={styles.container}>
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
        <div className={styles.input}><TextField label='First name' value={firstName} required onChange={handleFirstNameChange} /></div>
        <div className={styles.input}><TextField label='Last name' value={lastName} required onChange={handleLastNameChange} /></div>
        <div className={styles.input}>
          <div>
            <TextField type='email' required disabled label='Email' value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <button to='/changeEmail' className={styles.change}>
              Change
            </button>
          </div>
        </div>
        <div className={styles.input}>
          <TextField disabled type='password' required label='Password' value={password} onChange={handlePasswordChange} />
          <div>
            <button to='/changeEmail' className={styles.change}>
              Change
            </button>
          </div>
        </div>
        <div className={styles.input}>
          <TextField label='Phone' value={phone} onChange={handlePhoneChange} />
        </div>
        <div className={styles.input}>
          <TextField label='Birthday' value={birthday} onChange={handleBirthdayChange} />
        </div>
      </div>
    </div>
    <div className={styles.save}>
      <button>Save changes</button>
    </div>
    <div className={styles.text}>
      <h3>About me</h3>
      <hr />
      <textarea value={aboutMe} onChange={handleAboutMeChange} rows={10} />
      <div className={styles.save}>
        <button>Save changes</button>
      </div>
    </div>
    <div className={styles.text}>
      <h3>Experience</h3>
      <hr />
      <textarea value={experience} onChange={handleExperienceChange} rows={10} />
      <div className={styles.save}>
        <button>Save changes</button>
      </div>
    </div>
    <div className={styles.text}>
      <h3>Education</h3>
      <hr />
      <textarea value={education} onChange={handleEducationChange} rows={10} />
      <div className={styles.save}>
        <button>Save changes</button>
      </div>
    </div>
    <div className={styles.abilities}>
      <h3>Abilities</h3>
      <hr />
      <Chips placeholder='Ability' value={abilities} onChange={setAbilities} />
      <div className={styles.save}>
        <button>Save changes</button>
      </div>
    </div>
    <div className={styles.delete}>
      <button>Delete account</button>
    </div>
  </div>)
}
