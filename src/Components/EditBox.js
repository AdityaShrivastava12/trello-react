import React,{useState} from 'react';

let key = '9b75cc4160800cc67e8dc36b5e621a7b';
let token = '3e7247cae91c9003f19d8d85425aefe4f8cf85dd9eba413fdf97ecaa53e76dbe';

function EditBox({cardName,setCardName,setEditIconClick,setEnter,cardId}){

  const [textAreaName,setTextAreaName] = useState(cardName);

  function clickHandler(e){
    if(e.type === 'keyup' && e.code !== 'Enter'){
      return;
    }

    if(!textAreaName){
      console.log('return')
      setEditIconClick(false);
      setEnter(false);
      return;
    }

    fetch(`https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}&name=${textAreaName.trim()}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json"
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setCardName(textAreaName.trim());
        setEditIconClick(false);
        setEnter(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function crossButtonClickHandler(){
    setEditIconClick(false);
    setEnter(false);
  }

  return (
    <div className="editbox-div">
      <div className="overlay" id="overlay">
        <i className="fa-solid fa-xmark fa-xl overlay-cross" id="overlayCross" onClick={crossButtonClickHandler}></i>
      </div>
      <textarea rows="4" value={textAreaName} onChange={(e) => setTextAreaName(e.target.value)}
       onKeyUp={clickHandler}></textarea>
      <button type="submit" className="add-card-button" onClick={clickHandler}>Save</button>
    </div>
  )
}
export default EditBox;
