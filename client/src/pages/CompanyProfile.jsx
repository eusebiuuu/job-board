import styles from './CompanyProfile.module.css'
import logo from '../assets/logo.svg'
import { TextField } from '@mui/material'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeAboutUs, changeEmail, changeMainHeadquarter, changeName, changePassword, changePhone, editCompany, getCompany } from '../redux/company/companySlice';
import { useEffect } from 'react';
import Loader from '../components/Loader';

export default function CompanyProfile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const personal = !Boolean(id);
  const { name, email, password, phone, mainHeadquarter, aboutUs, isLoading } = useSelector(state => state.company);

  useEffect(() => {
    if (personal) {
      //
    } else {
      dispatch(getCompany(id));
    }
  }, []);

  function handleCompanyChange() {
    if (personal) {
      //
    } else {
      dispatch(editCompany(id));
    }
  }

  return (<>
  {isLoading || !name
  ? <Loader />
  : <div className={styles.container}>
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
          <div className={styles.input}>
            <TextField id='outline-basic' label='Name' value={name} required 
              onChange={e => dispatch(changeName(e.target.value))} />
            </div>
          <div className={styles.input}>
            <div>
              <TextField type='email' required disabled label='Email' value={email} 
                onChange={e => dispatch(changeEmail(e.target.value))} />
            </div>
            <div>
              <button to='/changeEmail' className={styles.change}>
                Change
              </button>
            </div>
          </div>
          <div className={styles.input}>
            <TextField disabled type='password' required label='Password' value={password} 
              onChange={e => dispatch(changePassword(e.target.value))} />
            <div>
              <button to='/changeEmail' className={styles.change}>
                Change
              </button>
            </div>
          </div>
          <div className={styles.input}>
            <TextField label='Phone' value={phone} onChange={e => dispatch(changePhone(e.target.value))} />
          </div>
          <div className={styles.input}>
            <TextField label='Headquarter' value={mainHeadquarter} 
              onChange={e => dispatch(changeMainHeadquarter(e.target.value))} />
          </div>
        </div>
      </div>
      <div className={styles.save}>
        <button onClick={handleCompanyChange}>Save changes</button>
      </div>
      <div className={styles.aboutUs}>
        <h3>About Us</h3>
        <hr />
        <textarea value={aboutUs} onChange={e => dispatch(changeAboutUs(e.target.value))} cols={100} rows={10} />
        <div className={styles.save}>
          <button onClick={handleCompanyChange}>Save changes</button>
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
    </div>
  }
  </>);
}
