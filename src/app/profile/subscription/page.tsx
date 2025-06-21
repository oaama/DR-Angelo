import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
    {
        name: "الباقة الأساسية",
        price: "مجاناً",
        features: [
            "ملف شخصي أساسي",
            "الظهور في نتائج البحث",
            "استقبال تقييمات من المرضى",
        ],
        current: false,
        cta: "أنت على هذه الباقة",
        disabled: true,
    },
    {
        name: "الباقة المميزة",
        price: "499 جنيه/شهرياً",
        features: [
            "كل مميزات الباقة الأساسية",
            "ظهور مميز في البحث",
            "شارة 'طبيب مميز' على ملفك",
            "تحليلات أساسية لزيارات ملفك",
        ],
        popular: true,
        current: true,
        cta: "تم الاشتراك",
        disabled: true,
    },
    {
        name: "الباقة الاحترافية",
        price: "999 جنيه/شهرياً",
        features: [
            "كل مميزات الباقة المميزة",
            "الظهور في أعلى نتائج البحث دائماً",
            "حملات إعلانية مخصصة",
            "تحليلات متقدمة وتقارير شهرية",
        ],
        current: false,
        cta: "الترقية الآن",
        disabled: false,
    },
];

export default function SubscriptionPage() {
    return (
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up" style={{ animationFillMode: 'backwards', animationDelay: '0.1s' }}>
                <h1 className="text-4xl font-bold font-headline">باقات اشتراك الأطباء</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    اختر الباقة التي تناسب احتياجاتك لتعزيز ظهورك والوصول لعدد أكبر من المرضى.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {plans.map((plan, index) => (
                    <div key={plan.name} className="animate-fade-in-up" style={{ animationFillMode: 'backwards', animationDelay: `${(index * 0.2) + 0.3}s` }}>
                        <Card className={`flex flex-col h-full ${plan.popular ? 'border-2 border-primary shadow-2xl' : ''}`}>
                            {plan.popular && <div className="bg-primary text-primary-foreground text-center py-1.5 text-sm font-bold rounded-t-lg">الأكثر شيوعاً</div>}
                            <CardHeader className="text-center pt-8">
                                <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                                <CardDescription className="text-3xl font-bold text-primary h-16 flex items-center justify-center">{plan.price}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 me-3 mt-1 flex-shrink-0" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="p-6">
                                <Button className="w-full" size="lg" disabled={plan.disabled} variant={plan.popular ? 'default' : 'outline'}>
                                    {plan.cta}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
