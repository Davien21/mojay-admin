module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "localhost",
      "herokuapp.com",
    ],
  },
  basePath: '/admin'
};
