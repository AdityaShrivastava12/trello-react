import React,{useState,useEffect} from 'react';
// import AddListSection from './Components/AddListSection';
// import GetLists from './Components/GetLists'
import ListDiv from './Components/ListDiv';
import AddListSection from './Components/AddListSection';
import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd';

export let key = '9b75cc4160800cc67e8dc36b5e621a7b';
export let token = '3e7247cae91c9003f19d8d85425aefe4f8cf85dd9eba413fdf97ecaa53e76dbe';
let idBoard = '6234d5eb4b191b7978887fd6';


export default function App(){
  const [data, setData] = useState([]);
  const [cards,setCards] = useState([]);
  const [clicked,setClick] = useState(false);
  function clickHandler(){
    setClick(!clicked);
  }
  useEffect(() => {
    fetch(`https://api.trello.com/1/boards/${idBoard}/lists?&key=${key}&token=${token}&filter=open`, {
        method: "GET",
        headings: {
          "Accept": "application/json"
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // console.log(response)
        setData(response)
      })

      fetch(`https://api.trello.com/1/boards/${idBoard}/cards?key=${key}&token=${token}`,{
        method: "GET"
      })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setCards(response);
      })

  },[])

  function apiCall(cardId,listId,cardPos){
    fetch(`https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}&idList=${listId}&pos=${cardPos}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json"
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleOnDragEnd(result){
    if(!result.destination) return ;
    const {source,destination} = result;
    let prevPos;
    let nextPos;
    let items = Array.from(cards);
    let removed = items.splice(source.index,1)[0];

    if(source.droppableId !== destination.droppableId) {
      removed['idList'] = destination.droppableId;
      source.index < destination.index ? items.splice(destination.index-1,0,removed) : items.splice(destination.index,0,removed);
    } else {
      items.splice(destination.index, 0, removed);
    }

    let destinationItems = items.filter((elem) => {return elem['idList'] === destination.droppableId});
    console.log(destinationItems);

    let index = destinationItems.indexOf(removed);
    console.log(index);
    console.log(destinationItems[index]);
    console.log(destinationItems[index-1]);
    console.log(destinationItems[index+1]);
    prevPos = destinationItems[index-1] ? destinationItems[index-1]['pos'] : null;
    nextPos = destinationItems[index+1] ? destinationItems[index+1]['pos'] : null;
    console.log(prevPos,nextPos);
    // console.log(source.index,destination.index);
    let cardPos;

    if(!prevPos && nextPos){
      cardPos = nextPos/2;
    } else if(!nextPos && prevPos){
      cardPos = prevPos * 2;
    } else if(!prevPos && !nextPos){
      cardPos = 'top';
    } else{
      cardPos = (prevPos + nextPos)/2;
    }

    let finalIndex = items.indexOf(removed);
    console.log(finalIndex);
    if(typeof cardPos === 'number'){
      items[finalIndex]['pos'] = cardPos;
    }
    setCards(items);

    apiCall(removed['id'],destination.droppableId,cardPos);
  }

  return(
    <React.StrictMode>
    <DragDropContext onDragEnd={handleOnDragEnd}>
    {
      data.map((element,index) => {
        return (
          <ListDiv
            idlist={element['id']}
            listname={element['name']}
            key={element['id']}
            data={data}
            setData={setData}
            index={index}
            cards={cards}
            setCards = {setCards}
          />
        )
      })
    }
    <AddListSection setData={setData}/>
    </DragDropContext>
    </React.StrictMode>
  )
}


// let sourceColumn = data.filter((elem) => {return elem['id'] === source.droppableId})[0];
// let destinationColumn = data.filter((elem) => {return elem['id'] === destination.droppableId})[0];
// let sourceItems = cards.filter((elem) => {return elem['idList'] === source.droppableId});
// let destinationItems = cards.filter((elem) => {return elem['idList'] === destination.droppableId});
// console.log(sourceItems);
// console.log(destinationItems);
// console.log(source.index);
// console.log(destination.index);
// let [removed] = sourceItems.splice(source.index,1);
// destinationItems.splice(destination.index,0,removed);
// removed['idList'] = destination.droppableId;
// console.log(sourceItems);
// console.log(destinationItems);
