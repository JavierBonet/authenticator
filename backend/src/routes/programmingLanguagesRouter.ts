import express from "express";
import ProgrammingLanguagesController from "../controllers/programmingLanguageController";

const router = express.Router();
const programmingLanguagesController = new ProgrammingLanguagesController();

router.get("/", (req, res) =>
  programmingLanguagesController.getProgrammingLanguages(req, res)
);

export { router };
