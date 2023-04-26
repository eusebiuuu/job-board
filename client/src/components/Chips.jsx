import { nanoid } from 'nanoid';
import styles from './Chips.module.css'
import { TiDeleteOutline } from 'react-icons/ti';
import { useState } from 'react';


export default function Chips(props) {
  const { placeholder, value: objects, onChange: setObjects } = props;
  const [object, setObject] = useState('');

  function handleObjectAdd() {
    const exist = objects.find(curCity => {
      if (object.toLowerCase() === curCity.toLowerCase()) {
        return curCity;
      }
      return null;
    });
    setObjects((objects) => {
      if (!exist && object !== '') {
        return [...objects, object];
      }
      return objects;
    });
    setObject(old => {
      return exist ? old : '';
    });
  }

  function handleObjectDelete(val) {
    setObjects(objects => {
      const curIdx = objects.indexOf(val);
      return objects.filter((elem, idx) => {
        if (curIdx !== idx) {
          return elem;
        }
        return null;
      })
    })
  }

  function handleObjectChange(event) {
    setObject(event.target.value);
  }

  return <div className={styles.list}>
  {objects.map(elem => {
    return <div key={nanoid()} className={styles.elem}>
      <div className={styles.flex}>
        <button onClick={() => handleObjectDelete(elem)}>
          <TiDeleteOutline size={25} />
        </button>
        <div>{elem}</div>
      </div>
    </div>
  })}
  <div className={styles.form}>
    <input onChange={handleObjectChange} type='text' onKeyDown={(e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    }} value={object} placeholder={placeholder} />
    <button className={styles.btn} onClick={handleObjectAdd}>Add {placeholder}</button>
  </div>
</div>
}