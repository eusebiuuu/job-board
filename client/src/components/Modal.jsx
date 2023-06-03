import { useUserContext } from "../context/user";
import styles from './Modal.module.css'

export default function Modal(props) {
  const { modal, onModalToggle } = useUserContext();
  const { action } = props;

  async function handleButtonClick() {
    onModalToggle(false);
    await action();
  }

  return <div className={`${modal ? styles.modal : styles.hide}`}>
    <div className={styles.msg}>
      <div className={styles.text}>Are you sure?</div>
      <button className={styles.no} onClick={() => onModalToggle(false)}>No</button>
      <button className={styles.yes} onClick={handleButtonClick}>Yes</button>
    </div>
  </div>
}