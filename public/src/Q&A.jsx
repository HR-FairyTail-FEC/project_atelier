import React from 'react';
import moment from 'moment';


const QA = (props) => {
  let questions = props.details.questions;
  let display;
  let allQ = [];
  let allA = [];
  const sayHi = () => {
    allA = [];
    console.log(allA)
  }

  if (props.details.length < 1) {
    display = <div>Loading Questions..</div>
  } else {
    console.log(questions.results)
    questions.results.forEach(result => {
      let allA = [];
      for (let answer in result.answers) {
        allA.push(result.answers[answer]);
      }
      console.log(result.answers)
      allQ.push({result: result, answers: allA});
      console.log(result);
    })
    // console.log('this is question', questions.results[0]);
  }

  return (
    <div>
      <input placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'></input>
      {/* <div> */}
      <div>{allQ.map(q => <div>
        <div>
          <h3> Q: {q.result.question_body} </h3>
          <span>{q.result.asker_name}-{moment(q.result.question_date).format('MMMM Do YYYY')} | Helpful {q.result.question_helpfulness} </span>
          <div>{q.answers.map(a =>
            <div>
              <h4>A: {a.body}</h4>
              <span>
                answered on {moment(a.date).format('MMMM Do YYYY')} by {a.answerer_name} | helpful? {a.helpfulness}
                </span>
              </div>
            )}
        </div>
        </div>
      </div>
      )}
      <button onClick={sayHi} >More Answered Questions</button>
      <button>Add A Question</button>
    </div>
    </div>

  );
}

export default QA;