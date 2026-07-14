import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://maintex.in'; // Replace with actual production domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Block search engines from crawling the dashboard and API routes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
