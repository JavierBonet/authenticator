import { Request, Response } from "express";
import DB from "../db";
import { HttpStatus } from "../constants/httpStatus";

class ProductsController {
  private db: DB;
  constructor() {
    this.db = DB.getInstance();
  }

  async getProducts(req: Request, res: Response) {
    const products = await this.db.getProducts();

    res.status(HttpStatus.OK).send({ products });
  }
}

export default ProductsController;
