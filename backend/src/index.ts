import "dotenv/config";
import DB from "./db";
import { startServer } from "./server";

(async () => {
  const db = DB.getInstance();
  await db.connect();

  startServer();
})();
