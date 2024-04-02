# Node.js Application


This full-stack application provides a user-friendly interface to manage movie records and perform various operations on a MongoDB Atlas database.

Features:
- Navigation Bar: The top of the page includes a navigation bar with links to Home, Basket, and Add Movie pages.
- Movie Listing: The index page displays all movie records retrieved from the MongoDB Atlas database. Users can click on a movie to view more details.
- Basket Management: Users can add items to their basket by clicking the "Add to Basket" button under each movie record. They can then navigate to the Basket page to manipulate the contents, including increasing or decreasing the quantity and deleting items. The price is updated in real-time without refreshing the page.
- Add Movie Page: Users can add new movie records by navigating to the Add Movie page. They are prompted to enter all the required details for a movie and upload an image. After submitting the information, the user is redirected to the index page.

The frontend is built using EJS (Embedded JavaScript) templating engine along with HTML, CSS and JavaScript. The backend is implemented with Node.js and Express.js, and it interacts with the MongoDB Atlas database using Mongoose.


## Prerequisites


Before running this application, ensure that you have the following installed on your machine:
- Node.js.
- npm (Node Package Manager): Comes bundled with Node.js installation.
- MongoDB Atlas account.
- MongoDB Atlas connection string.


## Installation


1. Clone this repository to your local machine:
- git clone https://github.com/dumitruciobanu204/QHO541
2. Navigate to the project directory:
- cd project-directory
3. Install depencies:
- npm install


## Configuration


1. Obtain your MongoDB Atlas connection string from the MongoDB Atlas dashboard.
- MONGODB_URI=your_connection_string_here
2. Navigate to the root directory of your project and open the .env file using any text editor you prefer. Then, insert your MongoDB Atlas connection string according to the provided format.
- MONGODB_URI=your_connection_string_here


## Running the application


To start the application, run the following command:
- npm start


## Usage 


1. Open your web browser and visit http://localhost:8080.
2. Use the navigation bar to navigate between pages: Home, Basket, and Add Movie.
3. On the index page, view all movie records and click on a movie to see more details.
4. Add items to your basket by clicking the "Add to Basket" button under each movie record.
5. Navigate to the Basket page to manipulate basket contents, including updating quantities and deleting items.
6. Visit the Add Movie page to add new movie records, providing all required details and uploading an image.