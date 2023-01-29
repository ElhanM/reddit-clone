import { body, param, query } from "express-validator";

class AuthValidator {
  checkLogin() {
    return [
      body("email")
        .isEmail()
        .withMessage("The email value should be a valid email")
        .notEmpty()
        .withMessage("The email value should not be empty")
        .isLength({ min: 4, max: 255 })
        .withMessage("The email value should be between 4 and 255 characters"),
      body("password")
        .isString()
        .withMessage("The password value should be string")
        .notEmpty()
        .withMessage("The password value should not be empty")
        .isLength({ min: 8, max: 32 })
        .withMessage("The password value should be between 8 and 32 characters")
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage("The password value can only contain letters, numbers, dash, underscore and dot")
        // Password can only contain letters, numbers, dash, underscore and dot
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage("The password value can only contain letters, numbers, dash, underscore and dot"),
    ];
  }
  checkRegister() {
    return [
      body("username")
        .isString()
        .withMessage("The username value should be string")
        .notEmpty()
        .withMessage("The username value should not be empty")
        .isLength({ min: 4, max: 25 })
        .withMessage("The username value should be between 4 and 25 characters")
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage("The username value can only contain letters, numbers, dash, underscore and dot"),
      // make empty string not valid
      body("email")
        .isEmail()
        .withMessage("The email value should be a valid email")
        .notEmpty()
        .withMessage("The email value should not be empty")
        .isLength({ min: 4, max: 255 })
        .withMessage("The email value should be between 4 and 255 characters"),
      body("password")
        .isString()
        .withMessage("The password value should be string")
        .notEmpty()
        .withMessage("The password value should not be empty")
        .isLength({ min: 8, max: 32 })
        .withMessage("The password value should be between 8 and 32 characters")
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage("The password value can only contain letters, numbers, dash, underscore and dot")
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage("The password value can only contain letters, numbers, dash, underscore and dot"),
    ];
  }
}

// we export it as object of this class so we don't need to create new instance of this class in controller
export default new AuthValidator();
