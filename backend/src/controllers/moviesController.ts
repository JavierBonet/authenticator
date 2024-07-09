import { Request, Response } from "express";
import DB from "../db";
import { HttpStatus } from "../constants/httpStatus";

class MoviesController {
  private db: DB;
  constructor() {
    this.db = DB.getInstance();
  }

  async getMovies(req: Request, res: Response) {
    const movies = await this.db.getMovies();

    res.status(HttpStatus.OK).send({ movies });
  }
}

export default MoviesController;
