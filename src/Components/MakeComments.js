import React,{useState,useEffect,useContext} from 'react';
import {CardIdContext} from './MakeCards';

let key = '9b75cc4160800cc67e8dc36b5e621a7b';
let token = '3e7247cae91c9003f19d8d85425aefe4f8cf85dd9eba413fdf97ecaa53e76dbe';

function MakeComments(props){
  const {commentId,commentText,commentsArray,setCommentsArray} = props;
  const [comment,setComment] = useState(commentText);
  const [click,setClick] = useState(false);
  const [textAreaValue,setTextAreaValue] = useState(comment);
  const cardId = useContext(CardIdContext);

  function saveButtonHandler(){
    if(!textAreaValue){
      setClick(false);
      return;
    }
    fetch(`https://api.trello.com/1/cards/${cardId}/actions/${commentId}/comments?text=${textAreaValue}&key=${key}&token=${token}`, {
        method: "PUT"
      })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log('saveComment')
        console.log(commentsArray);
        console.log(response);
        setComment(textAreaValue);
        let updatedArray = commentsArray.map((element) => {
          if(element['id'] === commentId){
            element['data']['text'] = textAreaValue;
            console.log(element['data']['text']);
          }
          return element;
        })
        setCommentsArray(updatedArray);
        setClick(false);
      })
  }

  function deleteHandler(){
    fetch(`https://api.trello.com/1/cards/${cardId}/actions/${commentId}/comments?key=${key}&token=${token}`, {
        method: "DELETE"
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let updatedData = commentsArray.filter((element) => {
          return element['id'] !== commentId
        })
        setCommentsArray(updatedData);
      })
  }

  return (
    <li className="activity-form-li" id="activityFormLi">
     {
       click ?
       <div className="after-edit-div">
         <textarea className='after-edit-textarea' value={textAreaValue} onChange={(e) => setTextAreaValue(e.target.value)}></textarea>
         <div className="after-edit-buttons" >
           <button type="submit" className="add-card-button save-comment" id="afterEditSaveButton" onClick={saveButtonHandler}>Save</button>
           <i className="fa-solid fa-xmark after-click-description-cross-button" id="afterEditCrossButton"
            onClick={() => setClick(false)}></i>
         </div>
       </div>
       :
       <>
       <p className="activity-form-li-p" id="activityFormLiP">{comment}</p>
       <div className="activity-form-buttons" id="activityFormButtons">
         <p className="activity-form-edit-delete-buttons" id="activityFormEditButton" onClick={() => setClick(true)}>edit</p>
         <p className="activity-form-edit-delete-buttons" id="activityFormDeleteButton" onClick={deleteHandler}>delete</p>
       </div>
       </>
     }


    </li>
  )
}
export default MakeComments;
