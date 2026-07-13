/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'substack-post-media.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
    ],
  },
  async redirects() {
    return [
      // Strip trailing markdown/punctuation junk from writing article URLs
      // (e.g. someone pastes "/writing/software-abundance)**" from a markdown link)
      {
        source: '/writing/:slug(agentic-seo-math|conference-booths|software-abundance|x-algorithm):junk(.+)',
        destination: '/writing/:slug',
        permanent: true,
      },
      // Same for the blog article routes
      {
        source: '/blog/:slug(rise-of-the-software-factory):junk(.+)',
        destination: '/blog/:slug',
        permanent: true,
      },
      // Broken "/writing/null" links -> the writing index
      {
        source: '/writing/null',
        destination: '/blog',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
