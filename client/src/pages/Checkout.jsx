import styles from './Checkout.module.css'

export default function Checkout() {
  return (<div className={styles.container}>
    <div className={styles.flex}>
      <h2>Payment methods</h2>
    </div>
    <div className={styles.choices}>
      <div className={styles.choice}>
        <div className={styles.flex}>
          <h3>Individual pay</h3>
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
          <button className={styles.btn}>Buy</button>
        </div>
      </div>
      <div className={styles.choice}>
        <div className={styles.flex}>
          <h3>Monthly pay</h3>
        </div>
        <div className={styles.flex}>
          <h2>20$</h2>
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
          <button className={styles.btn}>Buy</button>
        </div>
      </div>
    </div>
  </div>)
}
