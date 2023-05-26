import { toast } from "react-toastify";
import { useUserContext } from "../context/user";
import customFetch from "../lib/customFetch";
import { useNavigate } from "react-router-dom";
import styles from './ChangePassword.module.css'
import { useState } from "react";

const initialState = {
  oldPassword: '',
  newPassword: '',
}

export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { userID, type } = useUserContext();
  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await customFetch.post('/auth/changePassword', { ...formData, userID, type });
      toast.success(resp.data.msg);
      navigate(`/${type}/profile`);
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
      <h2>Change password</h2>
      <div className={styles.field}>
        <input name='oldPassword' type="password" value={formData.oldPassword} 
          onChange={handleFormDataChange} placeholder="Old password" />
      </div>
      <div className={styles.field}>
        <input name='newPassword' type="password" id="newPassword" value={formData.newPassword} 
          onChange={handleFormDataChange} placeholder="New password" />
        </div>
      <div className={styles.btn}>
        <button type="submit">
          {isLoading ? 'Loading...' : 'Change'}
        </button>
      </div>
    </form>
  </div>)
}