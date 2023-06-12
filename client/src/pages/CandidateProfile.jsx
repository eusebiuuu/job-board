import { useEffect, useState } from 'react';
import Chips from '../components/Chips';
import styles from './CandidateProfile.module.css'
import { TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { changeState, deleteCandidate, editCandidate, getSingleCandidate } from '../redux/candidate/candidateSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { useUserContext } from '../context/user';
import customFetch from '../lib/customFetch';
import { toast } from 'react-toastify';
import getAge from '../utils/getAge';
import { nanoid } from 'nanoid';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import Modal from '../components/Modal';

export default function CandidateProfile() {
  const { userID, onLogout, onModalToggle } = useUserContext();
  const { firstName, lastName, email, password, birthday, abilities,
    aboutMe, experience, education, image, phone } = useSelector(state => state.candidate);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [actionType, setActionType] = useState('save');
  const navigate = useNavigate();

  let { id } = useParams();
  let personal = false;
  if (!id) {
    personal = true;
    id = userID;
  }

  useEffect(() => {
    (async () => {
      dispatch(getSingleCandidate(id));
      setIsLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  async function handleCandidateChange() {
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

  async function handleCandidateDelete() {
    setDeleteLoading(true);
    dispatch(deleteCandidate(id));
    setDeleteLoading(false);
    if (userID === '64785efe7961b1b7db8843d6') {
      return;
    }
    await onLogout(false);
    navigate('/');
  }

  function handleButtonClick(val) {
    onModalToggle(true);
    setActionType(val);
  }

  return (<>
    {isLoading
      ? <Loader />
      : <div className={styles.container}>
        <Modal action={actionType === 'delete' ? handleCandidateDelete : handleCandidateChange} />
        <h3>Personal data</h3>
        <hr />
        <div className={styles.personal}>
          <div className={styles.item}>
            <img src={image} alt='Profile' />
            <div className={`${personal ? styles['upload-container'] : 'hide'}`}>
              <label htmlFor='file' className={styles.msg}>
                Upload a new profile image
              </label>
              <input type='file' id='file' name='image' accept='.jpg, .svg, .png, .jpeg'
                className={styles.upload} onChange={handleFileChange} />
            </div>
          </div>
          <div className={styles.item}>
            {personal
              ? <>
                <div className={styles.input}>
                  <TextField label='First name' name='firstName' value={firstName} required
                    onChange={handleFieldChange} />
                </div>
                <div className={styles.input}>
                  <TextField label='Last name' name='lastName' value={lastName} required
                    onChange={handleFieldChange} />
                </div>
                <div className={styles.input}>
                  <TextField label='Email' type='email' value={email} disabled />
                  <div>
                    <button className={styles.change}>
                      <Link to='/change-email'>Change email</Link>
                    </button>
                  </div>
                </div>
                <div className={styles.input}>
                  <TextField label='Password' type='password' value={password} disabled />
                  <div>
                    <button className={styles.change}>
                      <Link to='/change-password'>Change password</Link>
                    </button>
                  </div>
                </div>
                <div>
                  <PhoneInput value={phone} inputClass={styles.phone} containerClass={styles['phone-container']}
                    onChange={(value) => handleFieldChange({ target: { name: 'phone', value } })} />
                </div>
                <div className={styles.input}>
                  <TextField id='birthday' type='date' name='birthday' value={birthday}
                    onChange={handleFieldChange} />
                </div>
              </>
              : <div className={styles.foreign}>
                <div className={styles.field}>First name: {firstName}</div>
                <div className={styles.field}>Last name: {lastName}</div>
                <div className={styles.field}>Email: {email}</div>
                <div className={styles.field}>Phone: {phone}</div>
                <div className={styles.field}>Age: {getAge(birthday) ?? 'Unspecified'}</div>
              </div>
            }
          </div>
        </div>
        <div className={styles.text}>
          <h3>About me</h3>
          <hr />
          {personal
            ? <textarea value={aboutMe} name='aboutMe' onChange={handleFieldChange} rows={10} />
            : <div className={styles.fieldBig}>{aboutMe}</div>
          }
        </div>
        <div className={styles.text}>
          <h3>Experience</h3>
          <hr />
          {personal
            ? <textarea value={experience} name='experience' onChange={handleFieldChange} rows={10} />
            : <div className={styles.fieldBig}>{experience}</div>
          }
        </div>
        <div className={styles.text}>
          <h3>Education</h3>
          <hr />
          {personal
            ? <textarea value={education} name='education' onChange={handleFieldChange} rows={10} />
            : <div className={styles.fieldBig}>{education}</div>
          }
        </div>
        <div className={styles.abilities}>
          <h3>Abilities</h3>
          <hr />
          {personal
            ? <Chips placeholder='Ability' name='abilities' value={abilities} onChange={handleFieldChange} />
            : <ul className={styles.list}>
              {abilities.map(ability => {
                return <li key={nanoid()}>{ability}</li>
              })}
            </ul>
          }
          <div className={`${personal ? styles['btn-container'] : 'hide'}`}>
            <button className={styles.save} onClick={() => handleButtonClick('save')} disabled={saveLoading}>
              {saveLoading
                ? <>Loading...</>
                : <>Save changes</>
              }
            </button>
          </div>
        </div>
        <div className={`${personal ? styles['btn-container'] : 'hide'}`}>
          <button className={styles.delete} onClick={() => handleButtonClick('delete')} disabled={deleteLoading}>
            {deleteLoading
              ? <>Loading...</>
              : <>Delete account</>
            }
          </button>
        </div>
      </div>
    }
  </>)
}
