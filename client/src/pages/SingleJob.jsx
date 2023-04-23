import styles from './SingleJob.module.css'
import logo from '../assets/logo.svg'
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid'

const title = 'Web developer';
const company = 'Amazon';
const aboutUs = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu tellus pretium laoreet amet. Nulla duis mi elit amet. Tempor est cursus tellus tristique. Turpis ultrices ut et ut duis aliquam egestas felis duis. At montes, id proin consectetur eu cras id. Nullam placerat accumsan eu pretium. Turpis pharetra metus, feugiat enim diam odio mauris. Non quis aliquam nisl viverra nunc, tortor est nulla.';
const description = 'Ante justo, vitae fermentum varius risus curabitur. Orci nisi, arcu vestibulum ultrices suspendisse gravida egestas. At amet turpis velit et malesuada sit duis nunc. Mauris vestibulum, eget sit mauris mollis dolor eget. Interdum netus eget nullam sem id purus. Ornare ornare tellus sed blandit dolor. Quis at tristique integer urna dignissim elit purus lectus sagittis. Porttitor lacus, ut morbi diam et mauris, quam. At malesuada tristique amet egestas dapibus nec purus amet. Diam nec cum penatibus tellus elementum egestas consectetur. Suspendisse et quam lorem morbi facilisi ante at proin diam. Quis pellentesque quam nec, viverra. Tempus, elementum interdum nunc pulvinar dui.'
const mustHave = ['iuhfui ewifjwrui', 'iuhifh ijfwru ewf', 'iuwehu idjefwhu dijwe'];
const goodToHave = ['iuhfui ewifjwrui', 'iuhifh ijfwru ewf', 'iuwehu idjefwhu dijwe'];
const benefits = ['iuhfui ewifjwrui', 'iuhifh ijfwru ewf', 'iuwehu idjefwhu dijwe', 'odwehoeh 9eiwd edh', 'deidweuh'];
const cities = ['Vaslui', 'idjwuif', 'Barlad', 'Iasi', 'odkwejf9e iwedj', 'dwjewd weiejfuref9 9ef'];
const salary = 2000;
const location = 'Office';
const experience = 'At least 2 years';
const jobTypes = ['part-time', 'intern'];

export default function SingleJob() {
  const params = useParams();
  const id = params.id;
  console.log(id);
  return (<div className={styles.container}>
    <h2>Job details</h2>
    <div className={styles.flexBtns}>
      <button className={styles.btn1}>Cancel application</button>
      <div>
        <button className={styles.btn2}>Edit</button>
        <button className={styles.btn2}>Delete</button>
        <button className={styles.btn2}>Candidates</button>
      </div>
    </div>
    <div className={styles.details}>
      <p>Posted x days / hours ago</p>
      <div className={styles.header}>
        <div>
          <h2>{title}</h2>
          <h3>{company}</h3>
        </div>
        <div className={styles.image}>
          <img src={logo} alt='Company logo' />
        </div>
      </div>
      <h2>About us</h2>
      <p>{aboutUs}</p>
      <h2>Description</h2>
      <p>{description}</p>
      <h2>Requirements</h2>
      <br />
      <ul className={styles.list}>
        <h3>Must have</h3>
        {mustHave.map(elem => {
          return <li key={nanoid()}>{elem}</li>
        })}
        <br />
        <h3>Good to have</h3>
        {goodToHave.map(elem => {
          return <li key={nanoid()}>{elem}</li>
        })}
      </ul>
      <ul className={styles.list}>
        <h2>Benefits</h2>
        {benefits.map(elem => {
          return <li key={nanoid()}>{elem}</li>
        })}
      </ul>
      <h2>Minimum salary: {salary ?? 'Unspecified'}{salary ? '$' : ''}</h2>
      <br />
      <ul className={styles.list}>
        <h2>Cities</h2>
        {cities.map(elem => {
          return <li key={nanoid()}>{elem}</li>
        })}
      </ul>
      <h2>Location: {location}</h2>
      <br />
      <h2>Experience: {experience}</h2>
      <br />
      <ul className={styles.list}>
        <h2>Job type</h2>
        {jobTypes.map(elem => {
          return <li key={nanoid()}>{elem}</li>
        })}
      </ul>
    </div>
  </div>)
}
