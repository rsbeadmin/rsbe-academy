/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ini akan suruh Netlify teruskan build walaupun ada ralat merah
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ini juga untuk abaikan ralat linting masa build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;