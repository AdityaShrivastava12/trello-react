import React,{useState,useContext} from 'react';
import {DescriptionContext,SetDescriptionContext,CardIdContext} from './MakeCards';

let key = '9b75cc4160800cc67e8dc36b5e621a7b';
let token = '3e7247cae91c9003f19d8d85425aefe4f8cf85dd9eba413fdf97ecaa53e76dbe';

function ModalDescription(){
  const [clicked, setClicked] = useState(false);
  const description = useContext(DescriptionContext);
  const [textAreaValue,setTextAreaValue] = useState(description);
  const setDescription = useContext(SetDescriptionContext);
  const cardId = useContext(CardIdContext);
  console.log(description);

  function saveButtonHandler(){
    fetch(`https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}&desc=${textAreaValue}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json"
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setDescription(textAreaValue);
        setClicked(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <div className="cardpopup-elementstructure card-popup-description" id="cardPopupDescriptiopn">
      <div className="description-heading-and-button" id="descriptionHeadingAndButton">
        <div className="heading-text" id="headingDescription">Description</div>
        {
          description ?
          <button className="add-card-button description-edit-button" id="descriptionEditButton" onClick={() => setClicked(true)}>Edit</button>
          :
          null
        }
      </div>
      {
        clicked ?
        <div className="after-click-description" id="afterClickDescription">
          <textarea rows="8" className="after-click-description-textarea" id="afterClickDescriptionTextarea"
          placeholder="Add a description" value={textAreaValue} onChange={(e) => setTextAreaValue(e.target.value)} autoFocus></textarea>
          <div className="after-click-description-buttons">
            <button type="submit" className=" add-card-button after-click-description-savebutton" id="afterClickDescriptionSavebutton" onClick={saveButtonHandler}>Save</button>
            <i className="fa-solid fa-xmark after-click-description-cross-button" id="afterClickDescriptionCrossButton"
             onClick={() => setClicked(false)}></i>
          </div>
        </div>
        :
        <>
         {
           description ?
           <p className="description-text-with-value" id="descriptionText" onClick={() => setClicked(true)}>{description}</p>
           :
           <p className="description-text" id="descriptionText" onClick={() => setClicked(true)}>Add a description</p>
         }
        </>
      }

    </div>
  )
}
export default ModalDescription;
