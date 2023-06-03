import { Link } from 'react-router-dom'
import styles from './VerifyEmail.module.css'
import { useEffect, useState } from 'react';
import customFetch from '../lib/customFetch';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import queryString from 'query-string';

export default function VerifyEmail() {
  const queries = queryString.parse(window.location.search);
  const { token: verificationToken, email, type } = queries;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await customFetch.post('/auth/verifyEmail', { verificationToken, email, type });
        toast.success(response.data.msg);
        setIsLoading(false);
      } catch (err) {
        toast.error(err.response.data.msg);
        setIsLoading(false);
      }
    })();
  }, [email, type, verificationToken]);

  return <>
    {isLoading
      ? <Loader />
      : <div className={styles.container}>
        <button className={styles.link}>
          <Link to='/login'>Go to the login page</Link>
        </button>
      </div>
    }
  </>
}