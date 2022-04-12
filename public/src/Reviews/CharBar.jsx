import React from 'react';

const CharBar = (props) => {
  let result = props.charBarPercent
  console.log("result in charbar: ", result)
  return (
    <div className="row-charbar">
      {result.Fit ?
      <div>Fit
        <div className="bar-container">
          <div className="bar-fit" style={{width: result.Fit.valueInPer }}></div>
        </div>
        <div>Runs Tight</div> <div>Runs Long</div>
      </div> : null}
      {result.Length ?
      <div>Length
        <div className="bar-container">
          <div className="bar-length" style={{width: result.Length.valueInPer }}></div>
        </div>
        <div>Runs Short</div> <div>Runs Long</div>
      </div> : null}
      {result.Comfort ?
      <div>Comfort
        <div className="bar-container">
          <div className="bar-comfort" style={{width: result.Comfort.valueInPer }}></div>
        </div>
        <div>Poor</div> <div>Perfect</div>
      </div> : null}
      {result.Quality ?
      <div>Quality
        <div className="bar-container">
          <div className="bar-quality" style={{width: result.Quality.valueInPer }}></div>
        </div>
        <div>Poor</div> <div>Perfect</div>
      </div> : null}
    </div>
  )
}

export default CharBar;