import { MetadataRoute } from 'next';
 
export default function robots(): MetadataRoute.Robots {
  // IMPORTANT: Replace with your actual production domain
  const siteUrl = 'https://tabeebk.example.com';
 
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/profile/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
