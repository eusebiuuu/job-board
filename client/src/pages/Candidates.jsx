import styles from './Candidates.module.css'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';

const fullName = 'John Smith';
const email = 'fake.email@gmail.com';
const aboutMe = 'Ante justo, vitae fermentum varius risus curabitur. Orci nisi, arcu vestibulum ultrices suspendisse gravida egestas. At amet turpis velit et malesuada sit duis nunc. Mauris vestibulum, eget sit mauris mollis dolor eget. Interdum netus eget nullam sem id purus';

export default function Candidates(props) {
  // const { id } = useParams();
  return (<div className={styles.container}>
    <div className={styles.candidate}>
      <div className={styles.data}>
        <h2>{fullName}</h2>
        <h4>Email: {email}</h4>
        <p>{aboutMe.substring(0, 150)}&hellip;</p>
      </div>
      <div className={styles.image}>
        <img src={logo} alt='Candidate profile' />
      </div>
      <div className={styles.action}>
        <button>
          <Link to='/candidate/'>Profile</Link>
        </button>
        <button>Delete</button>
      </div>
    </div>
    <div className={styles.candidate}>
      <div className={styles.data}>
        <h2>{fullName}</h2>
        <h4>Email: {email}</h4>
        <p>{aboutMe.substring(0, 150)}&hellip;</p>
      </div>
      <div className={styles.image}>
        <img src={logo} alt='Candidate profile' />
      </div>
      <div className={styles.action}>
        <button>
          <Link to='/candidate/'>Profile</Link>
        </button>
        <button>Delete</button>
      </div>
    </div>
    <div className={styles.candidate}>
      <div className={styles.data}>
        <h2>{fullName}</h2>
        <h4>Email: {email}</h4>
        <p>{aboutMe.substring(0, 150)}&hellip;</p>
      </div>
      <div className={styles.image}>
        <img src={logo} alt='Candidate profile' />
      </div>
      <div className={styles.action}>
        <button>
          <Link to='/candidate/'>Profile</Link>
        </button>
        <button>Delete</button>
      </div>
    </div>
  </div>)
}
