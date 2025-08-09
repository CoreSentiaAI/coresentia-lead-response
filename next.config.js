/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Don't bundle optional native deps of `ws` (pulled by supabase realtime)
    config.externals = config.externals || []
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    })
    return config
  },
}

module.exports = nextConfig
