import { body, param, query } from "express-validator";

class CommunityValidator {
  checkGetCommunity() {
    return [body("communityId").isUUID().withMessage("The communityId value should be a valid uuid")];
  }
}

export default new CommunityValidator();
