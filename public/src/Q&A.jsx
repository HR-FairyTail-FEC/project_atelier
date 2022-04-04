import React, { useState, useEffect } from 'react';
import moment from 'moment';


const QA = (props) => {
  let questions = props.details.questions;
  let display;
  let allQ = [];
  let numQShown = 2;

  // let qShown = [];
  // const [qShown, setQShown] = useState([{ result: props.details.questions[0].results, answers: [] }]);
  const [qShown, setQShown] = useState([]);
  // const sayHi = () => {
  //   if (allQ.length ===1) {
  //     setQShown(allQ);
  //   } else if (allQ.length>=2) {
  //     setQShown([allQ[0], allQ[1]]);
  //   }
  //   // setQShown(allQ);
  //   // console.log('hi');
  // }
  // console.log('bye')
  useEffect(() => {
    console.log('here')

    console.log(allQ)
    if (allQ.length === 1 && allQ[0]) {
      // const [qShown, setQShown] = useState([allQ[0]]);
      setQShown([allQ[0]])
    } else if (allQ.length >= 2 && allQ[1]) {
      // const [qShown, setQShown] = useState([allQ[0], allQ[1]]);
      setQShown([allQ[0], allQ[1]])
    }
    // initialize();
  })
  if (props.details.length < 1) {
    display = <div>Loading Questions..</div>
    // initialize();
  } else {

    // console.log('always in here')
    questions.results.forEach(result => {
      let allA = [];
      for (let answer in result.answers) {
        allA.push(result.answers[answer]);
      }
      allQ.push({ result: result, answers: allA });
    })
    // if (allQ[0] && props.details.length === 1) {
    //   setQShown([allQ[0]]);
    // } else if (allQ[1] && allQ[0]) {
    //   qShown[allQ[0], allQ[1]];
    // }
    // console.log('this is question', questions.results[0]);
    // initialize();
    console.log(qShown);
  }

  // const initialize = () => {

  // }
  // initialize();


  // if (props.details.length <= 2) {
  //   setQShown(allQ);
  // }
  // let initQ = [];
  // if (allQ.length <= 2 ) {
  //   for (let i = 0; i < allQ.length; i++) {
  //     initQ.push(allQ[i])
  //   }
  //   setQShown(initQ);
  // } else {
  //   for (let i = 0; i < 2; i++) {
  //     initQ.push(allQ[i])
  //   }
  //   setQShown(initQ);
  // }

  // if (allQ.length <= 2){
  //   setQShown(allQ);
  // }

  const showQ = () => {
    if (allQ.length <= 2) {
      setQShown(allQ)
    }
    if (allQ.length > 2 && numQShown <= allQ.length) {
      var newQ = [];
      for (let i = 0; i < numQShown; i++) {
        newQ.push(allQ[i]);
      }
      setQShown(newQ);
      numQShown += 2;
    }
  }
  return (
    <div>
      {/* {sayHi()} */}
      <input placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'></input>
      {/* <div> */}

      <div>{qShown.map(q => <div>
        <div>
          <h3> Q: {q.result.question_body} </h3>
          <span>asked by {q.result.asker_name} on {moment(q.result.question_date).format('MMMM Do YYYY')} | Helpful {q.result.question_helpfulness} </span>
          <div>{q.answers.map(a =>
            <div>
              <h4>A: {a.body}</h4>
              <span>
                answered on {moment(a.date).format('MMMM Do YYYY')} by {a.answerer_name} | helpful? {a.helpfulness}
              </span><br />
            </div>
          )}
          </div>
        </div>
      </div>
      )}
        <button onClick={showQ} >More Answered Questions</button>
        <button>Add A Question</button>
      </div>
    </div>

  );
}

export default QA;