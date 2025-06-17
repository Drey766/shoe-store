/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.asos-media.com'],
    // Alternative: if you have multiple domains, you can list them all
    // domains: ['images.asos-media.com', 'other-domain.com', 'another-domain.com'],
    
    // Or if you want to allow any external domain (less secure):
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**',
    //   },
    // ],
  },
}

module.exports = nextConfig