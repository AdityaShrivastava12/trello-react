import React,{useState,useEffect} from 'react';
import GetCards from './GetCards';
import AddCardFormComponent from './AddCardFormComponent';
import ListSection from './ListSection'

export let key = '9b75cc4160800cc67e8dc36b5e621a7b';
export let token = '3e7247cae91c9003f19d8d85425aefe4f8cf85dd9eba413fdf97ecaa53e76dbe';
export let idBoard = '6234d5eb4b191b7978887fd6';

function GetLists(){
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
  return (
    <>
      <ListSection data={data} setData={setData}/>
    </>
  )
}
export default GetLists;
