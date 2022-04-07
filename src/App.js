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
    if(source.droppableId !== destination.droppableId){
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
      let items = Array.from(cards);
      let removed = items.splice(source.index,1)[0];
      // console.log(removed);
      removed['idList'] = destination.droppableId
      source.index < destination.index ? items.splice(destination.index-1,0,removed) : items.splice(destination.index,0,removed);
      setCards(items);
      console.log(items);
      let index = items.indexOf(removed);
      console.log(index);
      let prevPos = items[index-1] ? items[index-1]['pos'] : null;
      let nextPos = items[index+1] ? items[index+1]['pos'] : null;
      console.log(prevPos,nextPos);
      console.log(typeof prevPos);
      let cardPos;
      if(!prevPos){
        cardPos = nextPos/2;
      }
      else if(!nextPos){
        cardPos = prevPos * 2;
      }
      else{
        cardPos = (prevPos + nextPos)/2;
      }
      apiCall(removed['id'],destination.droppableId,cardPos);
    }
    else{
      const items = Array.from(cards);
      const reorderedItem = items.splice(result.source.index, 1)[0];
      items.splice(result.destination.index, 0, reorderedItem);
      setCards(items);
      let index = items.indexOf(reorderedItem);
      let prevPos = items[index-1] ? items[index-1]['pos'] : null;
      let nextPos = items[index+1] ? items[index+1]['pos'] : null;
      let cardPos;
      if(!prevPos){
        cardPos = nextPos/2;
      }
      else if(!nextPos){
        cardPos = prevPos * 2;
      }
      else{
        cardPos = (prevPos + nextPos)/2;
      }
      apiCall(reorderedItem['id'],destination.droppableId,cardPos);
    }
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
