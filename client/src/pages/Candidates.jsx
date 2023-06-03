import styles from './Candidates.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import customFetch from '../lib/customFetch';
import Modal from '../components/Modal';
import { useUserContext } from '../context/user';

export default function Candidates() {
  const { id: jobID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [candidates, setCandidates] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [candID, setCandID] = useState(null);
  const navigate = useNavigate();
  const { onModalToggle, onLogout } = useUserContext();

  useEffect(() => {
    (async () => {
      try {
        const response = await customFetch.get(`/jobs/candidates/${jobID}`);
        setCandidates(response.data.candidates);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.msg);
        if (err.response.status === 403) {
          toast.error('Logging out...');
          await onLogout();
        }
        navigate('/');
      }
    })();
    // eslint-disable-next-line
  }, [refreshTrigger]);

  async function handleCandidateDelete(candidateID) {
    setDeleteLoading(candidateID);
    try {
      const resp = await customFetch.patch(`/applications/${jobID}/${candidateID}`);
      setDeleteLoading(null);
      toast.success(resp.data.msg);
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      toast.error(err.response.data.msg);
      setDeleteLoading(null);
    }
  }

  function handleButtonClick(ID) {
    onModalToggle(true);
    setCandID(ID);
  }

  return (<div className={styles.container}>
    {isLoading
      ? <Loader />
      : <>
        <Modal action={() => handleCandidateDelete(candID)} />
        {candidates.length === 0
          ? <h1>No candidates found...</h1>
          : <>
            <h2>Candidates</h2>
            {candidates.map(candidate => {
              return <div className={styles.candidate} key={nanoid()}>
                <div className={styles.data}>
                  <h2>{candidate.firstName} {candidate.lastName}</h2>
                  <div className={styles.email}>Email: {candidate.email}</div>
                  <p>{candidate?.aboutMe?.substring(0, 200) || 'No description'}&hellip;</p>
                </div>
                <div className={styles.image}>
                  <img src={candidate.image} alt='Candidate profile' />
                </div>
                <div className={styles.action}>
                  <button className={styles.btn1}>
                    <Link to={`/candidate/profile/${candidate._id}`}>Profile</Link>
                  </button>
                  <button className={styles.btn2} onClick={() => handleButtonClick(candidate._id)}
                    disabled={deleteLoading}>
                    {deleteLoading === candidate._id
                      ? <>Loading...</>
                      : <>Delete</>
                    }
                  </button>
                </div>
              </div>
            })}</>
        }</>
    }
  </div>)
}
