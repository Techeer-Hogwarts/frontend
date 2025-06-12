import { withSentryConfig } from '@sentry/nextjs'
/** @type {import('next').NextConfig} */

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.yje.kr'

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.slack-edge.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'techeerzip-bucket.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    transpilePackages: ['framer-motion'],
  },

  reactStrictMode: true,

  images: {
    domains: [
      'example.com',
      'avatars.slack-edge.com',
      'techeerzip-bucket.s3.ap-southeast-2.amazonaws.com',
      'images.velog.io',
      'encore.cloud',
      'github.com',
      'cdn.discordapp.com',
    ], // 허용할 외부 도메인 추가
  },

  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${API_BASE_URL}/api/v3/:path*`,
      },
      {
        source: '/api/v2/:path*',
        destination: `${API_BASE_URL}/api/v2/:path*`,
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
    })

    config.resolve.alias.canvas = false

    return config
  },
}

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'techeerzip',
  project: 'techeerzip-next',
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
})
