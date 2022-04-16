# Project Atelier
Software Team: [Dennis Cao](https://www.linkedin.com/in/dennisrcao/), Andy Chan, Francesco Garofalo, Dong Hyoung Kim



https://user-images.githubusercontent.com/521934/163687532-a9dc7422-485c-4f84-80c3-edb728b2e5f4.mov


## Project Overview

This Hack Reactor front-end project is a multi-page e-commerce website retrieving all product information from an API database.
Given a wireframe design, our group of four software engineers developed a front-end project reflecting the design and following a list of features requirements.
Users will be able to interact with the UI and view products or services for sale. 


## Tech Stack
**Built with**
- Javascript, CSS, HTML <img height="16" width="16" src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" /><img height="16" width="16" src="https://simpleicons.org/icons/css3.svg" /><img height="16" width="16" src="https://simpleicons.org/icons/html5.svg" />
- [React](https://reactjs.org/)  <img height="16" width="16" src="https://simpleicons.org/icons/react.svg" />
- [React Styled Components](https://styled-components.com/)  <img height="18" width="18" src="https://simpleicons.org/icons/styledcomponents.svg" />
- [Node.js](https://nodejs.org/en/)  <img height="16" width="16" src="https://simpleicons.org/icons/nodedotjs.svg" />
- [Express](https://expressjs.com/)  <img height="16" width="16" src="https://github.com/get-icon/geticon/raw/master/icons/express.svg" />
- [Axios](https://www.npmjs.com/package/axios)  <img height="16" width="16" src="https://simpleicons.org/icons/nodedotjs.svg" />
- [Babel](https://babeljs.io/)  <img height="16" width="16" src="https://simpleicons.org/icons/babel.svg" />
- [Webpack](https://webpack.js.org/)  <img height="16" width="16" src="https://simpleicons.org/icons/webpack.svg" />
- [Jest](https://jestjs.io/docs/getting-started)  <img height="16" width="16" src="https://simpleicons.org/icons/jest.svg" />
- [npm](https://www.npmjs.com/)  <img height="16" width="16" src="https://simpleicons.org/icons/npm.svg" />
- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)  <img height="16" width="16" src="https://simpleicons.org/icons/testinglibrary.svg" />
- [AWS](https://aws.amazon.com/ec2/)  <img height="16" width="16" src="https://simpleicons.org/icons/amazonaws.svg" />


## Description

Our application allows the user to click through products and styles to add a product to their shopping carts. In addition, users can see the current questions asked for the selected product as well as add their own questions & answers. At the very bottom, users can view reviews written by other customers. There is a star rating for each product. The user can add their own rating and review to the products. Overall, there is a click tracker that logs the users’ click interactions into an API.

Featured components include adding an Overiew, Related Products + Outfits, Questions & Answers and Reviews.

**Main Components**
1) **Product Overview**
* The Overview module is top-most module on the Product Detail page.
* This component will guide the customer through selecting a specific style and size to add to their cart.
2) **Related Products & Outfits**

    2.1) Related Products
    * Related items to the current product are shown as seperate cards. 
    * Each related item card has a thumbnail photo, category, name, price, and averaged star ratin.
    * Additionally, each card has an action button star that pops out a modal which compares features of the current product to the selected related product. 
    * At most 4 related items are shown, if more exist a carousel feature will emerge to help the user flip through. 
    2.2) Outfit List
    * An "Add To Outfit" button allows users to add the currently selected product/style to their outfits list
    * A carousel feature shows only the last 3 items added to the outfit.
    * This list persists after the user visits other pages.

3) Questions & Answers
* The Questions & Answers module allows asking and answering of questions for the product selected.
* This component extends the ability to view and search questions, ask questions, answer questions and provide feedback on questions about the current product.
4) Ratings & Reviews
* The Ratings & Reviews module will allow viewing and submission of reviews for the product selected.
* This component extends the ability to write, read, and browse through reviews for the current product.

![product overview component](https://github.com/Louis-La/atelier-front-end-capstone-project/blob/main/screenshots/ProductOverview.png)
![related products component](https://github.com/Louis-La/atelier-front-end-capstone-project/blob/main/screenshots/RelatedProducts.png)
[Questions & Answers Screenshot Link](https://drive.google.com/file/d/1Rchka4OMjUognCv3MwobskHrvEwxBQef/view?usp=sharing)

[Ratings & Reviews Screenshot Link](https://drive.google.com/file/d/1A28eU5CArZtWi7UuVLrLoFR0wghoDS8g/view?usp=sharing)

---
**Wireframe design & Finished Product (Overview Module)**

![wireframe](https://github.com/Louis-La/atelier-front-end-capstone-project/blob/main/WireframeAndBusinessDoc/ProductOverviewWireFrameComparison.png)

---
**Installation**

Our application uses React, Express, Axios, jQuery,  webpack, and babelrc mainly. The developer needs node installed and would just need to run an npm install and then run the npm commands to start webpack and the server. The developer would also need their own config files such as a GitHub token and an imgBB key, in order to use the image upload function.

1) Install all packages by running the following commands in your terminal.
```
npm install
```
2) Start the server.
```
npm run server
```
3) On a separate terminal, run webpack.
```
npm run webpack
```

4) Rename the `example.config.js` file to `config.js`

5) Insert your own GitHub token and imgBB token into the `config.js` file.

6) Open the project in your web browser.
http://localhost:3000/

---
**LightHouse Audit Results**

These are screenshots of the LightHouse audit results (taken locally) for desktop.

Page performance goals:
* Time to First Paint: 0.8 seconds
* Time to First Meaningful Paint: 2.0 seconds
* Time to Interactive: 2.5 seconds

![desktop](https://github.com/Louis-La/atelier-front-end-capstone-project/blob/main/SpeedTestsScreenshots/LightHouseAuditDesktop.png)

* [Mobile Version Screenshot Link](https://github.com/Louis-La/atelier-front-end-capstone-project/blob/main/SpeedTestsScreenshots/LightHouseAuditMobile.png)

---
**Roadmap - future enhancements**

* CSS overhaul to have each component's CSS style align better
* Login/User creation - Store user data associated to a certain user
* Database integration with user data via MongoDB
* Adding security certificate to allow for ‘https’ access

---





