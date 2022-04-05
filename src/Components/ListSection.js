import React,{useState} from 'react';
import ListDiv from './ListDiv';
import AddListSection from './AddListSection';

function ListSection(props){
  const {data,setData} = props;
  return (
    <>
     {
       data.map((element) => {
         return (
           <ListDiv idlist={element['id']} listname={element['name']}
           key={element['id']} data={data} setData={setData}/>
         )
       })
     }
     <AddListSection setData={setData}/>
    </>
  )
}

export default ListSection;
