import { body, param, query } from "express-validator";

class CommentValidator {
  checkCreateComment() {
    return [
      body("comment").notEmpty().withMessage("Comment is required").isLength({ min: 1, max: 1000 }).withMessage("Comment too long"),
      param("postId").isUUID().withMessage("The postId value should be a valid uuid"),
    ];
  }
}

export default new CommentValidator();
