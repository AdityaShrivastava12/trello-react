import React from 'react'

function FormAddlist({submitHandler,clickHandler,buttonText,placeholderText}){
  return(
    <form className='form-addlist' id="formAddList" onSubmit={submitHandler}>
      <input type="text" name='textInput' id="textInput" className="add-list-input"
      placeholder={placeholderText} />
      <div className="button-and-cross" id="buttonAndCross">
        <button type="submit" className="add-card-button" id="addListButton">{buttonText}</button>
        <i className="fa-solid fa-xmark fa-xl form-cross" id="list-cross" onClick={clickHandler}></i>
      </div>
    </form>
  )
}
export default FormAddlist;
