import React, { useState, useEffect } from 'react';

function Overview(props) {
  let display;
  let feature;
  let photos;
  let details = props.details;
  let [{featured, active, clicked, start, end, thumbnails}, setState] = useState({
    featured: 0,
    active: null,
    clicked: 0,
    start: 0,
    end: 3
  });

  const handleArrowClick = (photos) => {
    let last = photos.length - 1;
    if (end === last) {
      setState({featured, active, clicked, start: start + 1, end: 0});
    }
    if (start === last) {
      setState({featured, active, clicked, start: 0, end: end + 1});
    }
    if (start !== last && end !== last) {
      setState({featured, active, clicked, start: start + 1, end: end + 1});
    }
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
    if (end < start) {
      let sliced = photos.slice(start).concat(photos.slice(0, end + 1));
      for (let i = 0; i < sliced.length; i++) {
        let photo = sliced[i];
        if (i === active) {
          mapped.push(<img onClick={(e) => setState({featured: e.target.id, active, clicked: e.target.id, start, end})} onMouseEnter={(e) => setState({featured, active: e.target.id, clicked, start, end})} id={i} key={i} className="thumbnail-img active" src={photo.thumbnail_url}></img>)
        } else if (i === clicked) {
          mapped.push(<img onClick={(e) => setState({featured: e.target.id, active, clicked: e.target.id, start, end})} onMouseEnter={(e) => setState({featured, active: e.target.id, clicked, start, end})} id={i} key={i} className="clicked" src={photo.thumbnail_url}></img>)
        } else {
          mapped.push(<img onClick={(e) => setState({featured: e.target.id, active, clicked: e.target.id, start, end})} onMouseEnter={(e) => setState({featured, active: e.target.id, clicked, start, end})} id={i} key={i} className="thumbnail-img" src={photo.thumbnail_url}></img>);
        }
      }
    }
    if (start < end) {
      let sliced = photos.slice(start, end + 1);
      for (let i = 0; i < sliced.length; i++) {
        let photo = sliced[i];
        if (i === active) {
          mapped.push(<img onClick={(e) => setState({featured: e.target.id, active, clicked: e.target.id, start, end})} onMouseEnter={(e) => setState({featured, active: e.target.id, clicked, start, end})} id={i} key={i} className="thumbnail-img active" src={photo.thumbnail_url}></img>)
        } else if (i === clicked) {
          mapped.push(<img onClick={(e) => setState({featured: e.target.id, active, clicked: e.target.id, start, end})} onMouseEnter={(e) => setState({featured, active: e.target.id, clicked, start, end})} id={i} key={i} className="clicked" src={photo.thumbnail_url}></img>)
        } else {
          mapped.push(<img onClick={(e) => setState({featured: e.target.id, active, clicked: e.target.id, start, end})} onMouseEnter={(e) => setState({featured, active: e.target.id, clicked, start, end})} id={i} key={i} className="thumbnail-img" src={photo.thumbnail_url}></img>);
        }
      }
    }
    display =
    <div className="left-container">
      <div className="carousel-container">
        <div className="thumbnail-container">
          {mapped}
          <img onClick={() => handleArrowClick(photos)} className="thumbnail-arrow" src="https://images.squarespace-cdn.com/content/v1/5bbd01503560c334e3d24981/1551746621260-M55SZ54KVQJWN784VA38/arrow-down.png"></img>
        </div>
        <div className="feature-container">
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
