# Project Atelier
Software Team: [Dennis Cao](https://www.linkedin.com/in/dennisrcao/), [Andy Chan](https://www.linkedin.com/in/andychan727/), [Francesco Garofalo](https://www.linkedin.com/in/garofalofrancesco/), [Dong Hyoung Kim](https://www.linkedin.com/in/dong-hyoung-kim-7686b8222/)


https://user-images.githubusercontent.com/521934/163687532-a9dc7422-485c-4f84-80c3-edb728b2e5f4.mov


## Project Overview

This Hack Reactor front-end project is a multi-page e-commerce website retrieving all product information from an API database. 
Given a wireframe design, our group of four software engineers developed a front-end project reflecting the design and following a list of features requirements. We deployed the site to an [AWS EC2 Instance](http://ec2-18-223-212-148.us-east-2.compute.amazonaws.com:3000/)

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
Our application allows the user to click through products and styles to add a product to their shopping carts. Related products will populate under and be shown in a carousel, the user can add the current product to his outfit. In addition, users can see the current questions asked for the selected product as well as add their own questions & answers. At the very bottom, users can view reviews written by other customers. There is a star rating for each product. The user can add their own rating and review to the products. Overall, there is a click tracker that logs the users’ click interactions into an API.
Main components include adding an Overiew, Related Products + Outfits, Questions & Answers and Reviews.

**Main Components**
1) **Product Overview**
![Screen Shot 2022-04-16 at 1 39 17 PM](https://user-images.githubusercontent.com/521934/163690765-4c24a68a-ef57-4f91-8aa2-1ed4bcd976cb.png)
The Product Overview module is top-most module on the Product Detail page. Product Overview displays a selected product with the following product information:
    * A gallery of product images.
    * A variety of styles to select for each product.
    * A product's slogan, description, features, and pricing.
    * Size and quantity available.
    
2) **Related Products & Outfits**
![Screen Shot 2022-04-16 at 1 41 04 PM](https://user-images.githubusercontent.com/521934/163690774-c20edb44-9336-499d-91d5-36176bf5145d.png)
    2.1 Related Products
    * Related items to the current product are shown as seperate cards. 
    * Each related item card has a thumbnail photo, category, name, price, and averaged star rating
    * Additionally, each card has an action button star that pops out a modal which compares features of the current product to the selected related product. 
    * At most 4 related items are shown, if more exist a carousel feature will emerge to help the user flip through. 

    2.2 Outfit List
    * An "Add To Outfit" button allows users to add or delete the currently selected product/style to their outfits list.
    * A carousel feature shows only the last 3 items added to the outfit.
    * This list persists after the user visits other pages.

3) **Questions & Answers**
![Screen Shot 2022-04-16 at 1 39 34 PM](https://user-images.githubusercontent.com/521934/163690787-a0540031-a8ec-4274-90cb-7a06f47b97c1.png)

    * The Questions & Answers module displays previous entries made by others and allows asking and answering of questions for the current product             selected and providing feedback.
    * The list of questions & answers is contained within a scrollable container that adds 2 more questions or 2 more answers when their                       respective buttons are present.
    * This module extends the ability to view and search previous entries, ask questions, answer questions through a modal popup. 
    * Feedback options include marking the question/answer as helpful which is what the entries are sorted by (top -> down) and report an entry               which will flag it so it's no longer shown in the lists.
    
4) **Ratings & Reviews**
![Screen Shot 2022-04-16 at 1 39 44 PM](https://user-images.githubusercontent.com/521934/163690795-c80dc15c-a3ea-4d10-ae10-3b618eef9583.png)
   
   4.1 Ratings
      * Average Rating of the current product is shown in a left column with star rating, which corresponds the average rating.
      * The total recommendation percentage and percenage for each rating data is shown.
      * Characteristics bar shows how each characteristic of the product is based on each review's rating.

   4.2 Reviews
      * It shows all the review that have submitted with each rating and characteristics rating (this part does not show in the review, but adds on to the database). You cac filter the reviews based on dropdown options provided. Also, you can increment the value of "helpful" if the review is helpful and report if the review was inappropriate, then it will disappear.
      * New review can be added by clicking the button. Photos may be uplaoded along with summary, rating for the current product and charactertics, nickname, email address, and body text.

## Installation
1) Fork project and clone to local repository

2) Install all packages by running the following commands in your terminal.
```
npm install
```
3) Start the server(runs Nodemon on server>index.js). In the terminal type
```
npm run server-dev
```
4) Start webpack (webpack serve --open). In the terminal type
```
npm run start
```

5) Rename the `example.config.js` file to `config.js`

6) Insert your own GitHub token into the `config.js` file.

6) Open the project in your web browser.
http://localhost:8080

## LightHouse Audit Results

Page performance goals:
* Time to First Paint: 0.8 seconds
* Time to First Meaningful Paint: 2.0 seconds
* Time to Interactive: 2.5 seconds
<img width="690" alt="Screen Shot 2022-04-16 at 1 59 14 PM" src="https://user-images.githubusercontent.com/521934/163691730-ac056072-6b67-4ba9-bbd6-32917720f432.png">


## Future Enhancemenets

* CSS overhaul to have each component's CSS style align better
* Login/User creation - Store user data associated to a certain user
* Database integration with user data via MongoDB
* Adding security certificate to allow for ‘https’ access






