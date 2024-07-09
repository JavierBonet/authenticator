import express from "express";
import MoviesController from "../controllers/moviesController";

const router = express.Router();
const moviesController = new MoviesController();

router.get("/", (req, res) => moviesController.getMovies(req, res));

export { router };
