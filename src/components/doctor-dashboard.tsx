import type { Doctor } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Star, CheckCircle, MessageSquare } from 'lucide-react';

const calculateProfileCompletion = (doctor: Doctor) => {
    let score = 0;
    const fields = [doctor.bio, doctor.specialty, doctor.city, doctor.phone];
    const totalFields = fields.length;
    let filledFields = 0;

    fields.forEach(field => {
        if (field && field.trim() !== '') {
            filledFields++;
        }
    });
    
    // Verification is a big part of completion
    if (doctor.verificationStatus === 'verified') {
        score += 20;
    }
    
    // Other fields make up the rest
    score += (filledFields / totalFields) * 80;

    return Math.round(score);
}


export function DoctorDashboard({ doctor }: { doctor: Doctor }) {
    const completionPercentage = calculateProfileCompletion(doctor);
    const recentComments = doctor.comments?.slice(0, 3) || [];
    
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">مشاهدات الملف الشخصي</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">في آخر 30 يومًا (بيانات تجريبية)</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">متوسط التقييم</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{doctor.rating.toFixed(1)}</div>
                        <p className="text-xs text-muted-foreground">من أصل {doctor.reviews} تقييم</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">مستوى اكتمال الملف</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">{completionPercentage}%</div>
                        <Progress value={completionPercentage} />
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        آخر التقييمات
                    </CardTitle>
                     <CardDescription>
                        آخر 3 تقييمات من المرضى.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {recentComments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>المريض</TableHead>
                                        <TableHead>التقييم</TableHead>
                                        <TableHead className="hidden md:table-cell">التعليق</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentComments.map(comment => (
                                        <TableRow key={comment.id}>
                                            <TableCell className="font-medium">{comment.patientName}</TableCell>
                                            <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                <span>{comment.rating}</span>
                                            </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell text-muted-foreground">{comment.text}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">لا توجد تقييمات حتى الآن.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
