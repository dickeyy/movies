import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.themoviedb.org"
            }
        ]
    }
};

export default nextConfig;
