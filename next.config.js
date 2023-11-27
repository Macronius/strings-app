/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // https://nextjs.org/docs/app/building-your-application/optimizing/images#remote-images
    domains: ["avatars.githubusercontent.com", "cloudflare-ipfs.com"],
  },
};

module.exports = nextConfig;
