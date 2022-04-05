import React,{useState,useContext} from 'react';
import {ListContext} from './ListDiv';
import {CardNameContext} from './MakeCards';

function ModalHeading(){
  const listname = useContext(ListContext);
  const cardname = useContext(CardNameContext);
  return (
    <div className="cardpopup-elementstructure card-popup-heading">
      <div className="heading-text" id="headingCardName">{cardname}</div>
      <div className="in-list">in list <span className="in-list-name" id="inListName">{listname}</span></div>
    </div>
  )
}
export default ModalHeading;
