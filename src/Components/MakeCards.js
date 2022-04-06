import React,{useState,useEffect} from 'react';
import EditBox from './EditBox';
import Modal from './Modal';

let key = '9b75cc4160800cc67e8dc36b5e621a7b';
let token = '3e7247cae91c9003f19d8d85425aefe4f8cf85dd9eba413fdf97ecaa53e76dbe';

export const CardNameContext = React.createContext();
export const CardIdContext = React.createContext();
export const DescriptionContext = React.createContext();
export const SetDescriptionContext = React.createContext();
export const CommentsContext = React.createContext();

function MakeCards({element,cards,setCards,index, handleDragEnter}){
  const [enter,setEnter] = useState(false);
  const [cardName, setCardName] = useState(element['name']);
  const [editIconClick, setEditIconClick] = useState(false);
  const [cardClick,setCardClick] = useState(false);
  const [description,setDescription] = useState('');
  const [commentsArray, setCommentsArray] = useState([]);
  const [checkListArray,setCheckListArray] = useState([])

  function clickHandler(e){
    setEditIconClick(true);
  }

  function cardClickHandler(e){
    if(e.target.localName === 'i' ||
       e.target.localName === 'textarea' ||
       e.target.matches('.overlay') ||
       e.target.localName === 'button'){
      return;
    }

    console.log(description);
    setCardClick(true);
  }
  function overlayCrossClickHandler(){
    setCardClick(false);
    setEnter(false);
  }
  useEffect(() => {
    async function getDescription(){
      let response = await fetch(`https://api.trello.com/1/cards/${element['id']}?key=${key}&token=${token}&fields=desc`, {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      })
      let data = await response.json();
      setDescription(data['desc']);
    }
    getDescription();
    async function getComments(){
      let comments = await fetch(`https://api.trello.com/1/cards/${element['id']}/actions?key=${key}&token=${token}&filter=commentCard`, {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      })
      let commentData = await comments.json();
      setCommentsArray(commentData);
    }
    getComments();

    async function getCheckLists(){
      let checklists = await fetch(`https://api.trello.com/1/cards/${element['id']}/checklists?key=${key}&token=${token}`,{
        method: "GET"
      })
      let checklistsData = await checklists.json();
      console.log(checklistsData);
      setCheckListArray(checklistsData);
    }
    getCheckLists();
  }, [])

  const handleDragStart = (e) => {
      e.dataTransfer.setData("drag-item", e.target.id);
      // e.dataTransfer.setData("drag-list", listId);
    };

    function dragEndHandler(e){
      e.preventDefault();
      // console.log(cards);
      let id = element['id'];
      let updatedData = cards.filter((elem) => {
        return elem['id'] !== id;
      })
      // console.log(updatedData);
      // console.log(element['id']);
      setCards(updatedData);
    }

  return(
    <li id={element['id']} data-cardpos={element['pos']} className="list-div-li"
     onMouseEnter={() => setEnter(true)} onMouseLeave={() => setEnter(false)} onClick={cardClickHandler} draggable
     onDragStart={handleDragStart} onDragEnd={dragEndHandler}>
     {
       editIconClick ?
       <EditBox cardName={cardName} setCardName={setCardName} setEditIconClick={setEditIconClick}
        setEnter={setEnter} cardId={element['id']}/>
       :
       <>
       <p>{cardName}</p>
       {
         enter ?
         <i className="fa-solid fa-pen i-edit" onClick={clickHandler}></i>
         :
         null
       }
       </>
     }
     {
       cardClick ?
       <>
       <div className="overlay" id="overlay">
         <i className="fa-solid fa-xmark fa-xl overlay-cross" id="overlayCross" onClick={overlayCrossClickHandler}></i>
       </div>
       <CardNameContext.Provider value={cardName}>
        <DescriptionContext.Provider value={description}>
         <SetDescriptionContext.Provider value={setDescription}>
          <CardIdContext.Provider value={element['id']}>
           <CommentsContext.Provider value={commentsArray}>
             <Modal setCommentsArray={setCommentsArray} cards={cards} setCards={setCards} setCardClick={setCardClick}
              checkListArray={checkListArray} setCheckListArray={setCheckListArray}/>
           </CommentsContext.Provider>
          </CardIdContext.Provider>
         </SetDescriptionContext.Provider>
        </DescriptionContext.Provider>
       </CardNameContext.Provider>
       </>
       :
        null
     }
    </li>
  )
}
export default MakeCards;
