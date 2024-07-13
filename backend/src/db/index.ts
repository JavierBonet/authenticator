import { MongoClient, ObjectId, OptionalId, ServerApiVersion } from "mongodb";
import { config } from "../config";
import {
  Movie,
  Product,
  ProgrammingLanguage,
} from "../../../common/interfaces";

interface User {
  _id: ObjectId;
  fullName: string;
  email: string;
  password: string;
  role: string;
}

const { mongoUsername, mongoPassword, mongoDbName } = config;

const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@appcluster.cyc4aqt.mongodb.net/?retryWrites=true&w=majority&appName=AppCluster`;

export enum Collection {
  User = "users",
  Movie = "movies",
  Product = "products",
  ProgrammingLanguage = "programming-languages",
}

let client: MongoClient;

class DB {
  private static instance: DB;

  private constructor() {}

  private getClient() {
    if (!client) {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
    }

    return client;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new DB();
    }

    return this.instance;
  }

  async connect() {
    await this.getClient().connect();
  }

  async createDocument(collectionName: string, document: OptionalId<User>) {
    const collection = this.getClient()
      .db(mongoDbName)
      .collection(collectionName);

    return await collection.insertOne(document);
  }

  async getUserByEmail(email: string) {
    const collection = this.getClient()
      .db(mongoDbName)
      .collection(Collection.User);

    return collection.findOne<User>({ email }).then((user) => {
      return user ? user : undefined;
    });
  }

  async getMovies(): Promise<Movie[]> {
    return this.getClient()
      .db(mongoDbName)
      .collection(Collection.Movie)
      .find<Movie>({})
      .toArray();
  }

  async getProducts(): Promise<Product[]> {
    return this.getClient()
      .db(mongoDbName)
      .collection(Collection.Product)
      .find<Product>({})
      .toArray();
  }

  async getProgrammingLanguages(): Promise<ProgrammingLanguage[]> {
    return this.getClient()
      .db(mongoDbName)
      .collection(Collection.ProgrammingLanguage)
      .find<ProgrammingLanguage>({})
      .toArray();
  }

  async close() {
    await this.getClient().close();
  }
}

export default DB;
