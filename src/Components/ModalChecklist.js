import React,{useState,useContext} from 'react';
import FormAddlist from './FormAddlist';
import AddCheckItem from './AddCheckItem';
import IndividualChecklist from './IndividualChecklist';
import {key,token} from './ListDiv';

function ModalChecklist({checkListArray,setCheckListArray}){
  console.log('checklist');
  console.log(checkListArray);
  return (
    <div className="cardpopup-elementstructure card-popup-checklist">
    {
      checkListArray.map((element) => {
        return (
          <IndividualChecklist element={element} checkListArray={checkListArray}
           setCheckListArray={setCheckListArray} key={element['id']}/>
        )
      })
    }
    </div>
  )
}
export default ModalChecklist;




// <div className="description-heading-and-button">
//   <div className="heading-text">Checklist</div>
//   {
//     checkListItems.length ?
//     <button className="add-card-button description-edit-button">Delete</button>
//     :
//     null
//   }
// </div>
// <ul>
// </ul>
// {
//   click ?
//   <FormAddlist buttonText="Add" clickHandler={clickHandler} placeholderText="Add an item"/>
//   :
//   <button className="add-card-button description-edit-button" onClick={addClickHandler}>Add an item</button>
// }
