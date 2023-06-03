import styles from './ListElement.module.css'

export default function ListElement(props) {
  return <button onClick={props.onValueChange} value={props.text} name={props.name}
    data-testid={`${props.name}${props.idx}`}
    className={props.value.indexOf(props.text) !== -1 ? styles.active : styles.normal}>
    {props.text}
  </button>
}