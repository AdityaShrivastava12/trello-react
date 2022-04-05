import React,{useState,useEffect} from 'react';
import GetCards from './GetCards';
import AddCardFormComponent from './AddCardFormComponent';

export let key = '9b75cc4160800cc67e8dc36b5e621a7b';
export let token = '3e7247cae91c9003f19d8d85425aefe4f8cf85dd9eba413fdf97ecaa53e76dbe';
let idBoard = '6234d5eb4b191b7978887fd6';

export const ListContext = React.createContext();

function ListDiv(props){
  const {idlist,listname,data,setData} = props;
  const [cards,setCards] = useState([]);

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



  return (
    <div className="list-div" data-idlist={idlist}  data-list-div>
      <div className="heading-and-button">
        <p>{listname}</p>
        <i className="fa-solid fa-xmark" onClick={clickHandler}></i>
      </div>
      <ul>
       <ListContext.Provider value={listname}>
         <GetCards idlist={idlist} cards={cards} setCards={setCards}/>
       </ListContext.Provider>
      </ul>
      <AddCardFormComponent idlist={idlist} setCards={setCards}/>
    </div>
  )
}
export default ListDiv;
