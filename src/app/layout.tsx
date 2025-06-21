import type {Metadata} from 'next';
import './globals.css';
import { Tajawal } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';

const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-tajawal' });

export const metadata: Metadata = {
  title: 'طبيبك',
  description: 'ابحث عن الطبيب المناسب لاحتياجاتك.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
