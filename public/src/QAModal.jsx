import React, { useState, useEffect } from 'react';

const QAModal = (props) => {

  const [state, setState] = useState({question: '', nickname: '', email: ''})
  if (!props.show) {
    return null;
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    })
  }

  const postQuestion = () =>{
    props.postQuestion(props.id, state.question, state.nickname, state.email);
    props.onClose();
  }

  return(
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e=>e.stopPropagation()}>
        <div className="modal-header">
          <p>
            Ask A Question
          </p>
        </div>
        <div className='modal-body'>
          <form>
              <label>
              <div>
                *Your Question <input type='textarea' name='question' placeholder="Your Question" value={state.question} onChange={handleChange}/><br></br>
                *Your Nickname <input type="text" name='nickname' placeholder="What's Your Nickname" value={state.nickname} onChange={handleChange}/><br></br>
                *Your Email <input type='text' name='email' placeholder='Email Address' value={state.email} onChange={handleChange} /> &nbsp;
                </div>
              </label>
              <button type='button' onClick={() => postQuestion()}>Submit Question</button>
            </form>
        </div>
        <div>
          <button onClick ={props.onClose} className='button'> close</button>
        </div>
      </div>
    </div>
  )
}

export default QAModal;