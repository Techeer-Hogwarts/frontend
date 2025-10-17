import { withSentryConfig } from '@sentry/nextjs'
/** @type {import('next').NextConfig} */

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.yje.kr/api'

// Helper function to create remote pattern
const createRemotePattern = (hostname, pathname = '/**') => ({
  protocol: 'https',
  hostname,
  port: '',
  pathname,
})

const nextConfig = {
  images: {
    remotePatterns: [
      // Social platforms
      createRemotePattern('avatars.slack-edge.com'),
      createRemotePattern('cdn.discordapp.com'),
      
      // Storage buckets
      createRemotePattern('techeerzip-bucket.s3.ap-southeast-2.amazonaws.com'),
      createRemotePattern('techeer-bucket.s3.ap-northeast-2.amazonaws.com'),
      
      // Blog platforms
      createRemotePattern('images.velog.io'),
      createRemotePattern('miro.medium.com'),
      createRemotePattern('medium.com'),
      
      // GitHub
      createRemotePattern('github.com', '/user-attachments/**'),
      createRemotePattern('raw.githubusercontent.com'),
      createRemotePattern('user-images.githubusercontent.com'),
    ],
    // SVG 파일 처리를 위한 설정
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  transpilePackages: ['framer-motion'],

  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/api/v2/:path*',
        destination: `${API_BASE_URL}/v2/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${API_BASE_URL}/v3/:path*`,
      },
    ]
  },
  webpack: (config) => {
    // SVG 파일을 React 컴포넌트로 처리하는 설정
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
