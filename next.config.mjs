/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return[
            {
                source: '/',
                destination: '/assistant',
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
