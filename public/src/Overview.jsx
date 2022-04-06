import React, { useState, useEffect } from 'react';

function Overview(props) {
  let feature;
  let photos;
  let details = props.details;
  console.log(details);
  const [featured, setFeatured] = useState(0);
  const [thumbnailActive, setThumbnailActive] = useState(0);
  const [thumbnails, setThumbnails] = useState(null);
  const [rating, setRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [style, setStyle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(<div></div>);
  const [styleActive, setStyleActive] = useState(0);
  const [skuActive, setSkuActive] = useState(null);
  const [quantity, setQuantity] = useState(1);
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
      for (let rating in ratings) {
        total += rating * ratings[rating];
        count += Number(ratings[rating]);
      }
      let rating = total / count;
      let rounded = (Math.round(rating * 4) / 4).toFixed(2);
      let skus = details.styles.results[0].skus;
      setStyle(curr);
      setStyleActive(details.styles.results[0].style_id);
      setTotalRatings(count);
      setRating(rounded);
      setLoading(true);
      setThumbnails(photos);
      setSkuActive(Object.keys(skus)[0]);
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
    setSkuActive(Object.keys(newStyle[0].skus)[0]);
  };

  const handleSizeClick = (e) => {
    setSkuActive(e.target.id);
    setQuantity(1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity === 1) {
        return 1;
      } else {
        return prevQuantity - 1;
      }
    });
  };

  const handleIncrease = () => {
    let max = Math.min(style.skus[skuActive]['quantity'], 15);
    setQuantity((prevQuantity) => {
      if (prevQuantity === max) {
        return max;
      } else {
        return prevQuantity + 1;
      }
    })
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
          let active =
          <div className="position-relative">
            <i className="checkmark fa-regular fa-circle-check fa-lg"></i>
            <img onClick={handleStyleClick} className="styles-active styles-thumbnail" id={id} key={id} src={arr[i].photos[0].thumbnail_url}></img>
          </div>;
          styles.push(active);
        } else {
          styles.push(<img onClick={handleStyleClick} className="styles-thumbnail" id={id} key={id} src={arr[i].photos[0].thumbnail_url}></img>);
        }
      }
      let price;
      if (style.sale_price) {
        price =
        <div>
          <span style={{color: 'red', marginRight: '15px'}}>{`$${Math.round(Number(style.sale_price))}`}</span>
          <s>{`$${Math.round(Number(style.original_price))}`}</s>
        </div>
      } else {
        price = <span>{`$${Math.round(Number(style.original_price))}`}</span>;
      }
      let sizes = [];
      let sizeSelector;
      let skus = style.skus;
      let cart;
      for (let sku in skus) {
        let curr = skus[sku];
        if (curr.quantity > 0) {
          if (sku === skuActive) {
            sizes.push(<div onClick={handleSizeClick} className="size-item-container size-active"><span onClick={handleSizeClick} id={sku} className="size-item">{curr.size}</span></div>);
          } else {
            sizes.push(<div onClick={handleSizeClick} className="size-item-container"><span onClick={handleSizeClick} id={sku} className="size-item">{curr.size}</span></div>);
          }
        }
      }
      if (sizes.length > 0) {
        cart = <button className="cart-btn">Add to bag</button>;
        sizeSelector =
        <div className="size-selector">
          {sizes}
        </div>
      } else {
        sizeSelector = <span>Out of Stock!</span>
      }
      let quantityDisplay;
      quantityDisplay =
      <div className="quantity-container">
        <i onClick={handleDecrease} className="fa-solid fa-minus plus-minus"></i>
        <span className="quantity">{quantity}</span>
        <i onClick={handleIncrease} className="fa-solid fa-plus plus-minus"></i>
      </div>
      let render =
      <div className="overview-container">
        <div className="left-container">
          <div className="carousel-container">
            <div className="thumbnail-container">
              {mapped}
              <img onClick={handleArrowClick} className="thumbnail-arrow" src="https://icons.veryicon.com/png/o/internet--web/prejudice/down-arrow-5.png"></img>
            </div>
            <div className="feature-container">
              {feature}
            </div>
          </div>
        </div>
        <div className="right-container">
          <div className="padding-left-10">
            <div className="stars-outer">
              <div className="stars-inner" style={innerStarStyle}></div>
            </div>
            <span>Read all {totalRatings} reviews</span>
          </div>
          <div className="padding-left-10">
            <span>{details.product.category}</span><br></br>
            <span>{details.product.name}</span><br></br>
            {price}
          </div>
          <div>
            <span className="padding-left-10">Style > {style.name}</span>
            <div className="styles">
              {styles}
            </div>
          </div>
          <div>
            <span style={{paddingLeft: '10px'}}>Select Size</span>
            {sizeSelector}
          </div>
          <div>
            <span style={{paddingLeft: '10px'}}>Select Quantity</span>
            {quantityDisplay}
          </div>
          <div>
            {cart}
          </div>
        </div>
      </div>
      setDisplay(render);
    }
  }, [loading, thumbnails, featured, thumbnailActive, styleActive, style, skuActive, quantity]);

  return (
    <div>
      {display}
    </div>
  );
}

export default Overview;
