import { toast } from "react-toastify";
import customFetch from "../lib/customFetch";
import { useNavigate } from "react-router-dom";
import styles from './ForgotPassword.module.css'
import { useState } from "react";

const initialState = {
  email: '',
  type: 'candidate'
}

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await customFetch.post('/auth/forgotPassword', { ...formData });
      toast.success(resp.data.msg);
      navigate('/');
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
      <h2>Forgot password</h2>
      <div className={styles.field}>
        <input name='email' value={formData.email} 
          onChange={handleFormDataChange} placeholder="Email" />
      </div>
      <div className={styles.btn}>
        <select name='type' id='type' className={styles.select} value={formData.type} onChange={handleFormDataChange}>
          <option value={'candidate'}>Candidate</option>
          <option value={'company'}>Company</option>
        </select>
        <button type="submit">
          {isLoading ? 'Loading...' : 'Send email'}
        </button>
      </div>
    </form>
  </div>)
}