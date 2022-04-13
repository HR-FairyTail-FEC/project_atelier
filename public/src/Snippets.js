//inside QA LIST
// inside return on 266/
                    <QAanswer>
                      <QAanswerBody> <p>A: {a.body}</p> </QAanswerBody>
                      <QAanswerBot>
                        <QAanswerInfo>
                          <p> answered on {moment(a.date).format('MMMM Do YYYY')} by {a.answerer_name} </p>
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