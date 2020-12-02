import { config } from "dotenv";

config();

export const __isProd__ = process.env.environment === "production";

export const __cookieName__ = "qid";
export const __sessionSecret__ = process.env.SESSION_SECRET as string;

export const __serverHost__ = process.env.SERVER_HOST;
export const __serverPort__ = Number(process.env.SERVER_PORT);

export const __dbHost__ = process.env.DB_HOST;
export const __dbName__ = process.env.DB_NAME;
export const __dbPort__ = Number(process.env.DB_PORT);
export const __dbUser__ = process.env.DB_USER;
export const __dbPassword__ = process.env.DB_PASSWORD;
