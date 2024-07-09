import express, { Request, Response } from "express";
import AuthenticationController from "../controllers/authenticationController";
import { HttpStatus } from "../constants/httpStatus";
import { SignUpRequest, SignInRequest } from "../controllers/interfaces";
import { router as moviesRouter } from "./moviesRouter";
import { router as productsRouter } from "./productsRouter";
import { router as programmingLanguagesRouter } from "./programmingLanguagesRouter";

const router = express.Router();
const authenticationController = new AuthenticationController();

router.post("/register", (req: SignUpRequest, res: Response) => {
  const { fullName, email, role, password } = req.body;

  if (!fullName || !email || !role || !password) {
    res.status(HttpStatus.BAD_REQUEST).send({
      message: "The fields fullName, email, role, password are required",
    });
    return;
  } else {
    authenticationController.signUp(req, res);
  }
});

router.post("/login", (req: SignInRequest, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(HttpStatus.BAD_REQUEST).send({
      message: "The fields email and password are required",
    });
  } else {
    authenticationController.signIn(req, res);
  }
});

router.post("/logout", (req: Request, res: Response) => {
  authenticationController.logout(req, res);
});

router.get(
  "/refresh-access-token",
  authenticationController.refreshAccessToken
);

router.use("/movies", authenticationController.authenticate, moviesRouter);
router.use("/products", authenticationController.authenticate, productsRouter);
router.use(
  "/programming-languages",
  authenticationController.authenticate,
  programmingLanguagesRouter
);

export { router };
