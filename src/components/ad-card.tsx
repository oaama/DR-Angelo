
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import type { Ad } from '@/lib/types';
import { cn } from '@/lib/utils';

export function AdCard({ ad }: { ad: Ad }) {
  return (
    <Card className="shadow-lg overflow-hidden group border-primary/20">
        <CardContent className="p-0">
            {ad.type === 'image' && ad.imageUrl && (
                 <div className="relative">
                    <Image
                        src={ad.imageUrl}
                        alt={`إعلان: ${ad.title}`}
                        data-ai-hint="medical advertisement"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge variant="secondary" className="absolute top-2 right-2 bg-black/60 text-white border-none backdrop-blur-sm">
                        إعلان ممول
                    </Badge>
                </div>
            )}
           
            <div className={cn("p-4 space-y-2", ad.type === 'text' && 'pt-6')}>
                {ad.type === 'text' && (
                     <Badge variant="secondary" className="bg-black/60 text-white border-none backdrop-blur-sm w-fit">
                        إعلان ممول
                    </Badge>
                )}
                <h3 className="font-bold text-lg font-headline">{ad.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    {ad.description}
                </p>
                <Button asChild size="sm" className="w-full mt-2">
                    <Link href={ad.link}>
                        اعرف المزيد
                    </Link>
                </Button>
            </div>
      </CardContent>
    </Card>
  );
}
