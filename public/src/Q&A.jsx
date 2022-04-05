import React, { useState, useEffect } from 'react';
import moment from 'moment';


const QA = (props) => {
  let questions = props.details.questions;
  let display;
  let allQ = [];
  const [numQShown, setNumQ] = useState(2);
  const [numAShown, setNumA] = useState(2);
  const [addQPost, setAddQ] = useState(false);
  const [addAPost, setAddA] = useState(false);
  const [state, setState] = useState({answer:'', question:'', nickname:'', email:''})
  // let qShown = [];
  // const [qShown, setQShown] = useState([{ result: props.details.questions[0].results, answers: [] }]);
  let initLoad = false;
  const [qShown, setQShown] = useState([]);

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
  }


  const addQ = () => {
    if (addQPost === false) {
      setAddQ(true);
    } else {
      setAddQ(false);
    }
  }
  const addA = () => {
    if (addAPost === false) {
      setAddA(true);
    } else {
      setAddA(false);
    }
  }



  const showMoreQ = () => {
    setNumQ(numQShown + 2);
  }

  const showMoreA = () => {
    setNumA(numAShown + 2);
  }

  const hideA = () => {
    setNumA(2);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    })
  }

  return (
    <div>
      <input placeholder='SEARCH FOR ANSWERS...'></input>
      {props.details.length < 1 && display}

      <div>{allQ.slice(0, numQShown).map(q => <div key={q.result.question_id}>
        <div>
          <h3> Q: {q.result.question_body} </h3>
          <span>asked by {q.result.asker_name} on {moment(q.result.question_date).format('MMMM Do YYYY')} | Helpful {q.result.question_helpfulness} </span>

          <div>
            <button onClick={addA}>Add Answer</button>
            <div> {addAPost === true &&
            <form>
            <label>
              Answer This Question:
              <br />
              <span>*Your Answer <input type='textarea' name='answer' placeholder="Your Answer" value={state.answer} onChange={handleChange}/></span><br />
              <span>*Your Nickname <input type="text" name='nickname' placeholder="What's Your Nickname" value={state.nickname} onChange={handleChange}/></span>
              <span>*Your Email <input type='text' name='email' placeholder='Email Address' value={state.email} onChange={handleChange}/></span>
            </label>
            <button>Submit Answer</button>
          </form>
            } </div>
          </div>


          <div>{q.answers.slice(0, numAShown).map(a =>
            <div key={a.id}>
              <h4>A: {a.body}</h4>
              <span>
                answered on {moment(a.date).format('MMMM Do YYYY')} by {a.answerer_name} | helpful? {a.helpfulness}
              </span><br />
            </div>
          )}
          </div>

          <div> {(q.answers.length > 2 && numAShown < q.answers.length) && <button onClick={showMoreA}> More Answers </button>} </div>
          <div> {(q.answers.length > 2 && numAShown >= q.answers.length) && <button onClick={hideA}> Collapse Answers </button>} </div>
        </div>
      </div>
      )}

        {numQShown < allQ.length && <button onClick={showMoreQ}>More Answered Questions</button>}
        <button onClick={addQ}>Add A Question</button>
      </div>
      <div>{addQPost === true &&
        <form>
          <label>
            Ask A Quesion:
            <br />
            <span>*Your Question <input type='textarea' name='question' placeholder="Your Question" value={state.question} onChange={handleChange}/></span><br />
            <span>*Your Nickname <input type="text" name='nickname' placeholder="What's Your Nickname" value={state.nickname} onChange={handleChange}/></span>
            <span>*Your Email <input type='text' name='email' placeholder='Email Address' value={state.email} onChange={handleChange}/></span>
          </label>
          <button>Submit Question</button>
        </form>
      }</div>
    </div>

  );
}

export default QA;