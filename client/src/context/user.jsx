import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import customFetch from "../lib/customFetch";

const UserContext = createContext();

export default function UserProvider(props) {
  const [type, setType] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const [modal, setModal] = useState(false);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await customFetch.get('/auth/showMe');
        // console.log(resp);
        if (resp.data.user) {
          handleUserTypeChange(resp.data.type);
          handleUserIDChange(resp.data.user._id);
        } else {
          handleUserIDChange('');
          handleUserTypeChange('');
        }
      } catch (err) {
        // console.log(err);
        toast.error(err.response.data.msg);
      }
    })();
  }, []);

  function handleUserTypeChange(val) {
    setType(val);
  }

  function handleModalToggle(val) {
    setModal(val);
  }

  function handleUserIDChange(val) {
    setUserID(val);
  }

  function handleSidebarToggle() {
    setSidebar(prev => !prev);
  }

  async function logoutUser(msg) {
    try {
      const resp = await customFetch.delete('/auth/logout');
      if (msg) {
        toast.success(resp.data.msg);
      }
      handleUserTypeChange('');
      handleUserIDChange('');
      localStorage.clear();
    } catch (err) {
      toast.error(err.response.data.msg);
      // console.log(err);
    }
  }

  const value = {
    type,
    onTypeChange: handleUserTypeChange,
    sidebar,
    onSidebarToggle: handleSidebarToggle,
    userID,
    onUserIDChange: handleUserIDChange,
    modal,
    onModalToggle: handleModalToggle,
    onLogout: logoutUser,
  }

  return <UserContext.Provider value={value}>
    {props.children}
  </UserContext.Provider>
}

export const useUserContext = () => {
  return useContext(UserContext);
}