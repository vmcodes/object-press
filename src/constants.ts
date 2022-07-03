import 'dotenv/config';

export const constants = {
  databaseURI: process.env.DATABASE_URI,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  blogSecret: process.env.BLOG_SECRET,
  userSecret: process.env.USER_SECRET,
  jwtSecret: process.env.JWT_SECRET,
};
