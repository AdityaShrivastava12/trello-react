import React,{useState} from 'react'
import {key,token} from './ListDiv';

function AddCheckList({setChecklistAddDisplay,setCheckListArray,cardId}){

  const [textValue,setTextValue] = useState('')

  function submitHandler(e){
    e.preventDefault();
    fetch(`https://api.trello.com/1/cards/${cardId}/checklists?key=${key}&token=${token}&name=${textValue}&pos=bottom`,{
      method: "POST"
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      setCheckListArray((prev) => [...prev,response]);
      setChecklistAddDisplay(false);
    })
  }

  function clickHandler(){
    setChecklistAddDisplay(false);
  }
  return(
    <form className='form-addCheckList' onSubmit={submitHandler}>
      <input type="text" name='textInput' id="textInput" className="add-list-input"
      placeholder='Add a title' value={textValue} onChange={(e) => setTextValue(e.target.value)}/>
      <div className="button-and-cross" id="buttonAndCross">
        <button type="submit" className="add-card-button" id="addListButton">Add</button>
        <i className="fa-solid fa-xmark fa-xl form-cross" id="list-cross" onClick={clickHandler}></i>
      </div>
    </form>
  )
}
export default AddCheckList;
