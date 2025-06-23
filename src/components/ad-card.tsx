import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';

export function AdCard() {
  return (
    <Card className="shadow-lg overflow-hidden group border-primary/20">
        <CardContent className="p-0">
            <div className="relative">
            <Image
                src="https://placehold.co/600x400.png"
                alt="صورة إعلان"
                data-ai-hint="medical advertisement"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Badge variant="secondary" className="absolute top-2 right-2 bg-black/60 text-white border-none backdrop-blur-sm">
                إعلان ممول
            </Badge>
            </div>
            <div className="p-4 space-y-2">
            <h3 className="font-bold text-lg font-headline">أفضل عروض عيادات الليزر</h3>
            <p className="text-sm text-muted-foreground mt-1">
                خصومات تصل إلى 50% على جلسات إزالة الشعر بالليزر. احجز الآن واستمتع ببشرة ناعمة!
            </p>
            <Button asChild size="sm" className="w-full mt-2">
                <Link href="#">
                    اعرف المزيد
                </Link>
            </Button>
            </div>
      </CardContent>
    </Card>
  );
}
