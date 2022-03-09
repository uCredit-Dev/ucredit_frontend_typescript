module.exports = {
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4567/api'
        : 'https://ucredit-api.herokuapp.com/api',
    baseUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://ucredit.me',
  },
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
