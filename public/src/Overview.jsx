import React from 'react';

function Overview(props) {
  let display;
  let details = props.details;
  if (details.length < 1) {
    display = <div>Page is loading...</div>;
  } else {
    let images = details.styles.results[0].photos;
    let feature = images[0].thumbnail_url;
    display =
      <div>
        <img className="feature-img" src={feature}></img>
        <img className="thumbnail-img active" src="https://source.unsplash.com/random/200x200?sig=1" />
        <img className="thumbnail-img" src="https://source.unsplash.com/random/200x200?sig=2" />
        <img className="thumbnail-img" src="https://source.unsplash.com/random/200x200?sig=3" />
        <img className="thumbnail-img" src="https://source.unsplash.com/random/200x200?sig=4" />
      </div>
  }

  return (
    <div className="overview-container">
      <div className="carousel-container">
        { display }
      </div>
      <div className="product-detail-container">
      </div>
    </div>
  );
}

export default Overview;
