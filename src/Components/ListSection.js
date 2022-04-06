import React,{useState,useRef} from 'react';
import ListDiv from './ListDiv';
import AddListSection from './AddListSection';

function ListSection(props){
  const {data,setData} = props;

  return (
    <>
     {
       data.map((element,index) => {
         return (
           <ListDiv idlist={element['id']} listname={element['name']}
           key={element['id']} data={data} setData={setData}  index={index}/>
         )
       })
     }
     <AddListSection setData={setData}/>
    </>
  )
}

export default ListSection;
