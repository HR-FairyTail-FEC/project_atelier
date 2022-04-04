import React, { useState, useEffect } from 'react';

function Overview(props) {
  let feature;
  let photos;
  let details = props.details;
  const [featured, setFeatured] = useState(0);
  const [active, setActive] = useState(0);
  const [thumbnails, setThumbnails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(<div></div>);

  if (Object.keys(details).length > 0) {
    if (!loading) {
      let photos = details.styles.results[0].photos;
      setLoading(true);
      setThumbnails(photos);
    }
  }

  const handleArrowClick = () => {
    let arr = [...thumbnails];
    let temp = arr.shift();
    arr.push(temp);
    setThumbnails(arr);
  };

  const handleImageClick = (e) => {
    setActive(Number(e.target.id));
    setFeatured(Number(e.target.id));
  };

  useEffect(() => {
    if (loading) {
      let featureUrl = thumbnails[featured].thumbnail_url;
      let feature = <img className="feature-img" src={featureUrl}></img>;
      let mapped = [];
      for (let i = 0; i < 4; i++) {
        let photo = thumbnails[i].thumbnail_url;
        if (i === active) {
          mapped.push(<img onClick={handleImageClick} key={i} id={i} className="active" src={photo}></img>);
        } else {
          mapped.push(<img onClick={handleImageClick} key={i} id={i} className="thumbnail-img" src={photo}></img>);
        }
      }
      let carousel =
      <div className="left-container">
        <div className="carousel-container">
          <div className="thumbnail-container">
            {mapped}
            <img onClick={handleArrowClick} className="thumbnail-arrow" src="https://images.squarespace-cdn.com/content/v1/5bbd01503560c334e3d24981/1551746621260-M55SZ54KVQJWN784VA38/arrow-down.png"></img>
          </div>
          <div className="feature-container">
            {feature}
          </div>
        </div>
        <div className="product-detail-container"></div>
      </div>
      setDisplay(carousel);
    }
  }, [loading, thumbnails, featured, active]);

  return (
    <div className="overview-container">
      {display}
    </div>
  );
}

export default Overview;
