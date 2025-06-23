import type {Metadata} from 'next';
import './globals.css';
import { Tajawal } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { headers } from 'next/headers';

const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-tajawal' });

// IMPORTANT: Replace with your actual production domain
const siteUrl = 'https://tabeebk.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | طبيبك',
    default: 'طبيبك - ابحث عن طبيبك المثالي في مصر',
  },
  description: 'منصة طبيبك هي دليلك الشامل للعثور على أفضل الأطباء والمتخصصين في مصر. ابحث حسب التخصص، المدينة، واحجز موعدك بسهولة. استخدم مرشدنا الذكي واحصل على توصيات مخصصة.',
  openGraph: {
    title: 'طبيبك - دليلك الشامل لأفضل الأطباء في مصر',
    description: 'ابحث عن الأطباء، اقرأ التقييمات، واحجز موعدك. طبيبك يسهل عليك الوصول للرعاية الصحية.',
    url: siteUrl,
    siteName: 'طبيبك',
    images: [
      {
        url: 'https://placehold.co/1200x630.png',
        width: 1200,
        height: 630,
        alt: 'طبيبك - ابحث عن طبيبك المثالي',
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'طبيبك - دليلك الشامل لأفضل الأطباء في مصر',
    description: 'ابحث عن الأطباء، اقرأ التقييمات، واحجز موعدك. طبيبك يسهل عليك الوصول للرعاية الصحية.',
    images: ['https://placehold.co/1200x630.png'], 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: null,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get('x-next-pathname') || '';
  const isAdminRoute = pathname.startsWith('/admin');

  // If it's an admin route, render a simpler layout without the main header/footer
  if (isAdminRoute) {
    return (
      <html lang="ar" dir="rtl" suppressHydrationWarning>
        <body className={cn('font-body antialiased', tajawal.variable)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    );
  }

  // Default layout for the public-facing site
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cn('font-body antialiased', tajawal.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
