import { body, param, query } from "express-validator";

class CommunityValidator {
  checkGetCommunity() {
    return [param("communityId").isUUID().withMessage("The communityId value should be a valid uuid")];
  }
  checkPostReqCommunity() {
    return [body("communityId").isUUID().withMessage("The communityId value should be a valid uuid")];
  }
  checkCreateCommunity() {
    return [
      body("name")
        .isString()
        .withMessage("The name value should be string")
        .notEmpty()
        .withMessage("The name value should not be empty")
        .isLength({ min: 1, max: 25 })
        .withMessage("The name value should be between 1 and 25 characters")
        .matches(/^[a-zA-Z0-9-_.]+$/)
        .withMessage("Community name can only contain letters, numbers, dash, underscore and dot and no space"),
      body("description")
        .isString()
        .withMessage("The description value should be string")
        .notEmpty()
        .withMessage("The description value should not be empty")
        .isLength({ min: 1, max: 255 })
        .withMessage("The description value should be between 1 and 255 characters"),
    ];
  }
}

export default new CommunityValidator();
