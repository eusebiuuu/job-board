import { nanoid } from 'nanoid';
import styles from './Chips.module.css'
import { TiDeleteOutline } from 'react-icons/ti';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


export default function Chips(props) {
  const { placeholder, value: objects, onChange: changeObjects, withRedux } = props;
  const [object, setObject] = useState('');
  const dispatch = useDispatch();

  function handleObjectAdd() {
    const exist = objects.find(curObj => {
      if (object.toLowerCase() === curObj.toLowerCase()) {
        return curObj;
      }
      return null;
    });
    if (withRedux) {
      dispatch(changeObjects(!exist && object !== '' ? [...objects, object] : objects));
    } else {
      changeObjects(objects => {
        return !exist && object !== '' ? [...objects, object] : objects;
      })
    }
    setObject(old => {
      return exist ? old : '';
    });
  }

  function handleObjectDelete(val) {
    const curIdx = objects.indexOf(val);
    if (!withRedux) {
      changeObjects(objects => {
        return objects.filter((elem, idx) => {
          if (curIdx !== idx) {
            return elem;
          }
          return null;
        });
      });
    } else {
      dispatch(changeObjects(objects.filter((elem, idx) => {
          if (curIdx !== idx) {
            return elem;
          }
          return null;
        })
      ));
    }
  }

  function handleObjectChange(event) {
    setObject(event.target.value);
  }

  return <div>
  {objects && objects.map(elem => {
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
    <input onChange={handleObjectChange} type='text' value={object} placeholder={placeholder} onKeyDown={e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleObjectAdd();
      }
    }} />
    <button className={styles.btn} onClick={handleObjectAdd}>Add {placeholder}</button>
  </div>
</div>
}
