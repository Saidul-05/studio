
'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

const services = [
  { id: 'svc001', name: 'Emergency Towing', category: 'Emergency', priceRange: '$75 - $150', status: 'Active', icon: '/tow-truck.png' },
  { id: 'svc002', name: 'Roadside Battery', category: 'Emergency', priceRange: '$45 - $90', status: 'Active', icon: '/battery.png' },
  { id: 'svc003', name: 'Tire Change', category: 'Emergency', priceRange: '$55 - $100', status: 'Active', icon: '/tire.png' },
  { id: 'svc004', name: 'Fuel Delivery', category: 'Emergency', priceRange: '$65 - $90', status: 'Active', icon: '/fuel.png' },
  { id: 'svc005', name: 'Oil Change', category: 'Maintenance', priceRange: '$40 - $80', status: 'Active', icon: '/fuel.png' },
  { id: 'svc006', name: 'Brake Service', category: 'Maintenance', priceRange: '$100 - $300', status: 'Inactive', icon: '/tire.png' },
  { id: 'svc007', name: 'Engine Diagnostics', category: 'Repair', priceRange: '$80 - $200', status: 'Active', icon: '/tow-truck.png' },
];

export default function AdminServicesPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Services</CardTitle>
            <CardDescription>Manage all services offered on the platform.</CardDescription>
          </div>
          <Button>Add New Service</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price Range</TableHead>
              <TableHead>Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image src={service.icon} alt={service.name} width={40} height={40} className="p-1 bg-gray-100 rounded-md" />
                    <span className="font-medium">{service.name}</span>
                  </div>
                </TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>{service.priceRange}</TableCell>
                <TableCell>
                  <Badge variant={service.status === 'Active' ? 'default' : 'destructive'}  
                    className={service.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                  >
                    {service.status}
                  </Badge>
                </TableCell>
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Set Inactive</DropdownMenuItem>
                      <DropdownMenuItem className='text-red-500'>Delete</DropdownMenuItem>
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
