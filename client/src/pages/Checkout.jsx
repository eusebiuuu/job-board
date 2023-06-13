import { toast } from 'react-toastify';
import customFetch from '../lib/customFetch';
import styles from './Checkout.module.css'

export default function Checkout() {
  
  async function handleSubscriptionBuy(monthly) {
    try {
      const resp = await customFetch.post('/companies/checkout', { monthly });
      console.log(resp);
      window.location = resp.data.url;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  }

  return (<div className={styles.container}>
    <div className={styles.flex}>
      <h2>Payment methods</h2>
    </div>
    <div className={styles.footer}>
      <div className={styles.test}>Success test card: 4242 4242 4242 4242</div>
      <div className={styles.test}>Declined test card: 4000 0000 0000 9995</div>
    </div>
    <div className={styles.choices}>
      <div className={styles.choice}>
        <div className={styles.flex}>
          <h3>Single</h3>
        </div>
        <div className={styles.flex}>
          <h2>10$</h2>
        </div>
        <hr />
        <div className={styles.benefits}>
          <ul className={styles.list}>
            <li>can create 15 job announcements</li>
            <li>unlimited support from the maintenance team</li>
            <li>unlimited searches</li>
            <li>30 days active announcement</li>
          </ul>
        </div>
        <div className={styles.flex}>
          <button className={styles.btn} onClick={() => handleSubscriptionBuy(false)}>Buy</button>
        </div>
      </div>
      <div className={styles.choice}>
        <div className={styles.flex}>
          <h3>Subscription</h3>
        </div>
        <div className={styles.flex}>
          <h2>20$/month</h2>
        </div>
        <hr />
        <div className={styles.benefits}>
          <ul className={styles.list}>
            <li>unlimited job announcements</li>
            <li>unlimited support from the maintenance team</li>
            <li>unlimited searches</li>
            <li>regular updates</li>
          </ul>
        </div>
        <div className={styles.flex}>
          <button className={styles.btn} onClick={() => handleSubscriptionBuy(true)}>Buy</button>
        </div>
      </div>
    </div>
  </div>)
}
