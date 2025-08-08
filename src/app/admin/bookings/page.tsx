
'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';

const bookings = [
  { id: 'BK001', service: 'Towing Service', customer: 'Liam Johnson', mechanic: 'Michael Chen', date: '2025-05-01', status: 'Completed', amount: '$85.00' },
  { id: 'BK002', service: 'Battery Jump', customer: 'Olivia Smith', mechanic: 'David Rodriguez', date: '2025-05-02', status: 'In Progress', amount: '$50.00' },
  { id: 'BK003', service: 'Tire Change', customer: 'Noah Williams', mechanic: 'Chris Lee', date: '2025-05-03', status: 'Completed', amount: '$60.00' },
  { id: 'BK004', service: 'Fuel Delivery', customer: 'Emma Brown', mechanic: 'N/A', date: '2025-05-04', status: 'Canceled', amount: '$0.00' },
  { id: 'BK005', service: 'Oil Change', customer: 'James Jones', mechanic: 'Michael Chen', date: '2025-05-05', status: 'Scheduled', amount: '$75.00' },
  { id: 'BK006', service: 'Brake Inspection', customer: 'Ava Garcia', mechanic: 'Chris Lee', date: '2025-05-06', status: 'Scheduled', amount: '$120.00' },
];

export default function AdminBookingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings</CardTitle>
        <CardDescription>Manage all service bookings.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Mechanic</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>{booking.service}</TableCell>
                <TableCell>{booking.customer}</TableCell>
                <TableCell>{booking.mechanic}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>
                   <Badge 
                        variant={
                            booking.status === 'Completed' ? 'default' :
                            booking.status === 'In Progress' ? 'secondary' :
                            booking.status === 'Canceled' ? 'destructive' : 'outline'
                        }
                        className={
                            booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            booking.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' : ''
                        }
                    >
                        {booking.status}
                    </Badge>
                </TableCell>
                <TableCell className="text-right">{booking.amount}</TableCell>
                 <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem>Cancel Booking</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
