'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ChartData {
    name: string;
    total: number;
}

interface RegistrationsChartProps {
    data: ChartData[];
}

export function RegistrationsChart({ data }: RegistrationsChartProps) {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>تسجيل الأطباء الجدد</CardTitle>
                <CardDescription>عدد الأطباء الجدد المسجلين شهريًا هذا العام.</CardDescription>
            </CardHeader>
            <CardContent className="ps-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))' }}
                            contentStyle={{ 
                                backgroundColor: 'hsl(var(--background))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: 'var(--radius)',
                            }}
                            wrapperClassName="!text-sm"
                        />
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="أطباء جدد" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
