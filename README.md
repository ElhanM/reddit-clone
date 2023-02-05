# Reddit clone project

![under-construction](https://cdn.pixabay.com/photo/2017/10/26/17/51/under-construction-2891888__480.jpg)

## Description

Full stack Reddit clone project using React on the front end and Node.js/Express on the back end, where users can create posts, comments and communites, as well as upvote other peoples posts.

### The project is still a work in progress.

The project was bootstrapped with Vite, which is a build tool that is faster than Webpack. Starting the app in localhost using yarn dev for a Vite project takes significantly less time than starting an app that was bootstrapped using npx c-r-a. Also, both the front end and back end use ESLint and Prettier for linting and formatting. ESLint is also used to enforce writing better code even more.

During development, I paid a lot of attention to code splitting and enforced the use of reusable components. I also used the atomic design pattern in order to organize my components. Also both the back end and front end use TypeScript, which made my code a lot safer and a lot less prone to bugs. I found that using TypeScript just makes me write better code and also makes me more productive in the long run.

<br/>

For the front end, styling is done using Material UI and SCSS modules, in order for the styles to have better code splitting and to avoid naming collisions. I am also using Redux Toolkit for state management, with the createEntityAdapter hook in order to normalize my state. The benefit of using normalized state is that it makes it easier to mutate our state using RTK's built in mutators functions, and also by writing components that rely on normalized state we avoid having to pass a lot of data as props which reduces the amount of rerenders that occur and also makes us not have to rely on React.memo in order to prevent unnecessary rerenders.

Then, I am also using RTK Query for handling asynchronous requests. Also, I have implemented infinite scrolling using RTK Query, which was simpler to implement than I thought it would be because of the built in functionality that RTK Query provides.

I have also implemented a functionality that allows users format the description of their posts using a text editor, and I am able to save that formatted text to the back end and display it on my site. This text editor also supports code block, as well as syntax highlighting for the code block.

I used the React Quill library in order to create the text editor. Then, I used highlight.js in order to add syntax highlighting code blocks, and I used React Markdown with rehype-raw plugin in order to render the formatted text whitout losing the formatting.

I am yet to implement form handling and validation using React Hook Form and Yup.

<br/>

On the backend I used Sequelize ORM with a PostgreSQL database. I found working with relational databases when using Sequelize to be a breeze, and it also pervents my site from being prone to SQL injection attacks.

In order to store JWTs, I used httpOnly cookies, which are stored on the client side and are not accessible by JavaScript on the front end. For example, despite the cookie being stored in storage, trying to access it using document.cookie will not work. This prevents XSS attacks.

I also used the zlib library in order to compress the description of posts before storing them in the database, which reduces the size of the stored data and makes storing large amounts of data possible.

For data validation on the back end, I used the express-validator library, which is a middleware that can be used to validate before even making a request to the database, which helps prevent unnecessary database calls and reduces traffic.
