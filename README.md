# Books-App-
 Simple Db project for storing books we read

How to save file and run the app:
1. create a folder with any name and paste all the above contents.
2. create a folder named public : another folder assets store .svg (2 in total) in that folder in another folder named styles save style.css in that.
3. create a folder named views paste index.ejs and another folder named partials in that save header and footer.
4. use npm install in terminal to download all the packages and in database named books use the below query :
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL
);
save and you can use nodemon index.js and use this application.
