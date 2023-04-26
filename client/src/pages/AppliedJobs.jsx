import { useState } from 'react';
import styles from './AppliedJobs.module.css'
import JobCard from '../components/JobCard';
import Filters from '../components/Filters';

const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum vitae dictumst sit vitae, mi imperdiet sit. Lectus eleifend aliquam nibh mauris, pretium. Lectus magnis lorem massa urna felis porta.';

export default function AppliedJobs(props) {
  const [keywords, setKeywords] = useState('');

  function handleKeywordChange(event) {
    setKeywords(event.target.value);
  }

  return (<div className={styles.container}>
    <div className={styles.searchbar}>
      <input className={styles.input} onChange={handleKeywordChange} value={keywords} placeholder={'Search jobs'} />
    </div>
    <Filters show={false} />
    <div className={styles.jobs}>
      <JobCard content={content} title={'Web developer'} company={'Google'} id={2924734} />
      <JobCard content={content} title={'Machine learning engineer'} company={'Meta'} id={2924734} />
      <JobCard content={content} title={'Machine learning engineer'} company={'Meta'} id={2924734} />
      <JobCard content={content} title={'Machine learning engineer'} company={'Meta'} id={2924734} />
      <JobCard content={content} title={'Machine learning engineer'} company={'Meta'} id={2924734} />
      <JobCard content={content} title={'Machine learning engineer'} company={'Meta'} id={2924734} />
      <JobCard content={content} title={'Machine learning engineer'} company={'Meta'} id={2924734} />
      <JobCard content={content} title={'Machine learning engineer'} company={'Meta'} id={2924734} />
    </div>
  </div>)
}
