import styles from './CompanyProfile.module.css'
import { TextField } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCompany, editCompany, getCompany } from '../redux/company/companySlice';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { changeState } from '../redux/candidate/candidateSlice';
import { useUserContext } from '../context/user';
import { toast } from 'react-toastify';
import customFetch from '../lib/customFetch';

export default function CompanyProfile() {
  const dispatch = useDispatch();
  const { userID, onLogout, type } = useUserContext();
  const { name, email, password, phone, mainHeadquarter, aboutUs, logo,
    subscriptionExpiration, availablePosts } = useSelector(state => state.company);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const navigate = useNavigate();
  const monthlySubscription = availablePosts > 100;

  let { id } = useParams();
  let personal = false;
  if (!id) {
    if (type !== 'company') {
      toast.error('You are not allowed to access this route');
      onLogout();
      navigate('/');
    }
    personal = true;
    id = userID;
  }

  useEffect(() => {
    (async () => {
      dispatch(getCompany(id));
    })();
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  async function handleCompanyChange() {
    setSaveLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        await customFetch.post('/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // console.log(result);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.msg);
      }
    }
    dispatch(editCompany(id));
    setSaveLoading(false);
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleFieldChange(e) {
    dispatch(changeState({ name: e.target.name, value: e.target.value }));
  }

  function handleCompanyDelete() {
    setDeleteLoading(true);
    dispatch(deleteCompany(id));
    setDeleteLoading(false);
    onLogout();
    navigate('/');
  }

  return (<>
  {isLoading
  ? <Loader />
  : <div className={styles.container}>
      <h3>Personal data</h3>
      <hr />
      <div className={styles.personal}>
        <div>
          <img src={logo} alt='Company logo' />
          <div>
            <label htmlFor='file'>
              <div className={styles.msg}>Upload a new company logo</div>
            </label>
            <input type='file' id='file' onChange={handleFileChange} className={styles.upload} accept='.jpg, .svg, .png, .jpeg' />
          </div>
        </div>
        <div>
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
                Change email
              </button>
            </div>
          </div>
          <div className={styles.input}>
            <TextField disabled type='password' required label='Password' name='password' value={password} 
              onChange={handleFieldChange} />
            <div>
              <button to='/changePassword' className={styles.change}>
                Change password
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
      <div className={styles.aboutUs}>
        <h3>About Us</h3>
        <hr />
        <textarea value={aboutUs} name='aboutUs' onChange={handleFieldChange} cols={100} rows={10} />
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
            <div>{monthlySubscription ? 'infinite' : availablePosts}</div>
            <div>{monthlySubscription ? subscriptionExpiration : 'infinite'}</div>
            <div>{monthlySubscription ? 'Monthly subscription' : 'Individual pay'}</div>
          </div>
        </div>
        <div className={styles.msg}>
          <h2>
            You can always change or update your subscription
            <Link to='/company/checkout'>here</Link>.
          </h2>
        </div>
      </div>
      <div>
        <button onClick={handleCompanyChange} disabled={saveLoading}>
          {saveLoading
            ? <>Loading...</>
            : <>Save changes</>
          }
        </button>
      </div>
      <div className={styles.delete} onClick={handleCompanyDelete} disabled={deleteLoading}>
        <button>
          {deleteLoading
            ? <>Loading...</>
            : <>Delete account</>
          }
        </button>
      </div>
    </div>
  }
  </>);
}
