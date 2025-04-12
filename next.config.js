/** @type {import('next').NextConfig} */

const webpack = require('webpack');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  devIndicators: false,
  experimental: {
    jsconfigPaths: true,
    granularChunks: true,
  },
  async redirects() {
    return [
      {
        source: '/302',
        destination: '/admin/projects',
        permanent: true,
      },
    ];
  },
  // webpack: (config) => {
  //   config.plugins.push(
  //     new webpack.ProvidePlugin({
  //       $: 'jquery',
  //       jQuery: 'jquery',
  //     }),
  //   );
  //   return config;
  // },
};

module.exports = nextConfig;
