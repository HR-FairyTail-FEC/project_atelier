import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {QAContainer, QATitle, QASearchBar, QAList} from './Styled Components/Q&A/qa.styled.js';
const axios = require('axios');
const { Options } = require('../../config.js');


const QA = (props) => {
  let questions = props.details.questions;
  let display;
  let allQ = [];
  const [numQShown, setNumQ] = useState(4);
  const [numAShown, setNumA] = useState(2);
  const [addQPost, setAddQ] = useState(false);
  const [state, setState] = useState({answer:'', question:'', nickname:'', email:''})
  const [clickedAnswer, setClickedAnswer] = useState([]);
  //might have to be global variable
  const [helpfulClickedQ, setHelpfulClickedQ] = useState([]);
  const [helpfulClickedA, setHelpfulClickedA] = useState([]);
  const [reportedQ, setReportedQ] = useState([]);
  const [reportedA, setReportedA] = useState([]);
  // let qShown = [];
  // const [qShown, setQShown] = useState([{ result: props.details.questions[0].results, answers: [] }]);

  if (props.details.length < 1) {
    display = <div>Loading Questions...</div>
    // initialize();
  } else {
    // console.log('always in here')
    questions.results.forEach(result => {
      let allA = [];
      for (let answer in result.answers) {
        allA.push(result.answers[answer]);
      }
      allA.sort((a,b)=>parseFloat(b.helpfulness) - parseFloat(a.helpfulness))
      allQ.push({ result: result, answers: allA });
    })
  }
  allQ.sort((a,b)=>parseFloat(b.result.question_helpfulness) - parseFloat(a.result.question_helpfulness));


  const addQ = () => {
    if (addQPost === false) {
      setAddQ(true);
    } else {
      setAddQ(false);
    }
  }
  const addA = (id) => {
    if (clickedAnswer.includes(id)) {
      setClickedAnswer(clickedAnswer.filter(item => item != id));
    } else {
      setClickedAnswer(prevItem => [id]);
    }
  }

  const postAnswer = (q_id) => {
    axios.post(`http://localhost:3000/api/qa/questions/${q_id}/answers`, {
      data: {
      name: state.nickname,
      email: state.email,
      body: state.answer,
      photos:[]
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const postQuestion = (p_id) => {
    axios.post(`http://localhost:3000/api/qa/questions`,{
      data: {
        body: state.question,
        name: state.nickname,
        email: state.email,
        product_id: Number(p_id)
      }
      })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (err) {
      console.log(err);
    })
  }


  const showMoreQ = () => {
    setNumQ(numQShown + 2);
  }

  function showMoreA() {
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

  const handleReportedQ = (id) => {
    if (reportedQ.includes(id)) {
      setReportedQ(reportedQ.filter(item => item != id));
    } else {
      setReportedQ(prevItem => [...prevItem, id]);
      axios.put(`http://localhost:3000/api/qa/questions/${id}/report`,{})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      })
    }

  }

  const handleReportedA = (id) => {
    if (reportedA.includes(id)) {
      setReportedA(reportedA.filter(item => item != id));
    } else {
      setReportedA(prevItem => [...prevItem, id]);
      axios.put(`http://localhost:3000/api/qa/answers/${id}/report`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      })
    }
  }


  const handleHelpfulClickQ = (id) => {
    if (helpfulClickedQ.includes(id)) {
      setHelpfulClickedQ(helpfulClickedQ.filter(item => item != id));
    } else {
      setHelpfulClickedQ(prevItem => [...prevItem, id]);
      axios.put(`http://localhost:3000/api/qa/questions/${id}/helpful`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      })
    }

  }

  const handleHelpfulClickA = (id) => {
    if (helpfulClickedA.includes(id)) {
      setHelpfulClickedA(helpfulClickedA.filter(item => item != id));
    } else {
      setHelpfulClickedA(prevItem => [...prevItem, id]);
      axios.put(`http://localhost:3000/api/qa/answers/${id}/helpful`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      })
    }
  }

  return (
    <QAContainer>
      <QATitle> `QUESTIONS & ANSWERS` </QATitle>
      <QASearchBar> <input placeholder='SEARCH FOR ANSWERS...'></input> </QASearchBar>
      <QAList>
        {props.details.length < 1 && display}
        <div>{allQ.slice(0, numQShown).map(q => {
          return (
            <div key={q.result.question_id}>
            <div>
              <h3> Q: {q.result.question_body} </h3>
              <span>asked by {q.result.asker_name} on {moment(q.result.question_date).format('MMMM Do YYYY')} | Helpful? <span>{!helpfulClickedQ.includes(q.result.question_id)&& <button type='button' onClick={()=>handleHelpfulClickQ(q.result.question_id)}>Yes?</button>}</span> <span>({q.result.question_helpfulness})</span> <span>{!reportedQ.includes(q.result.question_id) && <button onClick={()=>handleReportedQ(q.result.question_id)}> Report </button>}</span></span>
              <div>
                <button onClick={()=>addA(q.result.question_id)} key={q.result.question_id}>Add Answer</button>
                  <div> {clickedAnswer.includes(q.result.question_id) && variable
              <form>
                <label>
                  Answer This Question:
                  <br />
                  <span>*Your Answer <input type='textarea' name='answer' placeholder="Your Answer" value={state.answer} onChange={handleChange}/></span><br />
                  <span>*Your Nickname <input type="text" name='nickname' placeholder="What's Your Nickname" value={state.nickname} onChange={handleChange}/></span>
                  <span>*Your Email <input type='text' name='email' placeholder='Email Address' value={state.email} onChange={handleChange}/></span>
                </label>
                <button type='button' onClick={()=>postAnswer(q.result.question_id)}>Submit Answer</button>
              </form>
              }
              </div>
            </div>


            <div>{q.answers.slice(0, numAShown).map(a =>
              <div key={a.id}>
                <h4>A: {a.body}</h4>
                <span>
                  answered on {moment(a.date).format('MMMM Do YYYY')} by {a.answerer_name} | Helpful? <span>{!helpfulClickedA.includes(a.id) && <button type='button' onClick={()=>handleHelpfulClickA(a.id)}>Yes?</button>}</span> <span>({a.helpfulness})</span> <span>{!reportedA.includes(a.id) && <button onClick={()=>handleReportedA(a.id)}> Report </button>}</span>
                </span><br />
              </div>
            )}
            </div>

            <div> {(q.answers.length > 2 && numAShown < q.answers.length) && <button onClick={showMoreA}> Load More Answers </button>} </div>
            <div> {(q.answers.length > 2 && numAShown >= q.answers.length) && <button onClick={hideA}> Collapse Answers </button>} </div>
          </div>
        </div>
        )}
          )

        });


          {numQShown < allQ.length && <button onClick={showMoreQ}>Load More Questions</button>}
          <button onClick={addQ}>Add A Question</button>
        </div>
      </QAList>
      <div>{addQPost === true &&
        <form>
          <label>
            Ask A Quesion:
            <br />
            <span>*Your Question <input type='textarea' name='question' placeholder="Your Question" value={state.question} onChange={handleChange}/></span><br />
            <span>*Your Nickname <input type="text" name='nickname' placeholder="What's Your Nickname" value={state.nickname} onChange={handleChange}/></span>
            <span>*Your Email <input type='text' name='email' placeholder='Email Address' value={state.email} onChange={handleChange}/></span>
          </label>
          <button type='button' onClick={()=>postQuestion(questions.product_id)}>Submit Question</button>
        </form>
      }</div>
    </QAContainer>

  );
}

export default QA;