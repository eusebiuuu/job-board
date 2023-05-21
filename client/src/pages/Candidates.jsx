import styles from './Candidates.module.css'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import customFetch from '../lib/customFetch';

export default function Candidates() {
  const { id: jobID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [candidates, setCandidates] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await customFetch.get(`/jobs/candidates/${jobID}`);
        setCandidates(response.data.candidates);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast.error(err.response.data.msg);
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

  return (<div className={styles.container}>
    {isLoading
      ? <Loader />
      : <>{candidates.length === 0
        ? <h1>No candidates found...</h1>
        : <>{candidates.map(candidate => {
          return <div className={styles.candidate} key={nanoid()}>
            <div className={styles.data}>
              <h2>{candidate.firstName} {candidate.lastName}</h2>
              <h4>Email: {candidate.email}</h4>
              <p>{candidate?.aboutMe?.substring(0, 150) || 'No description'}&hellip;</p>
            </div>
            <div className={styles.image}>
              <img src={candidate.image} alt='Candidate profile' />
            </div>
            <div className={styles.action}>
              <button>
                <Link to={`/candidate/profile/${candidate._id}`}>Profile</Link>
              </button>
              <button onClick={() => handleCandidateDelete(candidate._id)} disabled={deleteLoading}>
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
