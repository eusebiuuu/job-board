import { toast } from "react-toastify";
import customFetch from "../lib/customFetch";
import { useNavigate } from "react-router-dom";
import styles from './ForgotPassword.module.css'
import { useState } from "react";
import queryString from "query-string";

const initialState = {
  password: '',
}

export default function ResetPassword() {
  const { token, email, type } = queryString.parse(window.location.search);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await customFetch.post('/auth/resetPassword', { ...formData, token, email, type });
      toast.success(resp.data.msg);
      navigate('/login');
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
    setIsLoading(false);
  }

  function handleFormDataChange(e) {
    setFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    });
  }

  return (<div className={styles.container}>
    <form onSubmit={handleFormSubmit}>
      <h2>Reset password</h2>
      <div className={styles.field}>
        <input name='password' type='password' value={formData.password} 
          onChange={handleFormDataChange} placeholder="New password" />
      </div>
      <div className={styles.btn}>
        <button type="submit">
          {isLoading ? 'Loading...' : 'Reset'}
        </button>
      </div>
    </form>
  </div>)
}