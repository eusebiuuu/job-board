import { useState } from "react"
import messages from "../utils/ads"
import styles from './Home.module.css'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { Link } from "react-router-dom";
import recruit from '../assets/recruit.svg'
import logo from '../assets/logo.svg'
import jobs from '../assets/jobs.svg'
import { useUserContext } from "../context/user";

export default function Home() {
  const [imageID, setImageID] = useState(0);
  const len = messages.length;
  const { type } = useUserContext();

  function handleImageIDIncrease() {
    setImageID(prev => {
      return (prev + 1) % len;
    });
  }

  function handleImageIDDecrease() {
    setImageID(prev => {
      return (prev - 1 + len) % len;
    });
  }

  return (<div>
    <div className={styles['slideshow-container']}>
      <div className={styles.slideshow} style={{translate: `-${imageID * 100}%`}}>
        {messages.map((elem, idx) => {
          return <div key={elem.id} className={styles.slide} style={{ translate: `${idx * 100}%`}}>
            <h1>{elem.title}</h1>
            <h3>{elem.subtitle}</h3>
          </div>
        })}
      </div>
      <button className={styles.prev} onClick={handleImageIDDecrease}>
        <BsChevronLeft size={'3em'} />
      </button>
      <button className={styles.next} onClick={handleImageIDIncrease}>
        <BsChevronRight size={'3em'} />
      </button>
    </div>
    <div className={styles.register}>
      <button className={`${type === '' ? styles.btn : 'hide'}`}>
        <Link to='/register'>Register for free</Link>
      </button>
    </div>
    <div className={styles.filled}>
      <div>
        <h2>Recruiting?</h2>
        <p>Sit tincidunt pharetra enim diam posuere donec. Amet cursus integer sociis lectus gravida risus. Sit sem tortor quisque ipsum. At in neque dolor dignissim sagittis at molestie at. In lacus, in id velit quam facilisis lectus vulputate erat. Gravida ornare commodo, sagittis pulvinar.</p>
        <button className={styles.btn}>
          <Link to={`${type !== 'company' ? '/register' : '/company/addJob'}`}>Start recruiting</Link>
        </button>
      </div>
      <div>
        <div className={styles.image}>
          <img src={recruit} alt={'Recruit candidates'} />
        </div>
      </div>
    </div>
    <div className={styles.aboutMe}>
      <div className={styles.image}>
        <img src={logo} alt={'profile'} />
      </div>
      <div>
        <h2>About me</h2>
        <p>Sit tincidunt pharetra enim diam posuere donec. Amet cursus integer sociis lectus gravida risus. Sit sem tortor quisque ipsum. At in neque dolor dignissim sagittis at molestie at. In lacus, in id velit quam facilisis lectus vulputate erat. Gravida ornare commodo, sagittis pulvinar.</p>
        <button className={styles.btn}>
          {/*eslint-disable-next-line*/}
          <a target="_blank" rel="noreferrer" href={"#"}>Visit my website</a>
        </button>
      </div>
    </div>
    <div className={styles.filled}>
      <div>
        <h2>Looking for jobs?</h2>
        <p>Suspendisse feugiat neque sed eros malesuada, eu consequat lectus sodales. Integer commodo nibh ante. Mauris scelerisque mi a nunc auctor, non tincidunt mauris auctor. Morbi at eros quis sem imperdiet venenatis vitae ac augue. In sit amet consectetur orci, ac faucibus sapien.</p>
        <button className={styles.btn}>
          <Link to='/jobs'>Search jobs</Link>
        </button>
      </div>
      <div className={styles.image}>
        <img src={jobs} alt={'Search jobs'} />
      </div>
    </div>
  </div>)
}
