import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { QAContainer, QATitle, QASearchBar, QAList, QAQuestionTop, QAQuestion, QAHelpfulQ, QAHelpfulA, QAReportQ, QAaddA, QAQuestionDetails, QAanswer, QAanswerBody, QAanswerBot, QAanswerInfo, QAReportA, QALoadA, QALoadQ, QAaddQ, QAResult, ContainerBot, QAAnswerList } from './Styled Components/Q&A/qa.styled.js';

const axios = require('axios');
const { Options } = require('../../config.js');
import QAModal from './QAModal.jsx';
import useQAModal from './useQAModal.jsx';
import QAModalA from './QAModalA.jsx';

const QA = (props) => {
  // let productId = props.details.questions.product_id;
  // console.log(productId)
  let display;

  const [numQShown, setNumQ] = useState(4);
  const [numAShown, setNumA] = useState(2);
  const [addQPost, setAddQ] = useState(false);
  const [state, setState] = useState({ answer: '', question: '', nickname: '', email: '', query: '' })
  const [clickedAnswer, setClickedAnswer] = useState([]);
  //might have to be global variable
  const [helpfulClickedQ, setHelpfulClickedQ] = useState([]);
  const [helpfulClickedA, setHelpfulClickedA] = useState([]);
  const [reportedQ, setReportedQ] = useState([]);
  const [reportedA, setReportedA] = useState([]);
  // let qShown = [];
  const [qShown, setQShown] = useState([]);
  const [show, setShow] = useState(false);
  const [showA, setShowA] = useState(false);
  const [post, setPost] = useState(false);


  useEffect(() => {
    if (props.details.length < 1) {
      display = <div>Loading Questions...</div>
      // initialize();
    } else {
      let productId = props.details.questions.product_id;
      let getQuestions = [];
      getQuestions.push(axios.get(`http://localhost:3000/api/qa/questions?product_id=${productId}`));
      Promise.all(getQuestions).then((results) => {
        console.log('this result', results[0].data.results);
        let allQ = [];
        results[0].data.results.forEach(result => {
          let allA = [];
          for (let answer in result.answers) {
            allA.push(result.answers[answer]);
          }
          allA.sort((a, b) => parseFloat(b.helpfulness) - parseFloat(a.helpfulness))
          allQ.push({ result: result, answers: allA });
        })
        allQ.sort((a, b) => parseFloat(b.result.question_helpfulness) - parseFloat(a.result.question_helpfulness));
        allQ = filterQ(allQ, state.query);
        setQShown(allQ);
      })
    }
  }, [props.details, state.query, post])


  function filterQ(list, query) {
    if (query.length === 0) {
      return list;
    }
    return list.filter((item) => {
      const itemBody = item.result.question_body.toLowerCase();
      return itemBody.includes(query);
    })
  }

  const addQ = () => {

    if (addQPost === false) {
      setAddQ(true);
      setShow(true);
    } else {
      setAddQ(false);
    }

  }
  const addA = (id) => {
    if (clickedAnswer.includes(id)) {
      setClickedAnswer(clickedAnswer.filter(item => item != id));
      setShowA(true);
    } else {
      setClickedAnswer(prevItem => [id]);
    }
  }

  const postAnswer = (q_id, name, email, body) => {
    axios.post(`http://localhost:3000/api/qa/questions/${q_id}/answers`, {
      data: {
        name: name,
        email: email,
        body: body,
        photos: []
      }
    })
      .then(function (response) {
        console.log(response);
        setPost(!post);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const postQuestion = (p_id, body, name, email) => {
    axios.post(`http://localhost:3000/api/qa/questions`, {
      data: {
        body: body,
        name: name,
        email: email,
        product_id: Number(p_id)
      }
    })
      .then(function (response) {
        console.log(response);
        setPost(!post);
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
      axios.put(`http://localhost:3000/api/qa/questions/${id}/report`, {})
        .then(function (response) {
          console.log(response);
          setPost(!post);
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
          setPost(!post);
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
          setPost(!post);
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
          setPost(!post);
        })
        .catch(function (err) {
          console.log(err);
        })
    }
  }

  return (
    <QAContainer>
      <QATitle> QUESTIONS & ANSWERS </QATitle>
      <QASearchBar> <input name='query' value={state.query} onChange={handleChange} placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'></input> </QASearchBar>
      <QAList>
        {props.details.length < 1 && display}
        {qShown.slice(0, numQShown).map(q => {
          return (
            <QAResult>
              <QAQuestionTop>
                <QAQuestion>
                  <p> Q: {q.result.question_body} </p>
                </QAQuestion>
                <QAQuestionDetails>
                  asked by {q.result.asker_name} on {moment(q.result.question_date).format('MMMM Do YYYY')}&nbsp;
                  <QAHelpfulQ>
                   | Helpful?
                    {!helpfulClickedQ.includes(q.result.question_id) &&
                      <button type='button' onClick={() => handleHelpfulClickQ(q.result.question_id)}>Yes?</button>}
                    ({q.result.question_helpfulness}) |
                  </QAHelpfulQ>
                  <QAReportQ>
                    {!reportedQ.includes(q.result.question_id) &&
                      <button onClick={() => handleReportedQ(q.result.question_id)}> Report </button>}
                  </QAReportQ>
                  <QAaddA>
                    <button onClick={() => addA(q.result.question_id)} key={q.result.question_id}>Add Answer</button>
                    {clickedAnswer.includes(q.result.question_id) &&
                        <QAModalA id={q.result.question_id} postAnswer={postAnswer} onClose={()=>setShowA(false)} showA={showA}/>
                      }
                  </QAaddA>

                </QAQuestionDetails>
              </QAQuestionTop>

              <QAAnswerList numAShown={numAShown < q.answers.length ? numAShown : q.answers.length}>
                {
                  q.answers.slice(0, numAShown).map(a => {
                    return (
                      <QAanswer>
                        <QAanswerBody> A: {a.body} </QAanswerBody>
                        <QAanswerBot>
                          <QAanswerInfo>
                            <p> answered by {a.answerer_name} on {moment(a.date).format('MMMM Do YYYY')}&nbsp; </p>
                          </QAanswerInfo>
                          <QAHelpfulA>
                            | Helpful? {!helpfulClickedA.includes(a.id) && <button type='button' onClick={() => handleHelpfulClickA(a.id)}>Yes?</button>}
                            ({a.helpfulness})
                          </QAHelpfulA>
                          <QAReportA>
                            {!reportedA.includes(a.id) &&
                              <button onClick={() => handleReportedA(a.id)}> Report </button>}
                          </QAReportA>
                        </QAanswerBot>
                      </QAanswer>
                    )
                  })
                }
                <QALoadA>
                  {(q.answers.length > 2 && numAShown < q.answers.length) && <button onClick={showMoreA}> Load More Answers </button>}
                  {(q.answers.length > 2 && numAShown >= q.answers.length) && <button onClick={hideA}> Collapse Answers </button>}
                </QALoadA>
              </QAAnswerList>
            </QAResult>

          );
        })}

      </QAList>

      <ContainerBot>
          {numQShown < qShown.length && <QALoadQ onClick={showMoreQ}>Load More Questions</QALoadQ>}

          <QAaddQ onClick={addQ}>Add A Question</QAaddQ>
          <div>{addQPost === true &&
            <form>
              <QAModal id={props.details.questions.product_id} postQuestion={postQuestion} onClose={()=>setShow(false)} show={show}/>
            </form>}
          </div>

      </ContainerBot>

    </QAContainer >
  );
}

export default QA;