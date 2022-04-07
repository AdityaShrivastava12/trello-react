import React,{useState,useEffect,useRef} from 'react';
import MakeCards from './MakeCards';
import {DragDropContext,Droppable} from 'react-beautiful-dnd';

let key = '9b75cc4160800cc67e8dc36b5e621a7b';
let token = '3e7247cae91c9003f19d8d85425aefe4f8cf85dd9eba413fdf97ecaa53e76dbe';
let idBoard = '6234d5eb4b191b7978887fd6';

function GetCards(props){
  const {cards,setCards,idlist} = props;

  useEffect(() => {
    fetch(`https://api.trello.com/1/lists/${idlist}/cards?key=${key}&token=${token}`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setCards(data);
    })
  },[])

  return (
      <Droppable droppableId = "cards">
      {
        (provided) => (
          <ul className="cards" {...provided.droppableProps} ref={provided.innerRef}>
           {
             cards.map((element,index) => {
               return <MakeCards element={element} key={element['id']} cards={cards} setCards={setCards}
                       index={index}/>
             })
           }
           {provided.placeholder}
          </ul>
        )
      }
      </Droppable>
  )
}
export default GetCards;
