/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_SOCKET_URL: "http://localhost:5000",
        NEXT_PUBLIC_API_URL: "http://backend:5000",
    },
};

export default nextConfig;
