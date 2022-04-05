import React,{useState,useContext,useEffect} from 'react';
import AddCheckItem from './AddCheckItem';
import {CardIdContext} from './MakeCards';
import CheckItem from './CheckItem';
import {key,token} from './ListDiv';

function IndividualChecklist({element,checkListArray,setCheckListArray}){

  const [checkListItems,setCheckListItems] = useState(element['checkItems']);
  let cardId = useContext(CardIdContext);

  function deleteHandler(checkListId){
    console.log(checkListId);
    fetch(`https://api.trello.com/1/cards/${cardId}/checklists/${checkListId}?key=${key}&token=${token}`,{
      method: "DELETE"
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      let updatedData = checkListArray.filter((element) => {
        return element['id'] !== checkListId
      })
      setCheckListArray(updatedData);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="individual-checklist-item" key={element['id']}>
      <div className="description-heading-and-button individual-checklist-item-heading-button">
        <div className="heading-text">{element['name']}</div>
        <button className="add-card-button description-edit-button" onClick={() => deleteHandler(element['id'])}>Delete</button>
      </div>
      <ul className="checklist-ul">
        {
          checkListItems.map((item) => {
            return <CheckItem name={item['name']} id={item['id']} key={item['id']} state={item['state']}
                    element={element} checkListArray={checkListArray} setCheckListArray={setCheckListArray}/>
          })
        }
      </ul>
      <AddCheckItem setCheckListItems={setCheckListItems} checkListId={element['id']} checkListArray={checkListArray} setCheckListArray={setCheckListArray}/>
    </div>
  )
}
export default IndividualChecklist;
