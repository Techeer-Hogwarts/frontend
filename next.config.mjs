/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com', 'avatars.slack-edge.com'], // 허용할 외부 도메인 추가
  },

  async rewrites() {
    return [
      {
        source: '/:api/v1/:path*',
        destination: 'https://api.techeerzip.cloud/api/v1/:path*',
      },
    ]
  },
  webpack: (config) => {
    // SVG 파일을 처리하는 설정
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    // PDF.js worker 파일을 처리하는 설정 추가
    config.module.rules.push({
      test: /pdf\.worker\.mjs$/,
      type: 'asset/resource',
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[hash].[ext]',
      //       // publicPath: '/_next/static/worker',
      //       // outputPath: 'static/worker',
      //     },
      // },
    })

    config.resolve.alias.canvas = false
    // config.module.rules.push({
    //   test: /\.mjs$/,
    //   include: /node_modules/,
    //   type: 'javascript/auto',
    // })

    return config
  },
}

export default nextConfig
