import { MetadataRoute } from 'next';
import { getServices } from '../lib/actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fullmaintenance.com'; // Replace with actual production domain

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/deep-cleaning',
    '/amc',
    '/offers',
    '/process',
    '/clients',
    '/contact',
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Retrieve service slugs dynamically to include in sitemap
  let servicePages: MetadataRoute.Sitemap = [];
  try {
    const services = await getServices();
    servicePages = services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Sitemap service query failed, omitting dynamic routes:', error);
  }

  return [...staticPages, ...servicePages];
}
