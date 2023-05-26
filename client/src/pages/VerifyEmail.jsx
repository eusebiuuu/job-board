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
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await customFetch.post('/auth/verifyEmail', { verificationToken, email, type });
        toast.success(response.data.msg);
        setIsLoading(false);
        setIsError(false);
      } catch (err) {
        toast.error(err.response.data.msg);
        setIsError(true);
        setIsLoading(false);
      }
    })();
  }, [email, type, verificationToken]);

  return <>{isLoading
    ? <Loader />
    : <div className={styles.container}>
      {isError
      ? <div className={styles.error}>
        <h2>
          Something went wrong. Please do the process again and make sure you follow exactly the link from the email.
        </h2>
        <h3>If the problem persists, please contact me: eusebiu.rimboi04@gmail.com</h3>
      </div>
      :<div className={styles.link}>
        <Link to='/login'>Go to the login page</Link>
      </div>}
    </div>}
  </>
}