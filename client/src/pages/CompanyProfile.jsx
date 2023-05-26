import styles from './CompanyProfile.module.css'
import { TextField } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCompany, editCompany } from '../redux/company/companySlice';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { useUserContext } from '../context/user';
import { toast } from 'react-toastify';
import customFetch from '../lib/customFetch';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import Rating from 'react-rating'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const initialState = {
  name: '',
  email: '',
  password: '',
  phone: '',
  mainHeadquarter: '',
  subscriptionExpiration: null,
  logo: '',
  availablePosts: 0,
  aboutUs: '',
  averageRating: 0,
}

export default function CompanyProfile() {
  const dispatch = useDispatch();
  const { userID, onLogout, type } = useUserContext();
  const [company, setCompany] = useState(initialState);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const subscription = company.availablePosts > 0 || company.subscriptionExpiration
    ? (company.availablePosts > 100 ? 'monthly' : 'one-time')
    : 'none';
  const curDate = new Date(Date.now());
  const oneDay = 1000 * 60 * 60 * 24;
  let details = {};

  let expired = false;
  if (subscription === 'monthly' && company.subscriptionExpiration < curDate.getTime()) {
    expired = true;
  }
  if (subscription !== 'none') {
    details = subscription === 'one-time'
      ? {
        posts: company.availablePosts,
        daysLeft: 'Infinite',
      }
      : {
        posts: 'Infinite',
        daysLeft: Math.ceil((company.subscriptionExpiration - curDate.getTime()) / oneDay)
      }
  }

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
      try {
        const resp = await customFetch.get(`/companies/${id}`);
        setCompany({
          ...resp.data.company,
          subscriptionExpiration: new Date(resp.data.company.subscriptionExpiration).getTime(),
        });
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.msg);
      }
      if (type === 'candidate') {
        try {
          const resp = await customFetch.get(`/reviews/${id}`);
          setRating(resp.data.rating);
        } catch (err) {
          console.log(err);
          toast.error(err.response.data.msg);
        }
      }
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
    setCompany(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    });
  }

  function handleCompanyDelete() {
    setDeleteLoading(true);
    dispatch(deleteCompany(id));
    setDeleteLoading(false);
    onLogout();
    navigate('/');
  }

  async function handleReviewChange() {
    setSaveLoading(true);
    try {
      const resp = await customFetch.post(`/reviews/${id}`, { rating });
      toast.success(resp.data.msg);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
    setSaveLoading(false);
  }

  return (<>
    {isLoading
      ? <Loader />
      : <div className={styles.container}>
        {type === 'candidate'
          ? <div className={styles.rating}>
            <Rating fractions={2} className={styles.stars} initialRating={rating} emptySymbol={<AiOutlineStar />} 
              fullSymbol={<AiFillStar />} onChange={(val) => setRating(val)} />
            <button onClick={handleReviewChange}>
              {saveLoading ? 'Loading...' : 'Save'}
            </button>
          </div>
          : null
        }
        <h3>Personal data</h3>
        <hr />
        <div className={styles.personal}>
          <div>
            <img src={company.logo} alt='Company logo' />
            <div className={`${personal ? '' : styles.hide}`}>
              <label htmlFor='file'>
                <div className={styles.msg}>Upload a new company logo</div>
              </label>
              <input type='file' id='file' onChange={handleFileChange} 
                className={styles.upload} accept='.jpg, .svg, .png, .jpeg' />
            </div>
            <div className={styles.average}>{company.averageRating.toFixed(2)}<AiFillStar/></div>
          </div>
          {personal
            ? <div>
              <div className={styles.input}>
                <TextField id='outline-basic' label='Name' name='name' value={company.name} required
                  onChange={handleFieldChange} />
              </div>
              <div className={styles.input}>
                <div>
                  <TextField type='email' required disabled label='Email' name='email' value={company.email}
                    onChange={handleFieldChange} />
                </div>
                <div>
                  <button className={styles.change}>
                    <Link to='/change-email'>Change email</Link>
                  </button>
                </div>
              </div>
              <div className={styles.input}>
                <TextField disabled type='password' required label='Password' name='password' value={company.password}
                  onChange={handleFieldChange} />
                <div>
                  <button className={styles.change}>
                    <Link to='/change-password'>Change password</Link>
                  </button>
                </div>
              </div>
              <div className={styles.phone}>
                <PhoneInput country={'ro'} value={company.phone}
                  onChange={() => handleFieldChange({ target: { name: 'phone', value: company.phone } })} />
              </div>
              <div className={styles.input}>
                <TextField label='Headquarter' value={company.mainHeadquarter} name='mainHeadquarter'
                  onChange={handleFieldChange} />
              </div>
            </div>
            : <div>
              <div className={styles.field}>Company name: {company.name}</div>
              <div className={styles.field}>Email: {company.email}</div>
              <div className={styles.field}>Phone: {company.phone}</div>
              <div className={styles.field}>Main headquarter: {company.mainHeadquarter}</div>
            </div>
          }
        </div>
        <div className={styles.aboutUs}>
          <h3>About Us</h3>
          <hr />
          {personal
            ? <textarea value={company.aboutUs} name='aboutUs' onChange={handleFieldChange} cols={100} rows={10} />
            : <div>{company.aboutUs}</div>
          }
        </div>
        <div className={`${personal ? '' : styles.hide}`}>
          <h3>Subscription details</h3>
          <hr />
          {expired || subscription === 'none'
            ? <div className={styles.subsMsg}>
              {expired ? 'Your subscription has expired' : 'No subscription purchased'}
            </div>
            : <div className={styles.subscription}>
              <div className={styles.part}>
                <div>Posts remaining:</div>
                <div>Subscription days left:</div>
                <div>Subscription type:</div>
              </div>
              <div className={styles.part}>
                <div>{details.posts}</div>
                <div>{details.daysLeft}</div>
                <div>{subscription}</div>
              </div>
            </div>
          }
          <div className={`${styles.msg} ${personal ? '' : styles.hide}`}>
            <h2>
              You can always view, change or update your subscription
              <Link to='/company/checkout'>here</Link>.
            </h2>
          </div>
        </div>
        <div className={`${personal ? '' : styles.hide}`}>
          <button onClick={handleCompanyChange} disabled={saveLoading}>
            {saveLoading
              ? <>Loading...</>
              : <>Save changes</>
            }
          </button>
        </div>
        <div className={`${styles.delete} ${personal ? '' : styles.hide}`}
          onClick={handleCompanyDelete} disabled={deleteLoading}>
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
