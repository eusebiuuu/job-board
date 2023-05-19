import styles from './CompanyProfile.module.css'
import logo from '../assets/logo.svg'
import { TextField } from '@mui/material'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editCompany, getCompany } from '../redux/company/companySlice';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import { changeState } from '../redux/candidate/candidateSlice';

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
    // eslint-disable-next-line
  }, []);

  function handleCompanyChange() {
    if (personal) {
      //
    } else {
      dispatch(editCompany(id));
    }
  }

  function handleFieldChange(e) {
    dispatch(changeState, { name: e.target.name, value: e.target.value });
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
            <input type='file' id='file' className={styles.upload} accept='.jpg, .svg, .png, .jpeg' />
          </div>
        </div>
        <div>
          <h3>Personal data</h3>
          <hr />
          <div className={styles.input}>
            <TextField id='outline-basic' label='Name' name='name' value={name} required 
              onChange={handleFieldChange} />
            </div>
          <div className={styles.input}>
            <div>
              <TextField type='email' required disabled label='Email' name='email' value={email} 
                onChange={handleFieldChange} />
            </div>
            <div>
              <button to='/changeEmail' className={styles.change}>
                Change
              </button>
            </div>
          </div>
          <div className={styles.input}>
            <TextField disabled type='password' required label='Password' name='password' value={password} 
              onChange={handleFieldChange} />
            <div>
              <button to='/changeEmail' className={styles.change}>
                Change
              </button>
            </div>
          </div>
          <div className={styles.input}>
            <TextField label='Phone' name='phone' value={phone} onChange={handleFieldChange} />
          </div>
          <div className={styles.input}>
            <TextField label='Headquarter' value={mainHeadquarter} name='mainHeadquarter'
              onChange={handleFieldChange} />
          </div>
        </div>
      </div>
      <div className={styles.save}>
        <button onClick={handleCompanyChange}>Save changes</button>
      </div>
      <div className={styles.aboutUs}>
        <h3>About Us</h3>
        <hr />
        <textarea value={aboutUs} name='aboutUs' onChange={handleFieldChange} cols={100} rows={10} />
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
