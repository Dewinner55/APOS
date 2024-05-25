/**
 * @type {import('next').NextConfig}
 */
import path from "path";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  i18n: {
    locales: ['en', 'ru', 'ty', 'kgz'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  pageExtensions: ['[id].tsx', 'page.ts', 'page.jsx', 'page.js', 'tsx', 'ts', 'jsx', 'js'],
  images: {
    domains: ['https://tour-55.online']
  },
  async rewrites() {
    return [
      {
        source: '/online_store/v1/:path*',
        destination: 'https://tour-55.online/online_store/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
