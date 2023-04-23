import { useState } from "react"
import messages from "../utils/ads"
import styles from './Home.module.css'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg'

export default function Home(props) {
  const [imageID, setImageID] = useState(0);
  const len = messages.length;

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
      {messages.map(elem => {
        return <div key={elem.id} className={imageID === elem.id ? styles.show : styles.hide}>
          <h1>{elem.title}</h1>
          <h3>{elem.subtitle}</h3>
        </div>
      })}
      <button className={styles.prev} onClick={handleImageIDDecrease}>
        <BsChevronLeft size={'3em'} />
      </button>
      <button className={styles.next} onClick={handleImageIDIncrease}>
        <BsChevronRight size={'3em'} />
      </button>
    </div>
    <div className={styles.register}>
      <button className={styles.btn}>
        <Link to='/register'>Register for free</Link>
      </button>
    </div>
    <div className={styles.recruit}>
      <div>
        <h2>Recruiting?</h2>
        <p>Sit tincidunt pharetra enim diam posuere donec. Amet cursus integer sociis lectus gravida risus. Sit sem tortor quisque ipsum. At in neque dolor dignissim sagittis at molestie at. In lacus, in id velit quam facilisis lectus vulputate erat. Gravida ornare commodo, sagittis pulvinar.</p>
      </div>
      <div>
        <button className={styles.btn}>
          <Link to='/company/addJob'>Start recruiting</Link>
        </button>
      </div>
    </div>
    <div className={styles.aboutMe}>
      <div>
        <h2>About me</h2>
        <p>Sit tincidunt pharetra enim diam posuere donec. Amet cursus integer sociis lectus gravida risus. Sit sem tortor quisque ipsum. At in neque dolor dignissim sagittis at molestie at. In lacus, in id velit quam facilisis lectus vulputate erat. Gravida ornare commodo, sagittis pulvinar.</p>
        <button className={styles.btn}>
          {/*eslint-disable-next-line*/}
          <a href={"#"}>Visit my website</a>
        </button>
      </div>
      <div className={styles.logo}>
        <img src={logo} alt={'profile'} />
      </div>
    </div>
  </div>)
}
