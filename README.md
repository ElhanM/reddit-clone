# Full Stack Reddit Clone Project

## The project is still a work in progress.
### Description

Full-stack Reddit clone made with React on the front end and Node.js/Express on the back end, with features that allow users can create posts and communities, as well as upvote and comment on other people's posts. The project is built using the following technologies and approaches:

## Video of the project
https://user-images.githubusercontent.com/103935603/220887985-d1157b4c-7602-42ec-a9d7-46971c4abbdb.mp4

</br>

The project was bootstrapped with Vite. Vite is a build tool that utilizes Rollup for module bundling and is known for faster bootstrapping compared to using webpack with npx cra.
I have used ESLint and Prettier for linting and formatting for both the front-end and the back-end use. ESLint is also used to further enforce writing better code.

My last project (Instagram Clone) is a bit all over the place, but still, making it improved my skills significantly.
On the other hand, this project is a lot more structured. A lot more thought went into every aspect of the app, from the architecture to every single line of code written.

During development, I did my best to stick to all of the best code practices and enforced this on myself by using ESLint and Prettier for linting and formatting on both front-end and back-end, as well as TypeScript to ensure that the code is safer and less prone to bugs.

<br/>

For the front end, Material UI and SCSS modules were utilized for styling. SCSS modules really help with code splitting and prevent naming collisions. Redux Toolkit was used for state management, with the createEntityAdapter hook in order to normalize the state. The benefit of using a normalized state shape is that it makes it easier to perform mutations on using RTK's built-in mutators functions. Furthermore, by writing components that rely on normalized state we avoid having to pass nonprimitive datatypes as props, which in turn reduces the amount of rerenders that occur without having to rely on React.Memo. This leads to an overall performance boost and further optimizes our app.

RTK Query was used for handling asynchronous requests and for implementing infinite scrolling and optimistic updates.

As part of the application, I have implemented a functionality that allows users to format the description of their posts using a rich text editor, which also allows me to save that formatted text to the back end and display it on my site without losing the formatting. This text editor also supports the use of code blocks, as well as provides syntax highlighting in multiple languages. In order to create the text editor I used the React Quill library. Then, I used highlight.js in order to add syntax highlighting to code blocks, and I used React Markdown with the rehype-raw plugin in order to render the formatted text without losing the formatting.

Form handling and validation were implemented using React Hook Form and Yup. The benefit of using Yup for form validation on the front end is that it allows us to validate the form before even making a request to the back end, which reduces the amount of overall traffic. As part of my project, I cloned the form-handling logic as well as the form error-handling logic straight from the official Reddit page.

<br/>

On the backend, Sequelize ORM with a PostgreSQL database was used. I found working with relational databases when using Sequelize to be a breeze. Also, using a modern ORM prevents my site from being prone to SQL injection attacks.

In order to store JWTs, I used httpOnly cookies, which are not accessible by JavaScript on the front end. For example, despite the cookie being stored in the browser's cookie storage, trying to access it using document.cookie in the browser's console will not work. This helps prevent my site from being vulnerable to XSS attacks. Also, I have found that making the front end part of authentication when using httpOnly cookies removes a lot of the boilerplate that comes with storing cookies in local storage for example.

I used the zlib library in order to compress the description of posts before storing them in the database, which reduces the size of the stored data and makes storing large amounts of data possible.

For data validation on the back end, I used the express-validator library, which is a middleware that allows us to validate the data that is sent to the back end before even making a request to the database. This helps prevent unnecessary database calls and reduces traffic.
