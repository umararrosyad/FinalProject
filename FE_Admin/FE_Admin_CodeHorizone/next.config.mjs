/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "placehold.co"] // Menggunakan 'domains' untuk konfigurasi localhost
  }
};

export default nextConfig;
