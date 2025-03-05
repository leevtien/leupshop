/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'v5.airtableusercontent.com',
      'v4.airtableusercontent.com',
      'v3.airtableusercontent.com',
      'v2.airtableusercontent.com',
      'v1.airtableusercontent.com',
      'dl.airtable.com',
      'airtable.com'
    ],
  },
  // Other config options here if needed
}

module.exports = nextConfig
