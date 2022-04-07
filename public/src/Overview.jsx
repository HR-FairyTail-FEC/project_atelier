import React, { useState, useEffect } from 'react';

function Overview(props) {
  let feature;
  let photos;
  let details = props.details;
  // console.log(details);
  const [featured, setFeatured] = useState(0);
  const [thumbnailActive, setThumbnailActive] = useState(0);
  const [thumbnails, setThumbnails] = useState(null);
  const [rating, setRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [style, setStyle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(<div></div>);
  const [styleActive, setStyleActive] = useState(0);
  const percentageFill = `${(rating / 5) * 100}%`;
  const innerStarStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: percentageFill
  };

  if (Object.keys(details).length > 0) {
    if (!loading) {
      let curr = details.styles.results[0];
      let photos = curr.photos;
      let total = 0;
      let count = 0;
      let ratings = details.meta.ratings;
      // console.log(ratings);
      for (let rating in ratings) {
        total += rating * ratings[rating];
        count += Number(ratings[rating]);
      }
      let rating = total / count;
      let rounded = (Math.round(rating * 4) / 4).toFixed(2);
      setStyle(curr);
      setStyleActive(details.styles.results[0].style_id);
      setTotalRatings(count);
      setRating(rounded);
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

  const handleThumbnailClick = (e) => {
    setThumbnailActive(Number(e.target.id));
    setFeatured(Number(e.target.id));
  };

  const handleStyleClick = (e) => {
    let newStyle = details.styles.results.filter(item => item.style_id === Number(e.target.id));
    setStyle(newStyle[0]);
    setThumbnails(newStyle[0].photos);
    setStyleActive(e.target.id);
  }

  useEffect(() => {
    if (loading) {
      let featureUrl = thumbnails[featured].thumbnail_url;
      let feature = <img className="feature-img" src={featureUrl}></img>;
      let mapped = [];
      for (let i = 0; i < 4; i++) {
        let photo = thumbnails[i].thumbnail_url;
        if (i === thumbnailActive) {
          mapped.push(<img onClick={handleThumbnailClick} key={i} id={i} className="active" src={photo}></img>);
        } else {
          mapped.push(<img onClick={handleThumbnailClick} key={i} id={i} className="thumbnail-img" src={photo}></img>);
        }
      }
      let styles = [];
      let arr = details.styles.results;
      for (let i = 0; i < arr.length; i++) {
        let id = arr[i].style_id;
        if (id === Number(styleActive)) {
          styles.push(<img onClick={handleStyleClick} className="styles-active styles-thumbnail" id={id} key={id} src={arr[i].photos[0].thumbnail_url}></img>)
        } else {
          styles.push(<img onClick={handleStyleClick} className="styles-thumbnail" id={id} key={id} src={arr[i].photos[0].thumbnail_url}></img>);
        }
      }
      let render =
      <div className="overview-container">
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
        </div>
        <div className="right-container">
          <div>
            <div className="stars-outer">
              <div className="stars-inner" style={innerStarStyle}></div>
            </div>
            <span>Read all {totalRatings} reviews</span>
          </div>
          <div>
            <span>{details.product.category}</span>
            <span>{details.product.name}</span>
            <span>{`$${Math.round(Number(style.original_price))}`}</span>
          </div>
          <div>
            <span>Style > {style.name}</span>
            <div className="styles">
              {styles}
            </div>
          </div>
        </div>
      </div>
      setDisplay(render);
    }
  }, [loading, thumbnails, featured, thumbnailActive, styleActive, style]);

  return (
    <div>
      {console.log('rendering <Overview>')}
      {display}
    </div>
  );
}

export default Overview;
