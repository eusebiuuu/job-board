import { nanoid } from 'nanoid';
import styles from './Chips.module.css'
import { TiDeleteOutline } from 'react-icons/ti';
import { useState } from 'react';


export default function Chips(props) {
  const { placeholder, name, value: objects, onChange: changeObjects } = props;
  const [object, setObject] = useState('');

  function handleObjectAdd() {
    const exist = objects.find(curObj => {
      if (object.toLowerCase() === curObj.toLowerCase()) {
        return curObj;
      }
      return null;
    });
    const obj = { target: {
      value: !exist && object !== '' ? [...objects, object.toLowerCase()] : objects,
      name: name,
    }};
    changeObjects(obj);
    setObject(old => {
      return exist ? old : '';
    });
  }

  function handleObjectDelete(val) {
    const curIdx = objects.indexOf(val);
    const newObjects = objects.filter((elem, idx) => {
      if (curIdx !== idx) {
        return elem;
      }
      return null;
    });
    const obj = { target: {
      value: newObjects,
      name: name,
    }};
    changeObjects(obj);
  }

  function handleObjectChange(event) {
    setObject(event.target.value);
  }

  return <div data-testid='chips'>
  {objects && objects.map((elem, idx) => {
    return <div key={nanoid()} className={styles.elem}>
      <div className={styles.flex}>
        <button onClick={() => handleObjectDelete(elem)}>
          <TiDeleteOutline size={25} />
        </button>
        <div data-testid={`${name}${idx}`}>{elem}</div>
      </div>
    </div>
  })}
  <div className={styles.form}>
    <input id={`input${placeholder}`} name={name} onChange={handleObjectChange} type='text'
      value={object} placeholder={placeholder} onKeyDown={e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleObjectAdd();
      }
    }} />
    <button id={`add${placeholder}`} className={styles.btn} onClick={handleObjectAdd}>Add {placeholder}</button>
  </div>
</div>
}
