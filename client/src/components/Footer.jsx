import { Link } from 'react-router-dom';
import styles from './Footer.module.css'
import { BsFacebook, BsTwitter } from 'react-icons/bs'
import { AiFillLinkedin, AiFillYoutube } from 'react-icons/ai'

function Footer(props) {
  return (<div className={styles.container}>
    <div className={styles['grid-container']}>
      <div className={styles['list-container']}>
        <h5>Contacts</h5>
        <ul className={styles.list}>
          <li>Call: +40777777777</li>
          <li>Email: fake.email@gmail.com</li>
        </ul>
      </div>
      <div className={styles['list-container']}>
        <h5>More</h5>
        <ul className={styles.list}>
          <li>
            <Link to='/faq'>FAQ</Link>
          </li>
          <li>
            <a href='https://documenter.getpostman.com/view/24263146/2s93sdXrCc' target='_blank' rel='noreferrer'>API Docs</a>
          </li>
        </ul>
      </div>
      <div className={`${styles['list-container']} ${styles['icons-container']}`}>
        <div className={styles.icons}>
          <a target='_blank' rel='noreferrer' href='https://www.facebook.com'>
            <BsFacebook size={30} />
          </a>
          <a target='_blank' rel='noreferrer' href='https://www.twitter.com'>
            <BsTwitter size={30} />
          </a>
        </div>
        <div className={styles.icons}>
          <a target='_blank' rel='noreferrer' href='https://www.youtube.com'>
            <AiFillYoutube size={30} />
          </a>
          <a target='_blank' rel='noreferrer' href='https://www.linkedin.com'>
            <AiFillLinkedin size={30} />
          </a>
        </div>
      </div>
    </div>
    <div className={styles['flex-icons']}>
      <a href='https://www.facebook.com'>
        <BsFacebook size={30} />
      </a>
      <a href='https://www.twitter.com'>
        <BsTwitter size={30} />
      </a>
      <a href='https://www.youtube.com'>
        <AiFillYoutube size={30} />
      </a>
      <a href='https://www.linkedin.com'>
        <AiFillLinkedin size={30} />
      </a>
    </div>
    <div className={styles.credits}>
      <div>© 2023 | All Rights Reserved.</div>
      <div>Project built by <span>Rîmboi Eusebiu</span></div>
      <div>Designs created with the help of <span>thecreation.design</span></div>
    </div>
  </div>)
}

export default Footer;