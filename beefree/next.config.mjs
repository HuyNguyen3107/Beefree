/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_HOST: process.env.APP_HOST,
    SESSION_NAME: process.env.SESSION_NAME,
    SESSION_PASSWORD: process.env.SESSION_PASSWORD,
  },
};

export default nextConfig;
