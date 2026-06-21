import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://fullmaintenance.com'; // Replace with actual production domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Block search engines from crawling the dashboard and API routes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
