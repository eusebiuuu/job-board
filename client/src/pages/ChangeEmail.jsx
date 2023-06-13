import { toast } from "react-toastify";
import { useUserContext } from "../context/user";
import customFetch from "../lib/customFetch";
import styles from './ChangeEmail.module.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  newEmail: '',
  password: '',
}

export default function ChangeEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { userID, type, onLogout } = useUserContext();
  const navigate = useNavigate();
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!formData.newEmail.toLowerCase().match(emailPattern)) {
      toast.error('Invalid email provided');
      return;
    }
    setIsLoading(true);
    try {
      const resp = await customFetch.post('/auth/changeEmail', { ...formData, userID, type });
      toast.success(resp.data.msg);
      await onLogout();
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
      <h2>Change email</h2>
      <div className={styles.field}>
        <input name='newEmail' id="newEmail" type="email" value={formData.newEmail} 
          onChange={handleFormDataChange} placeholder="New email" />
      </div>
      <div className={styles.field}>
        <input name='password' type="password" id="password" value={formData.password} 
          onChange={handleFormDataChange} placeholder="Password" />
        </div>
      <div className={styles.btn}>
        <button type="submit">
          {isLoading ? 'Loading...' : 'Change'}
        </button>
      </div>
    </form>
  </div>)
}