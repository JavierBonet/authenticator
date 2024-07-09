const defaultPort = "3000";

const serverPort = parseInt(process.env.SERVER_PORT || defaultPort);

export const config = {
  serverPort,
  frontendHost: process.env.FRONTEND_HOST || "http://localhost:8080",
  mongoUsername: process.env.MONGO_USERNAME,
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoDbName: process.env.MONGO_DATABASE_NAME,
  jwt: {
    accessTokenKey: process.env.JWT_ACCESS_TOKEN_SECRET || "secret",
    accessTokenExpirationTime: parseInt(
      process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME || `${60 * 5}`
    ),
    refreshTokenKey: process.env.JWT_REFRESH_TOKEN_SECRET || "secret",
    refreshTokenExpirationTime: parseInt(
      process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME || `${60 * 60}`
    ),
  },
  backendUrl: process.env.BACKEND_URL || `http://localhost:${serverPort}`,
};
