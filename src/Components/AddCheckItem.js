import React,{useState,useContext} from 'react';
import FormAddlist from './FormAddlist';
import {key,token} from './ListDiv';

function AddCheckItem({setCheckListItems,checkListId,checkListArray,setCheckListArray}){
  const [click,setClick] = useState(false);
  const [textValue,setTextValue] = useState('');

  function addClickHandler(){
    setClick(true);
  }

  function clickHandler(){
    setClick(false);
  }
  function submitHandler(e){
    e.preventDefault();
    fetch(`https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${textValue}&key=${key}&token=${token}&pos=bottom`,{
      method: "POST"
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let updatedArray = checkListArray.map((element) => {
        if(element['id'] === checkListId){
          element['checkItems'].push(response);
        }
        return element;
      })
      setCheckListArray(updatedArray);
      setTextValue('');
    })
  }
  return (
    <>
    {
      click ?
      <form className='form-addlist' id="formAddList" onSubmit={submitHandler}>
        <input type="text" name='textInput' id="textInput" className="add-list-input"
        placeholder='Add an item' value={textValue} onChange={(e) => setTextValue(e.target.value)}/>
        <div className="button-and-cross" id="buttonAndCross">
          <button type="submit" className="add-card-button" id="addListButton">Add</button>
          <i className="fa-solid fa-xmark fa-xl form-cross" id="list-cross" onClick={clickHandler}></i>
        </div>
      </form>
      :
      <button className="add-card-button description-edit-button" onClick={addClickHandler}>Add an item</button>
    }
    </>
  )
}
export default AddCheckItem;


// <FormAddlist buttonText="Add" clickHandler={clickHandler} placeholderText="Add an item"/>
