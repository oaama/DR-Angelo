import { MetadataRoute } from 'next';
import { doctors } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  // IMPORTANT: Replace with your actual production domain
  const siteUrl = 'https://tabeebk.example.com';

  const staticRoutes = [
    '/',
    '/login',
    '/signup',
    '/forgot-password',
    '/prescription-analyzer',
    '/find-medication',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  const doctorRoutes = doctors
    .filter(doctor => doctor.verificationStatus === 'verified')
    .map(doctor => ({
      url: `${siteUrl}/doctor/${doctor.id}`,
      lastModified: new Date(), // In a real app, this would be the doctor's profile update date
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  return [...staticRoutes, ...doctorRoutes];
}
