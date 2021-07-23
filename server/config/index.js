import dotenv from "dotenv";
dotenv.config();

export const PORT = parseInt(process.env.PORT, 10);
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const isProduction = process.env.NODE_ENV === "production";

export const AWS_KEY_ID = process.env.AWS_KEY_ID;
export const AWS_PRIVATE_KEY = process.env.AWS_PRIVATE_KEY;
export const BUCKET_NAME = process.env.BUCKET_NAME;
export const REGION = process.env.REGION;
export const DEFAULT_IMAGE_URL = process.env.DEFAULT_IMAGE_URL;
