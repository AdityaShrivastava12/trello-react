import React,{useState,useEffect,useContext} from 'react';
import {CardIdContext} from './MakeCards';
import {key,token} from './ListDiv';

function CheckItem({name,id,state,checkListArray,setCheckListArray,element}){
  let initialValue = (state === 'incomplete' ? false : true);
  const [isChecked,setIsChecked] = useState(initialValue);
  let cardId = useContext(CardIdContext);

  useEffect(() => {
    let stateValue = isChecked ? 'complete' : 'incomplete';
    fetch(`https://api.trello.com/1/cards/${cardId}/checkItem/${id}?key=${key}&token=${token}&state=${stateValue}`,{
      method: "PUT"
    })
    .then(response => response.json())
    .then((response) => {
      let updatedData = checkListArray.map((elem) => {
        if(elem['id'] === element['id']){
          elem['checkItems'].map((item) => {
            if(item['id'] === id){
              item['state'] = isChecked ? 'complete' : 'incomplete'
            }
            return item;
          })
        }
        return elem;
      })
      setCheckListArray(updatedData);
    })
  },[isChecked])

  return (
    <li className="checkitem-list">
     <input
      type="checkbox"
      id={id}
      checked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
     />
     {
       isChecked ?
       <label htmlFor={id} className="line-through">{name}</label>
       :
       <label htmlFor={id}>{name}</label>
     }
    </li>
  )
}
export default CheckItem;
