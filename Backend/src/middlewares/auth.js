import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  const Token = req.cookies?.Token;

  if (!Token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(Token, process.env.JWT_SECRET);

    req.username = decodedToken.username;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token");
  }
});
