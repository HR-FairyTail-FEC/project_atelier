import React from 'react';

const CharBar = (props) => {
  let result = props.charBarPercent
  // console.log("result in charbar: ", result)
  return (
    <div className="row-charbar">
      <div className="charbar-characteristic">
      {
        result.Size ?
        <>
          <div className="characteristic-title">Size </div>
          <div className="characteristic-bar-container">
            <div className="bar-size" style={{width: result.Size.valueInPer }}></div>
          </div>
          <div className="characteristic-scale">
            <div className="characteristic-left">Too small</div>
            <div className="characteristic-middle">Perfect</div>
            <div className="characteristic-right">Too wide</div>
          </div>
        </>
        : null
      }
      </div>

      <div className="charbar-characteristic">
      {
        result.Width ?
        <>
          <div className="characteristic-title">Width </div>
          <div className="characteristic-bar-container">
            <div className="bar-width" style={{width: result.Width.valueInPer }}></div>
          </div>
          <div className="characteristic-scale">
            <div className="characteristic-left">Too narrow</div>
            <div className="characteristic-middle">Perfect</div>
            <div className="characteristic-right">Too wide</div>
          </div>
        </>
        : null
      }
      </div>

      <div className="charbar-characteristic">
      {
        result.Fit ?
        <>
          <div className="characteristic-title">Fit </div>
          <div className="characteristic-bar-container">
            <div className="bar-fit" style={{width: result.Fit.valueInPer }}></div>
          </div>
          <div className="characteristic-scale">
            <div className="characteristic-left">Runs Tight</div>
            <div className="characteristic-middle">Perfect</div>
            <div className="characteristic-right">Runs Long</div>
          </div>
        </>
        : null
      }
      </div>

      <div className="charbar-characteristic">
      {
        result.Length ?
        <>
          <div className="characteristic-title">Length </div>
          <div className="characteristic-bar-container">
            <div className="bar-length" style={{width: result.Length.valueInPer }}></div>
          </div>
          <div className="characteristic-scale">
            <div className="characteristic-left">Runs Short</div>
            <div className="characteristic-middle">Perfect</div>
            <div className="characteristic-right">Runs Long</div>
          </div>
        </>
        : null
      }
      </div>

      <div className="charbar-characteristic">
      {
        result.Comfort ?
        <>
          <div className="characteristic-title">Comfort</div>
          <div className="characteristic-bar-container">
            <div className="bar-comfort" style={{width: result.Comfort.valueInPer }}></div>
          </div>
          <div className="characteristic-scale">
            <div className="characteristic-left">Poor</div>
            <div className="characteristic-middle">OK</div>
            <div className="characteristic-right">Perfect</div>
          </div>
        </>
        : null
      }
      </div>

      <div className="charbar-characteristic">
      {
        result.Quality ?
        <>
          <div className="characteristic-title">Quality</div>
          <div className="characteristic-bar-container">
            <div className="bar-quality" style={{width: result.Quality.valueInPer }}></div>
          </div>
            <div className="characteristic-scale">
              <div className="characteristic-left">Poor</div>
              <div className="characteristic-middle">Expected</div>
              <div className="characteristic-right">Perfect</div>
            </div>
          </>
        : null
      }
      </div>
    </div>
  )
}

export default CharBar;