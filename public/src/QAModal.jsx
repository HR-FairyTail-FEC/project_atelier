import React from 'react';

const QAModal = (props) => {
  return(
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <p>
            Hello, I'm a modal.
          </p>
        </div>
        <div className='modal-body'>
          This is modal content
        </div>
        <div>
          <button className='button'> close</button>
        </div>
      </div>
    </div>
  )
}

export default QAModal;