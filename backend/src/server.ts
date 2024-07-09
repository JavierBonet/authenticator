import express from "express";
import { config } from "./config";
import { router as apiRouter } from "./routes/apiRouter";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const { serverPort, frontendHost } = config;

const corsOptions: CorsOptions = {
  origin: frontendHost,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
};

app.use(cors(corsOptions));

// Define authentication routes in a separate file
// Maybe will need to just declare the methods that handle login and signup and then use them in here
// app.use('/login', authenticationRouter)

// Define authorization routes in a separate file

app.use("/api/v1", apiRouter);

function startServer() {
  app.listen(serverPort, () => {
    console.log(`Server started on port ${serverPort}`);
  });
}

export { startServer };
