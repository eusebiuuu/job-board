import styles from './ListElement.module.css'

export default function ListElement(props) {
  return <button onClick={() => props.onValueChange(props.text)} 
    className={props.value ? styles.active : styles.normal}>
    {props.text}
  </button>
}