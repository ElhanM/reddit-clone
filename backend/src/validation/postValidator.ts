import { body, param, query } from "express-validator";

class PostValidator {
  checkCreatePost() {
    return [
      body("title")
        .isString()
        .withMessage("The title value should be string")
        .notEmpty()
        .withMessage("The title value should not be empty")
        .isLength({ min: 1, max: 255 })
        .withMessage("The title value should be between 1 and 255 characters"),
      body("description")
        .isString()
        .withMessage("The description value should be string")
        .notEmpty()
        .withMessage("The description value should not be empty")
        .isLength({ min: 1, max: 1000 })
        .withMessage("The description value should be between 1 and 1000 characters"),
      body("communityId")
        .isUUID()
        .withMessage("The communityId value should be a valid uuid")
        .notEmpty()
        .withMessage("The communityId value should not be empty"),
    ];
  }
  checkGetPost() {
    // postId is a uuid string
    return [param("postId").isUUID().withMessage("The postId value should be a valid uuid")];
  }
  checkVotePost() {
    return [
      body("postId")
        .isUUID()
        .withMessage("The postId value should be a valid uuid")
        .notEmpty()
        .withMessage("The postId value should not be empty")
        .isString()
        .withMessage("The postId value should be string"),
      body("userId")
        .isUUID()
        .withMessage("The userId value should be a valid uuid")
        .notEmpty()
        .withMessage("The userId value should not be empty")
        .isString()
        .withMessage("The userId value should be string"),
    ];
  }
}

// we export it as object of this class so we don't need to create new instance of this class in controller
export default new PostValidator();
