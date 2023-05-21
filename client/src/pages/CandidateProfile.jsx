import { useEffect, useState } from 'react';
import Chips from '../components/Chips';
import styles from './CandidateProfile.module.css'
import { TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { changeState, deleteCandidate, editCandidate, getSingleCandidate } from '../redux/candidate/candidateSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { useUserContext } from '../context/user';
import customFetch from '../lib/customFetch';
import { toast } from 'react-toastify';

export default function CandidateProfile() {
  const { userID, onLogout, type } = useUserContext();
  const { firstName, lastName, email, password, phone, birthday, abilities, 
    aboutMe, experience, education, image } = useSelector(state => state.candidate);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  let { id } = useParams();
  let personal = false;
  if (!id) {
    if (type !== 'candidate') {
      toast.error('You are not allowed to access this route');
      onLogout();
      navigate('/');
    }
    personal = true;
    id = userID;
  }

  useEffect(() => {
    (async () => {
      dispatch(getSingleCandidate(id));
    })();
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  async function handleCandidateChange() {
    setSaveLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const result = await customFetch.post('/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(result);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.msg);
      }
    }
    dispatch(editCandidate(id));
    setSaveLoading(false);
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  
  function handleFieldChange(e) {
    dispatch(changeState({ name: e.target.name, value: e.target.value }));
  }

  function handleCandidateDelete() {
    setDeleteLoading(true);
    dispatch(deleteCandidate(id));
    setDeleteLoading(false);
    onLogout(false);
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
          <img src={image} alt='Profile' />
          <div>
            <label htmlFor='file'>
              <div className={styles.msg}>Upload a new profile image</div>
            </label>
            <input type='file' id='file' className={styles.upload} name='image'
              onChange={handleFileChange} accept='.jpg, .svg, .png, .jpeg' />
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
      <div className={styles.text}>
        <h3>About me</h3>
        <hr />
        <textarea value={aboutMe} name='aboutMe' onChange={handleFieldChange} rows={10} />
      </div>
      <div className={styles.text}>
        <h3>Experience</h3>
        <hr />
        <textarea value={experience} name='experience' onChange={handleFieldChange} rows={10} />
      </div>
      <div className={styles.text}>
        <h3>Education</h3>
        <hr />
        <textarea value={education} name='education' onChange={handleFieldChange} rows={10} />
      </div>
      <div className={styles.abilities}>
        <h3>Abilities</h3>
        <hr />
        <Chips placeholder='Ability' name='abilities' value={abilities} onChange={handleFieldChange} />
        <div className={styles.save}>
          <button onClick={handleCandidateChange} disabled={saveLoading}>
            {saveLoading
              ? <>Loading...</>
              : <>Save changes</>
            }
          </button>
        </div>
      </div>
      <div className={styles.delete}>
        <button onClick={handleCandidateDelete} disabled={deleteLoading}>
          {deleteLoading
            ? <>Loading...</>
            : <>Delete account</>
          }
        </button>
      </div>
    </div>}
  </>)
}
