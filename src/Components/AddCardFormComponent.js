import React,{useState,useEffect} from 'react';

let key = '9b75cc4160800cc67e8dc36b5e621a7b';
let token = '3e7247cae91c9003f19d8d85425aefe4f8cf85dd9eba413fdf97ecaa53e76dbe';
let idBoard = '6234d5eb4b191b7978887fd6';

function AddCardFormComponent(props){
  const {setCards} = props;
  const [clicked,setClick] = useState(false);
  function clickHandler(){
    setClick(!clicked)
  }
  const [cardName, setCardName] = useState('');
  const [cardNameFromButtonClick, setCardNameFromButtonClick] = useState('');

  function buttonClickHandler(event){
    event.preventDefault();
    setCardNameFromButtonClick(cardName);
  }
  function keyUpHandler(e){
    e.persist();
    if(e.which === 13){
      e.preventDefault()
      setCardNameFromButtonClick(cardName.trim());
      e.target.value = '';
    }
  }
  useEffect(() => {
    if(!cardNameFromButtonClick){
      return;
    }
    fetch(`https://api.trello.com/1/cards/?idList=${props['idlist']}&key=${key}&token=${token}&name=${cardNameFromButtonClick}`, {
      method: "POST",
      headers: {
        "Accept": "application/json"
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      setCards(prev => [...prev, response]);
    })
    .catch((err) => {
      console.log(err);
    })
  },[cardNameFromButtonClick])
  return (
    <form className="add-card" data-form>
    {
      clicked ?
      <div className="before-click-textarea" id="afterClickTextArea" data-afterclicktextarea>
        <textarea name="add-card-textarea" onChange={event => setCardName(event.target.value)} id="addCardTextarea" rows="3"
        className="add-card-text-area" onKeyUp = {keyUpHandler} placeholder="Enter a title for this card..." autoFocus></textarea>
        <div className="button-and-cross" id="buttonAndCross">
          <button type="submit" className="add-card-button" id="addCardButton" onClick={buttonClickHandler}>Add Card</button>
          <i className="fa-solid fa-xmark fa-xl form-cross" id="form-cross" onClick={clickHandler}></i>
        </div>
      </div>
      :
      <div className="plus-input" id="plusInput" onClick={clickHandler}>
        <i className="fa-solid fa-plus plus-sign"></i>
        <div className="add-field">Add a card</div>
      </div>
    }
    </form>
  )
}
export default AddCardFormComponent;
