import { Link } from "react-router-dom";
import styles from './NotFound.module.css'

export default function NotFound(props) {
  return (<div className={styles.container}>
    <h1>Page not found</h1>
    <h1>404</h1>
    <div className={styles.flex}>
      <Link to='/'>Go home</Link>
    </div>
  </div>)
}
