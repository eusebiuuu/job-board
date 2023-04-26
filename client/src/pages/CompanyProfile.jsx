import styles from './CompanyProfile.module.css'
import logo from '../assets/logo.svg'
import { TextField } from '@mui/material'
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CompanyProfile(props) {
  const [name, setName] = useState('frgrtv');
  const [email, setEmail] = useState('ferfv');
  const [password, setPassword] = useState('frewwfe');
  const [phone, setPhone] = useState('fwerefref');
  const [headquarter, setHeadquarter] = useState('wdedref');
  const [aboutUs, setAboutUs] = useState('Ante justo, vitae fermentum varius risus curabitur. Orci nisi, arcu vestibulum ultrices suspendisse gravida egestas. At amet turpis velit et malesuada sit duis nunc. Mauris vestibulum, eget sit mauris mollis dolor eget. Interdum netus eget nullam sem id purus. Ornare ornare tellus sed blandit dolor. Quis at tristique integer urna dignissim elit purus lectus sagittis. Porttitor lacus, ut morbi diam et mauris, quam. At malesuada tristique amet egestas dapibus nec purus amet. Diam nec cum penatibus tellus elementum egestas consectetur. Suspendisse et quam lorem morbi facilisi ante at proin diam. Quis pellentesque quam nec, viverra. Tempus, elementum interdum nunc pulvinar dui.')

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

  function handleAboutUsChange(event) {
    setAboutUs(event.target.value);
  }

  return (<div className={styles.container}>
    <div className={styles.personal}>
      <div>
        <img src={logo} alt='Company logo' />
        <div>
          <label htmlFor='file'>
            <div className={styles.msg}>Upload a new company logo</div>
          </label>
          <input type='file' id='file' className={styles.upload} accept='image/png, image/jpeg, image/jpg' />
        </div>
      </div>
      <div>
        <h3>Personal data</h3>
        <hr />
        <div className={styles.input}><TextField id='outline-basic' label='Name' value={name} required onChange={handleNameChange} /></div>
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
        <div className={styles.input}><TextField label='Phone' value={phone} onChange={handlePhoneChange} /></div>
        <div className={styles.input}><TextField label='Headquarter' value={headquarter} onChange={handleHeadquarterChange} /></div>
      </div>
    </div>
    <div className={styles.save}>
      <button>Save changes</button>
    </div>
    <div className={styles.aboutUs}>
      <h3>About Us</h3>
      <hr />
      <textarea value={aboutUs} onChange={handleAboutUsChange} cols={100} rows={10} />
      <div className={styles.save}>
        <button>Save changes</button>
      </div>
    </div>
    <div>
      <h3>Subscription details</h3>
      <hr />
      <div className={styles.subscription}>
        <div className={styles.part}>
          <div>Posts remaining:</div>
          <div>Subscription days left:</div>
          <div>Subscription type:</div>
        </div>
        <div className={styles.part}>
          <div>20 / infinite</div>
          <div>30 / infinite</div>
          <div>subscription name</div>
        </div>
      </div>
      <div className={styles.msg}>
        <h2>
          You can always change or update your subscription
          <Link to='/company/checkout'>here</Link>.
        </h2>
      </div>
    </div>
    <div className={styles.delete}>
      <button>Delete account</button>
    </div>
  </div>)
}
