
module.exports = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  publicRuntimeConfig: {
    baseUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://ucredit.me',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },


  
};
