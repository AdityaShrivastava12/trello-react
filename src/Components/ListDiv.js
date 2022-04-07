import React,{useState,useEffect} from 'react';
import AddCardFormComponent from './AddCardFormComponent';
import {Droppable,Draggable} from 'react-beautiful-dnd';
import MakeCards from './MakeCards';

export let key = '9b75cc4160800cc67e8dc36b5e621a7b';
export let token = '3e7247cae91c9003f19d8d85425aefe4f8cf85dd9eba413fdf97ecaa53e76dbe';
let idBoard = '6234d5eb4b191b7978887fd6';

export const ListContext = React.createContext();

function ListDiv(props){
  const {idlist,listname,data,setData,index,callBack,getCards} = props;
  const [cards,setCards] = useState([]);
  getCards(cards);
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

  function clickHandler(){
    let updatedData = data.filter((element) => {
      return element['id'] !== idlist
    })
    setData(updatedData);
    fetch(`https://api.trello.com/1/lists/${idlist}/closed?key=${key}&token=${token}&value=true`, {
      method: "PUT"
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleOnDragEnd(result){
    console.log(result);
    const items = Array.from(cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCards(items);
  }

  return (
    <div className="list-div" data-idlist={idlist}  data-list-div>
      <div className="heading-and-button">
        <p>{listname}</p>
        <i className="fa-solid fa-xmark" onClick={clickHandler}></i>
      </div>
       <ListContext.Provider value={listname}>
       {
         <Droppable droppableId={idlist} key={idlist}>
         {(provided) => {
           return (
             <ul
               {...provided.droppableProps}
               ref={provided.innerRef}
              >
              {
                cards.map((element,index) => {
                  return (
                    <Draggable key={element['id']} draggableId={element['id']} index={index}>
                    {(provided) => {
                      return <MakeCards element={element} cards={cards} setCards={setCards} provided={provided}/>
                    }}
                    </Draggable>
                  )
                })
              }
              {provided.placeholder}
             </ul>
           )
         }}
          </Droppable>
       }
       </ListContext.Provider>
      <AddCardFormComponent idlist={idlist} setCards={setCards}/>
    </div>
  )
}
export default ListDiv;





// <GetCards idlist={idlist} cards={cards} setCards={setCards} />



// let currentDragItemId;
// function handleDrop(e){
//   console.log(e);
//   if(!e.target.matches('.list-div') &&
//       e.target.localName !== 'ul' &&
//       e.target.localName !== 'li' &&
//       e.taraget.matches('.plus-input')){
//     // console.log('return');
//   }
//   const dragItemId = e.dataTransfer.getData("drag-item");
//   const currentList = document.querySelector(`[data-idlist='${idlist}']`);
//   const afterElement = getDragAfterElement(currentList, e.clientY);
//   const beforeElement = getDragBeforeElement(currentList, e.clientY);
//   let currentCardPos, nextCardPos, previousCardPos;
//   if (!beforeElement && !afterElement) {
//     currentCardPos = null;
//   } else if (!beforeElement) {
//     nextCardPos = parseFloat(afterElement.getAttribute('data-cardpos'));
//     currentCardPos = nextCardPos / 2;
//   } else if (!afterElement) {
//     previousCardPos = parseFloat(beforeElement.getAttribute('data-cardpos'));
//     currentCardPos = previousCardPos * 2;
//   } else {
//     nextCardPos = parseFloat(afterElement.getAttribute('data-cardpos'));
//     previousCardPos = parseFloat(beforeElement.getAttribute('data-cardpos'));
//     currentCardPos = (nextCardPos + previousCardPos) / 2;
//   }
//
//   makeApiCall(dragItemId,currentCardPos);
// }
//
// function makeApiCall(dragItemId,pos){
//   if (pos) {
//     fetch(`https://api.trello.com/1/cards/${dragItemId}?key=${key}&token=${token}&idList=${idlist}&pos=${pos}`, {
//         method: "PUT",
//         headers: {
//           "Accept": "application/json"
//         }
//       })
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         updateState(data,pos);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   } else {
//     fetch(`https://api.trello.com/1/cards/${dragItemId}?key=${key}&token=${token}&idList=${idlist}`, {
//         method: "PUT",
//         headers: {
//           "Accept": "application/json"
//         }
//       })
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         updateState(data,pos);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }
// }
//
// function getDragAfterElement(container,y){
//   const draggableElements = [...container.querySelectorAll('.list-div-li')];
//   return draggableElements.reduce((closest, child) => {
//     const box = child.getBoundingClientRect();
//     // console.log(box);
//     const offset = y - box.top - box.height / 2;
//     if (offset < 0 && offset > closest.offset) {
//       return {
//         offset: offset,
//         element: child
//       };
//     } else {
//       return closest;
//     }
//   }, {
//     offset: Number.NEGATIVE_INFINITY
//   }).element
// }
//
// function getDragBeforeElement(container,y){
//   const draggableElements = [...container.querySelectorAll('.list-div-li')];
//   return draggableElements.reduce((closest, child) => {
//     const box = child.getBoundingClientRect();
//     // console.log(box);
//     const offset = y - box.top - box.height / 2;
//     if (offset > 0 && offset < closest.offset) {
//       return {
//         offset: offset,
//         element: child
//       };
//     } else {
//       return closest;
//     }
//   }, {
//     offset: Number.POSITIVE_INFINITY
//   }).element
// }
//
// function updateState(data,pos){
//   let indexToAdd;
//   for(let counter = 0; counter < cards.length; counter++){
//     if(cards[counter]['pos'] > pos){
//       indexToAdd = counter;
//       break;
//     }
//   }
//
//   let copy = [...cards];
//   indexToAdd ? copy.splice(indexToAdd,0,data) : copy.push(data);
//   setCards(copy);
// }
