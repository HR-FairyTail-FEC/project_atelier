import React from 'react';
import moment from 'moment';


const QA = (props) => {
  let questions = props.details.questions;
  let display;
  if (props.details.length < 1) {
    display = <div>Loading Questions..</div>
  } else {
    let allQ = [];
    let allA = [];
    questions.results.forEach(result=>{
      console.log(result.answers)
      for (let answer in result.answers) {
        allA.push(<div>
          <h4>A: {result.answers[answer].body}</h4><br />
          <span> by {result.answers[answer].answerer_name}-{moment(result.answers[answer].date).format('MMMM Do YYYY')} | Helpful? {result.answers[answer].helpfulness}</span>
        </div>);
      }
      allQ.push(<div>
                  <h3> Q: {result.question_body} </h3>
                  <span>{allA}</span>
                  <span>{result.asker_name}-{moment(result.question_date).format('MMMM Do YYYY')} | Helpful {result.question_helpfulness} </span>
                  </div>);
    })
    display = <div>{allQ}</div>
  // console.log('this is question', questions.results[0]);
  }

  return (
    <div>
      <input placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'></input>
      <div>
      {display}
      </div>
      <button>More Answered Questions</button>
      <button>Add A Question</button>
    </div>

  );
}

export default QA;