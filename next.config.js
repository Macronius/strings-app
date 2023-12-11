/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // https://nextjs.org/docs/app/building-your-application/optimizing/images#remote-images
    domains: ["avatars.githubusercontent.com", "cloudflare-ipfs.com", "avatar.com", "acp4st8zmrcbyhfj.public.blob.vercel-storage.com"],
    // remotePatterns: ["avatars.githubusercontent.com", "cloudflare-ipfs.com", "avatar.com"],
  },
};

module.exports = nextConfig;
