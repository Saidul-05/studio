
'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import withAuth from '@/components/withAuth';

const completedJobs = [
  { id: 'JOB001', service: 'Towing Service', customer: 'Liam Johnson', mechanic: 'Michael Chen', date: '2025-05-01', status: 'Completed', earnings: '$70.00' },
  { id: 'JOB002', service: 'Tire Change', customer: 'Noah Williams', mechanic: 'Chris Lee', date: '2025-05-03', status: 'Completed', earnings: '$50.00' },
  { id: 'JOB003', service: 'Fuel Delivery', customer: 'Emma Brown', mechanic: 'David Rodriguez', date: '2025-04-28', status: 'Canceled', earnings: '$0.00' },
  { id: 'JOB004', service: 'Battery Jump', customer: 'Olivia Smith', mechanic: 'David Rodriguez', date: '2025-05-02', status: 'Completed', earnings: '$40.00' },
];

function ProviderHistoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job History</CardTitle>
        <CardDescription>Review all past and completed jobs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Mechanic</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Earnings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {completedJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.id}</TableCell>
                <TableCell>{job.service}</TableCell>
                <TableCell>{job.customer}</TableCell>
                <TableCell>{job.mechanic}</TableCell>
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
                <TableCell className="text-right">{job.earnings}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default withAuth(ProviderHistoryPage);
