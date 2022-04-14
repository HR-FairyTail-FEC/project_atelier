import React, { useState, useEffect } from 'react';

const QAModalA = (props) => {

  const [state, setState] = useState({ answer: '', nickname: '', email: '' })
  if (!props.showA) {
    return null;
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    })
  }

  const postAnswer = () => {
    props.postAnswer(props.id, state.nickname, state.email, state.answer);
    props.onClose();
  }

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            Answer Question:
          </h3>
        </div>
        <div className='modal-body'>
          <form>
            <label>
            <span>*Your Answer <input type='textarea' name='answer' placeholder="Your Answer" value={state.answer} onChange={handleChange} /></span><br></br>
              <span>*Your Nickname <input type="text" name='nickname' placeholder="What's Your Nickname" value={state.nickname} onChange={handleChange} /></span><br></br>
              <span>*Your Email <input type='text' name='email' placeholder='Email Address' value={state.email} onChange={handleChange} /></span><br></br>
            </label>
            <button type='button' onClick={() => postAnswer()}>Submit Answer</button>
          </form>
        </div>
        <div>
          <button onClick={props.onClose} className='button'> close</button>
        </div>
      </div>
    </div>
  )
}

export default QAModalA;