import { useState } from "react";
import { faq } from "../utils/faq";
import styles from './FAQ.module.css'
import { nanoid } from 'nanoid'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

export default function FAQ() {
  const [open, setOpen] = useState(Array.from(faq, elem => false));

  function handleOpenToggle(idx) {
    setOpen(prev => {
      return prev.map((elem, curIdx) => {
        if (idx === curIdx) {
          return !elem;
        }
        return elem;
      })
    })
  }

  return (<div className={styles.container}>
    {faq.map((elem, idx) => {
      return <div key={nanoid()} className={styles.dialogue}>
        <div className={styles.question}>
          <div>{elem.question}?</div>
          <div>
            <button onClick={() => handleOpenToggle(idx)}>
              {!open[idx] ? <AiOutlinePlus size={25} /> : <AiOutlineMinus size={25} />}
            </button>
          </div>
        </div>
        <div className={`${styles.answer} ${open[idx] ? styles.open : ''}`}>
          <div>{elem.answer}</div>
        </div>
      </div>
    })}
  </div>)
}
