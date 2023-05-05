import styles from './Candidates.module.css'
import logo from '../assets/logo.svg'
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidates } from '../redux/candidate/candidateSlice';
import Loader from '../components/Loader';
import { nanoid } from 'nanoid';

export default function Candidates() {
  const { id: jobID } = useParams();
  const dispatch = useDispatch();
  const { candidates, isLoading } = useSelector(state => state.candidate);

  useEffect(() => {
    (async () => {
      await dispatch(getCandidates(jobID));
    })();
  }, []);

  return (<div className={styles.container}>
    {isLoading || !candidates
    ? <Loader />
    : <>{candidates.map(candidate => {
        return <div className={styles.candidate} key={nanoid()}>
          <div className={styles.data}>
            <h2>{candidate.lastName} {candidate.firstName}</h2>
            <h4>Email: {candidate.email}</h4>
            <p>{candidate?.aboutMe?.substring(0, 150) || 'No description'}&hellip;</p>
          </div>
          <div className={styles.image}>
            <img src={logo} alt='Candidate profile' />
          </div>
          <div className={styles.action}>
            <button>
              <Link to={`/candidate/profile/${candidate._id}`}>Profile</Link>
            </button>
            <button>Delete</button>
          </div>
        </div>
      })}</>
    }
  </div>)
}
