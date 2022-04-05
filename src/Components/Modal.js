import React,{useState,useContext} from 'react';
import ModalActivity from './ModalActivity';
import ModalHeading from './ModalHeading';
import ModalDescription from './ModalDescription';
import ModalChecklist from './ModalChecklist';
import AddCheckList from './AddCheckList'
import {CardIdContext} from './MakeCards';
import {key,token} from './GetLists';

function Modal({setCommentsArray,cards,setCards,setCardClick,checkListArray,setCheckListArray}){
  console.log(checkListArray);
  const cardId = useContext(CardIdContext);
  const [checklistAddDisplay,setChecklistAddDisplay] = useState(false);
  function clickHandler(){
    fetch(`https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}`, {
        method: "DELETE"
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let updatedData = cards.filter((element) => {
          return element['id'] !== cardId;
        })
        setCards(updatedData);
        setCardClick(false);
      })
  }
  return (
    <div className="card-popup">
      <ModalHeading />
      <ModalDescription />
      <ModalChecklist checkListArray={checkListArray} setCheckListArray={setCheckListArray}/>
      <ModalActivity setCommentsArray={setCommentsArray}/>
      <button className="delete-card" id="deleteCard" onClick={clickHandler}>Delete</button>
      {
        checklistAddDisplay ?
        <AddCheckList setChecklistAddDisplay={setChecklistAddDisplay} setCheckListArray={setCheckListArray} cardId={cardId}/>
        :
        <button className="checklist-button" id="deleteCard" onClick={() => setChecklistAddDisplay(true)}>Checklist</button>
      }
    </div>
  )
}
export default Modal;
// <ModalChecklist checkListArray={checkListArray} setCheckListArray={setCheckListArray}/>
