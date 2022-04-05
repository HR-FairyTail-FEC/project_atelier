import React, {useState, useEffect} from 'react';


const ActionButton_Star = (props)=> {
  console.log('in actionButton_Star with props', props);
  let index = props.index;
    return (
      <div className="actionbutton-star" onClick={starClick}>
      <svg width="24px" height="24px" viewBox="0 0 32 32">
        <defs>
          <linearGradient id="grad">
            <stop offset="100%" stopColor="white"/>
            <stop offset="0%" stopColor="black"/>
          </linearGradient>
        </defs>
        <path fill="url(#grad)" stroke="#000000"  strokeWidth="1.8px" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118 l11.547-1.2L16.026,0.6L20.388,10.918z"/>
      </svg>
    </div>
    )

};

const starClick = ()=>{
  console.log('in star click');
}

export default ActionButton_Star;
