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

  },[])

  let array;

  function getCards(arg){
    array = arg;
  }

  function handleOnDragEnd(result){
    console.log(array);
    // console.log(result);
    // const items = Array.from(getCards);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);
    // let setCards = getSetCards();
    //
    // setCards(items);
  }

  // // function handleOnDragEnd(){};
  // function callBack(result,handleOnDragEnd){
  //   handleOnDragEnd(result);
  // }

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
            getCards={getCards}
          />
        )
      })
    }
    <AddListSection setData={setData}/>
    </DragDropContext>
    </React.StrictMode>
  )
}
