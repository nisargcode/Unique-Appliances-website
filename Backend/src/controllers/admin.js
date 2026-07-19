import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  let isPasswordValid = false;

  if (username === process.env.ADMIN1_USERNAME) {
    isPasswordValid = await bcrypt.compare(
      password,
      process.env.ADMIN1_PASSWORD_HASH,
    );
  } else if (username === process.env.ADMIN2_USERNAME) {
    isPasswordValid = await bcrypt.compare(
      password,
      process.env.ADMIN2_PASSWORD_HASH,
    );
  } else {
    await bcrypt.compare(password, "$2b$10$abcdefghijklmnopqrstuv");
  }

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken({ username });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res
    .status(200)
    .cookie("Token", token, options)
    .json(new ApiResponse(200, { username }, "you logged in successfully"));
});

const logout = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.clearCookie("Token", options);

  res.status(200).json(new ApiResponse(200, {}, "you logout successfully"));
});

const checkAuth = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, { username: req.username }, "Authenticated"));
});

export { login, logout, checkAuth };
