import { doctors } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle, XCircle, FileText } from 'lucide-react';
import { approveVerificationAction, rejectVerificationAction } from '@/app/actions';

export default async function VerificationsPage() {
  const pendingDoctors = doctors.filter(
    (doctor) => doctor.verificationStatus === 'pending'
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>توثيقات الأطباء المعلقة</CardTitle>
        <CardDescription>
          راجع المستندات المقدمة من الأطباء وقم بتوثيق أو رفض حساباتهم.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم الطبيب</TableHead>
              <TableHead className="hidden md:table-cell">التخصص</TableHead>
              <TableHead className="hidden md:table-cell">تاريخ التقديم</TableHead>
              <TableHead>المستند</TableHead>
              <TableHead className="text-center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingDoctors.length > 0 ? (
              pendingDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">{doctor.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{doctor.specialty}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {doctor.submissionDate ? new Date(doctor.submissionDate).toLocaleDateString('ar-EG') : 'غير محدد'}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <a href={doctor.idCardImage} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-3 w-3 me-1" />
                        عرض الكارنيه
                      </a>
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-2 justify-center">
                        <form action={approveVerificationAction}>
                          <input type="hidden" name="doctorId" value={doctor.id} />
                          <Button type="submit" variant="outline" size="icon" className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700 h-8 w-8">
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">قبول</span>
                          </Button>
                        </form>
                         <form action={rejectVerificationAction}>
                          <input type="hidden" name="doctorId" value={doctor.id} />
                          <Button type="submit" variant="outline" size="icon" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700 h-8 w-8">
                            <XCircle className="h-4 w-4" />
                            <span className="sr-only">رفض</span>
                          </Button>
                        </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  لا توجد طلبات توثيق معلقة حاليًا.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
