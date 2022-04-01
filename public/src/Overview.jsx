import React, { useState } from 'react';

function Overview(props) {
  let [featured, setFeatured] = useState(0);
  let [active, setActive] = useState(0);
  let display;
  let feature;
  let details = props.details;

  const handleHover = (event) => {
    setActive(event.target.id);
  }

  const handleSelect = (event) => {
    setFeatured(event.target.id);
  }

  if (details.length < 1) {
    display =
    <div>
      <div className="carousel-container"></div>
      <div className="product-detail-container"></div>
    </div>
  } else {
    let featureUrl = details.styles.results[0].photos[featured].thumbnail_url;
    feature = <img className="feature-img" src={featureUrl}></img>
    let photos = details.styles.results[0].photos;
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
