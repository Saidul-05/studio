
'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import withAuth from '@/components/withAuth';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const completedJobs = [
  { id: 'JOB001', service: 'Towing Service', customer: { name: 'Liam Johnson', avatar: 'https://placehold.co/100x100.png'}, date: '2025-05-01', status: 'Completed', earnings: '$70.00', rating: 5 },
  { id: 'JOB002', service: 'Tire Change', customer: { name: 'Noah Williams', avatar: 'https://placehold.co/100x100.png'}, date: '2025-05-03', status: 'Completed', earnings: '$50.00', rating: 4 },
  { id: 'JOB003', service: 'Fuel Delivery', customer: { name: 'Emma Brown', avatar: 'https://placehold.co/100x100.png'}, date: '2025-04-28', status: 'Canceled', earnings: '$0.00', rating: null },
  { id: 'JOB004', service: 'Battery Jump', customer: { name: 'Olivia Smith', avatar: 'https://placehold.co/100x100.png'}, date: '2025-05-02', status: 'Completed', earnings: '$40.00', rating: 5 },
];

function MechanicHistoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job History</CardTitle>
        <CardDescription>Review all your past and completed jobs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Earnings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {completedJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.id}</TableCell>
                <TableCell>{job.service}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={job.customer.avatar} />
                            <AvatarFallback>{job.customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{job.customer.name}</span>
                    </div>
                </TableCell>
                <TableCell>{job.date}</TableCell>
                <TableCell>
                   <Badge
                        variant={
                            job.status === 'Completed' ? 'default' : 'destructive'
                        }
                        className={
                            job.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                            job.status === 'Canceled' ? 'bg-red-500/20 text-red-300' : ''
                        }
                    >
                        {job.status}
                    </Badge>
                </TableCell>
                <TableCell>
                    {job.rating ? (
                        <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            {job.rating.toFixed(1)}
                        </div>
                    ) : 'N/A'}
                </TableCell>
                <TableCell className="text-right">{job.earnings}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default withAuth(MechanicHistoryPage);
