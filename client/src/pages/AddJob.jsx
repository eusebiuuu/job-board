import styles from './AddJob.module.css'
import { nanoid } from 'nanoid';
import Chips from '../components/Chips';
import { allJobTypes, allExperiences, allLocations } from '../utils/filters'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import customFetch from '../lib/customFetch';
import { toast } from 'react-toastify';
import { useUserContext } from '../context/user';
import Modal from '../components/Modal';

const initialState = {
  title: '',
  description: '',
  benefits: [],
  experience: 'no experience',
  location: 'office',
  cities: [],
  jobTypes: ['full-time'],
  minSalary: '',
  requirements: '',
  image: '',
  companyID: '',
}

export default function AddJob() {
  const navigate = useNavigate();
  const { id: jobID } = useParams();
  const jobCreation = !Boolean(jobID);
  const [jobInfo, setJobInfo] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { onModalToggle } = useUserContext();

  function handleJobInfoChange(e) {
    const field = e.target.name, val = e.target.value;
    setJobInfo(prev => {
      if (['cities', 'benefits'].includes(field)) {
        return {
          ...prev,
          [field]: val.map(elem => {
            return elem.toLowerCase();
          })
        }
      } else if (field === 'jobTypes') {
        const idx = jobInfo.jobTypes.indexOf(val);
        if (idx === -1) {
          return {
            ...prev,
            jobTypes: [...prev.jobTypes, val]
          }
        } else {
          return {
            ...prev,
            jobTypes: prev.jobTypes.filter((elem, curIdx) => {
              if (idx === curIdx) {
                return null;
              }
              return elem;
            })
          }
        }
      } else {
        return {
          ...prev,
          [field]: val,
        }
      }
    })
  }

  useEffect(() => {
    if (!jobCreation) {
      (async () => {
        try {
          const resp = await customFetch.get(`/jobs/${jobID}`);
          setJobInfo(prev => {
            return {
              ...prev,
              ...resp.data.job,
              companyID: resp.data.job.companyID._id,
            }
          });
          setLoading(false);
        } catch (err) {
          setLoading(false);
          navigate('/jobs');
          toast.error(err.response.data.msg);
        }
      })();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  async function submitJob() {
    if (jobInfo.title === '') {
      toast.error('Title field must not be empty');
      return;
    }
    if (jobInfo.description === '') {
      toast.error('Description field must not be empty');
      return;
    }
    if (jobInfo.requirements === '') {
      toast.error('Requirements field must not be empty');
      return;
    }
    setSubmitLoading(true);
    if (jobCreation) {
      try {
        const resp = await customFetch.post('/jobs', { job: jobInfo });
        toast.success(resp.data.msg);
        setSubmitLoading(false);
        navigate(`/jobs/${resp.data.job._id}`);
      } catch (err) {
        setSubmitLoading(false);
        console.log(err);
        toast.error(err.response.data.msg);
      }
    } else {
      try {
        const resp = await customFetch.patch(`/jobs/${jobID}`, { job: jobInfo });
        toast.success(resp.data.msg);
        setSubmitLoading(false);
        navigate(`/jobs/${jobID}`);
      } catch (err) {
        setSubmitLoading(false);
        console.log(err);
        toast.error(err.response.data.msg);
      }
    }
  }

  return (<>
    {loading
      ? <Loader />
      : <div className={styles.form}>
        <Modal action={submitJob} />
        <label className={styles.content}>
          <div>
            <h3>Job title</h3>
          </div>
          <div>
            <input value={jobInfo.title} required name='title' placeholder='Job title' onChange={handleJobInfoChange} />
          </div>
        </label>
        <div className={styles.content}>
          <div><h3>Job type</h3></div>
          <div className={styles.list}>
            {allJobTypes.map((type, idx) => {
              const classNames = jobInfo.jobTypes.indexOf(type) === -1 ? styles.btn : styles.active;
              return <button key={nanoid()} name='jobTypes' value={type} id={`type${idx}`} className={classNames}
                onClick={handleJobInfoChange}>{type}</button>
            })}
          </div>
        </div>
        <label className={styles.content}>
          <div><h3>Location</h3></div>
          <div className={styles.singleList}>
            <select value={jobInfo.location} data-testid='location' name='location' onChange={handleJobInfoChange}>
              {allLocations.map(loc => {
                return <option key={loc} value={loc}>{loc}</option>
              })}
            </select>
          </div>
        </label>
        <div className={styles.content}>
          <div><h3>Cities</h3></div>
          <Chips placeholder='City' name='cities' onChange={handleJobInfoChange} value={jobInfo.cities} />
        </div>
        <div className={styles.content}>
          <div><h3>Minimum salary ($)</h3></div>
          <div><input value={jobInfo.minSalary} type='number' name='minSalary' step={100}
          placeholder='Min salary' onChange={handleJobInfoChange} /></div>
        </div>
        <div className={styles.content}>
          <div><h3>Experience</h3></div>
          <div className={styles.singleList}>
            <select value={jobInfo.experience} name='experience' onChange={handleJobInfoChange}>
              {allExperiences.map(exp => {
                return <option key={exp} value={exp}>{exp}</option>
              })}
            </select>
          </div>
        </div>
        <div className={styles.content}>
          <div><h3>Benefits</h3></div>
          <div>
            <Chips placeholder='Benefit' name='benefits' onChange={handleJobInfoChange} value={jobInfo.benefits} />
          </div>
        </div>
        <label>
          <h3>Requirements</h3>
          <hr />
          <textarea required spellCheck='false' onChange={handleJobInfoChange} value={jobInfo.requirements} name='requirements' rows={10} />
        </label>
        <label>
          <h3>Description</h3>
          <hr />
          <textarea required spellCheck='false' onChange={handleJobInfoChange} value={jobInfo.description} name='description' rows={10} />
        </label>
        <div className={styles.specialBtn}>
          {submitLoading
            ? <Loader />
            : <button type='submit' onClick={() => onModalToggle(true)}>
              {jobCreation ? 'Add job' : 'Edit job'}
            </button>
          }
        </div>
      </div>
    }</>);
}
