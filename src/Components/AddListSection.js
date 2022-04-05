import React,{useState} from 'react';
import FormAddlist from './FormAddlist';

let key = '9b75cc4160800cc67e8dc36b5e621a7b';
let token = '3e7247cae91c9003f19d8d85425aefe4f8cf85dd9eba413fdf97ecaa53e76dbe';
let idBoard = '6234d5eb4b191b7978887fd6';

export default function AddListSection({setData}){
  const [clicked, setClicked] = useState(false);

  function clickHandler(event){
    console.log(event.target);
    setClicked(!clicked);
  }

  const [hover, setHoverState] = useState(false);
  function mouseHandler(event){
  }

  function PlusList(){
    return(
      <div onClick={clickHandler} className='plus-list' id="plusList">
        <i className="fa-solid fa-plus plus-sign"></i>
        <div className="add-field">Add a list</div>
      </div>
    )
  }

  function submitHandler(e){
    e.preventDefault();
    console.log('submitted');
    let text = e.target.firstElementChild.value;
    fetch(`https://api.trello.com/1/lists?key=${key}&token=${token}&name=${text}&idBoard=${idBoard}&pos=bottom`, {
      method: "POST",
      headings: {
        "Accept": "application/json"
      }
    })
    .then(response => response.json())
    .then(response => setData(prev => [...prev, response]));
  }

  return(
    <div className="add-list" id="addList">
        {
          clicked ?
          <FormAddlist clickHandler={clickHandler} submitHandler={submitHandler} buttonText='Add List' placeholderText='Enter list title...'/> :
          <PlusList />
        }
    </div>
  )
}
