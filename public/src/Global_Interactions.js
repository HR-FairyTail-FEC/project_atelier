import axios from 'axios';

export let callInteraction=(element, widget, time) =>{
  // console.log('in call interaction with', element, widget, time);
  let data = {
    element: element,
    widget:widget,
    time: time.toString()
  }
  // console.log('data To Send is ', data)
  axios.post(`http://${location.hostname}:3000/api/interactions`, data)
  .then(res => {
    // console.log('response from interactions API', res);
  })
  .catch(err => {
    // console.error(err);
  });

}
