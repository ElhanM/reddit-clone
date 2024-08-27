# Full Stack Reddit Clone Project

### Description

Full-stack Reddit clone made with React/TypeScript on the front end and Express/TypeScript along with Sequelize ORM and a PostgreSQL database on the back end.

## Video of the project
https://user-images.githubusercontent.com/103935603/222547324-83eef1b5-c250-45ee-97ad-65c2e8f69333.mp4

# Project Overview

## Key Technologies

- **Vite**: For fast project bootstrapping and development, utilizing Rollup for module bundling.
- **ESLint & Prettier**: Enforced consistent code quality and formatting across both front-end and back-end.
- **TypeScript**: Improved code safety and reduced bugs through static typing.

## Front-End

- **Styling**: 
  - Material UI & SCSS modules for styling.
  - SCSS modules enabled code splitting and prevented naming collisions.
- **State Management**: 
  - Redux Toolkit (RTK) with `createEntityAdapter` for normalized state management.
  - Performance optimizations by reducing rerenders, minimizing the use of `React.Memo`.
- **Async Requests & Pagination**: RTK Query was used to handle asynchronous requests and infinite scrolling.
- **Text Editor**:
  - Allows users to format the description of their posts using a rich text editor
  - Built with React Quill.
  - Supports code blocks with syntax highlighting (highlight.js) and markdown rendering (React Markdown with rehype-raw).
- **Form Handling & Validation**: 
  - Implemented using React Hook Form and Yup for client-side validation.
  - Leveraged logic inspired by Reddit’s official form handling for robust error management.
- **Responsive Design**: 
  - Fully responsive UI with custom skeleton loading using Framer Motion.

## Back-End

- **Sequelize ORM**: 
  - Used with PostgreSQL for seamless database interaction.
  - ORM helps prevent SQL injection attacks.
- **JWT Authentication**: 
  - httpOnly cookies for storing JWTs securely, preventing XSS attacks.
  - Simplified authentication flow by avoiding local storage for cookies.
