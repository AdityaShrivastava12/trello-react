import React,{useState,useContext} from 'react';
import {CommentsContext,CardIdContext} from './MakeCards';
import MakeComments from './MakeComments';

let key = '9b75cc4160800cc67e8dc36b5e621a7b';
let token = '3e7247cae91c9003f19d8d85425aefe4f8cf85dd9eba413fdf97ecaa53e76dbe';

function ModalActivity({setCommentsArray}){
  let commentsArray = useContext(CommentsContext);
  let cardId = useContext(CardIdContext);
  const [click,setClick] = useState(false);
  const [border,setBorder] = useState(true);
  const [textAreaValue,setTextAreaValue] = useState('');

  function textClickHandler(){
    setClick(true);
    setBorder(false);
  }

  function crossClickHandler(){
    setClick(false);
    setBorder(true);
  }

  async function saveButtonHandler(e){
    e.preventDefault();
    let response = await fetch(`https://api.trello.com/1/cards/${cardId}/actions/comments?text=${textAreaValue}&key=${key}&token=${token}`, {
      method: "POST",
      headers: {
        "Accept": "application/json"
      }
    })
    let data = await response.json();
    console.log(data);
    console.log(commentsArray);
    setCommentsArray([data,...commentsArray]);
    console.log(commentsArray);
    crossClickHandler();
    setTextAreaValue('');
  }

  return (
    <div className="cardpopup-elementstructure card-popup-activity" id="cardPopupActivity">
      <div className="heading-text activity-heading">Activity</div>
      <form className="activity-form" id="activityForm">
       {
         border ?
         <input wrap="soft" type="text" className="activity-form-text" id="activityFormText"
          placeholder="Add a comment" onClick={textClickHandler} value={textAreaValue} onChange={(e) => setTextAreaValue(e.target.value)}></input>
          :
         <input wrap="soft" type="text" className="activity-form-text no-border" id="activityFormText"
          placeholder="Add a comment" onClick={textClickHandler} value={textAreaValue} onChange={(e) => setTextAreaValue(e.target.value)}></input>
       }
       {
         click ?
         <div className="activity-form-save-cross-buttons" id="activityFormSaveCrossButtons">
           <button type="submit" className="add-card-button save-comment" id="saveCommentButton" onClick={saveButtonHandler}>Save</button>
           <i className="fa-solid fa-xmark after-click-description-cross-button" id="commentCrossButton"
            onClick={crossClickHandler}></i>
         </div>
         :
         null
       }
      </form>
      <ul className="activity-form-ul" id="activityFormUl">
        {
          commentsArray.length ?
          commentsArray.map((element) => {
            return <MakeComments commentId={element['id']} commentText={element['data']['text']} key={element['id']}
                    commentsArray={commentsArray} setCommentsArray={setCommentsArray}/>
          })
          :
          null
        }
      </ul>
    </div>
  )
}
export default ModalActivity;
