import { Request, Response } from "express";
import DB from "../db";
import { HttpStatus } from "../constants/httpStatus";

class ProgrammingLanguagesController {
  private db: DB;
  constructor() {
    this.db = DB.getInstance();
  }

  async getProgrammingLanguages(req: Request, res: Response) {
    const programmingLanguages = await this.db.getProgrammingLanguages();

    res.status(HttpStatus.OK).send({ programmingLanguages });
  }
}

export default ProgrammingLanguagesController;
