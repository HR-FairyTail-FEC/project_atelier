import React, { useState, useEffect } from 'react';

function Overview(props) {
  let display;
  let feature;
  let photos;
  let details = props.details;
  let [featured, setFeatured] = useState(0);
  let [active, setActive] = useState(0);
  let [start, setStart] = useState(0);
  let [end, setEnd] = useState(3);

  const handleHover = (event) => {
    setActive(event.target.id);
  }
  const handleSelect = (event) => {
    setFeatured(event.target.id);
    setActive(event.target.id);
  }

  if (details.length < 1) {
    display =
    <div>
      <div className="carousel-container"></div>
      <div className="product-detail-container"></div>
    </div>
  } else {
    photos = details.styles.results[0].photos;
    let featureUrl = details.styles.results[0].photos[featured].thumbnail_url;
    feature = <img className="feature-img" src={featureUrl}></img>;
    let mapped = [];
    for (let i = 0; i < photos.length; i++) {
      let photo = photos[i];
      if (i === active) {
        mapped.push(<img onClick={handleSelect} onMouseEnter={handleHover} id={i} key={i} className="thumbnail-img active" src={photo.thumbnail_url}></img>)
      } else {
        mapped.push(<img onClick={handleSelect} onMouseEnter={handleHover} id={i} key={i} className="thumbnail-img" src={photo.thumbnail_url}></img>);
      }
    }
    display =
    <div>
      <div className="carousel-container">
        <div className="thumbnail-container">
          {mapped}
          <img className="thumbnail-arrow" src="https://images.squarespace-cdn.com/content/v1/5bbd01503560c334e3d24981/1551746621260-M55SZ54KVQJWN784VA38/arrow-down.png"></img>
        </div>
        <div>
          {feature}
        </div>
      </div>
      <div className="product-detail-container"></div>
    </div>
  }

  return (
    <div className="overview-container">
      {display}
    </div>
  );
}

export default Overview;
