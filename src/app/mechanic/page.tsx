
'use client';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import React from 'react';

const activeServices = [
  {
    customerName: 'Jane Doe',
    customerAvatar: 'https://placehold.co/100x100.png',
    service: 'Towing Service',
    location: '123 Main Street, New York, NY',
    time: '4:30 PM',
    status: 'En Route',
    icon: <Icons.towTruck className="h-6 w-6 text-white" />,
    iconBg: 'bg-blue-500',
  },
  {
    customerName: 'John Smith',
    customerAvatar: 'https://placehold.co/100x100.png',
    service: 'Battery Jump',
    location: '456 Park Avenue, New York, NY',
    time: '5:00 PM',
    status: 'Pending',
    icon: <Icons.battery className="h-6 w-6 text-white" />,
    iconBg: 'bg-yellow-500',
  },
];

const completedServices = [
    {
        customerName: 'Emily White',
        customerAvatar: 'https://placehold.co/100x100.png',
        service: 'Tire Change',
        location: '789 Broadway, New York, NY',
        date: 'Apr 24, 2025',
        earnings: 55.00,
        icon: <Icons.carTire className="h-6 w-6 text-white" />,
        iconBg: 'bg-green-500',
    }
]

export default function MechanicDashboardPage() {
    const [activeJobs, setActiveJobs] = React.useState(activeServices);

    const handleStatusChange = (index: number, newStatus: string) => {
        const updatedJobs = [...activeJobs];
        updatedJobs[index].status = newStatus;
        setActiveJobs(updatedJobs);
    };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white shadow-sm z-10 p-4">
        <div className="flex items-center justify-between">
          <div className='flex items-center gap-2'>
            <Icons.logo className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold">Mechanic Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Icons.bell className="h-6 w-6" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="mechanic portrait" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 space-y-6">
        <div>
            <h2 className="text-xl font-bold mb-4">Active Service Requests</h2>
            <div className="space-y-4">
            {activeJobs.map((item, index) => (
                <Card key={index} className="p-4 shadow-md rounded-xl bg-white">
                    <div className="flex gap-4">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${item.iconBg}`}>
                        {item.icon}
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold">{item.service}</h3>
                                <p className="text-sm font-medium">{item.time}</p>
                            </div>
                            <p className="text-sm text-gray-500">{item.location}</p>
                        </div>
                    </div>
                     <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={item.customerAvatar} data-ai-hint="customer portrait"/>
                                <AvatarFallback>{item.customerName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{item.customerName}</span>
                        </div>
                        <div className="w-[140px]">
                            <Select value={item.status} onValueChange={(newStatus) => handleStatusChange(index, newStatus)}>
                                <SelectTrigger className="w-full bg-gray-100 border-none">
                                    <SelectValue placeholder="Update Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="En Route">En Route</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Canceled">Canceled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </Card>
            ))}
            </div>
        </div>

        <div>
            <h2 className="text-xl font-bold mb-4">Completed Services</h2>
            <div className="space-y-4">
            {completedServices.map((item, index) => (
                <Card key={index} className="p-4 shadow-md rounded-xl bg-white">
                <div className="flex items-center">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${item.iconBg}`}>
                        {item.icon}
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="font-semibold">{item.service}</p>
                        <p className="text-sm text-gray-500">{item.customerName} - {item.date}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg text-green-600">+${item.earnings.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Earnings</p>
                    </div>
                </div>
                </Card>
            ))}
            </div>
        </div>
      </main>

       <footer className="sticky bottom-0 bg-white shadow-[0_-1px_10px_rgba(0,0,0,0.1)] rounded-t-2xl z-20">
        <nav className="flex justify-around items-center p-2">
          <Link href="/mechanic" className="flex flex-col h-auto items-center text-primary">
            <Button variant="ghost" className="flex flex-col h-auto items-center text-primary">
                <Icons.layoutDashboard className="h-6 w-6 mb-1" />
                <span className="text-xs">Dashboard</span>
            </Button>
          </Link>
          <Link href="#" className="flex flex-col h-auto items-center text-muted-foreground">
            <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
                <Icons.dollarSign className="h-6 w-6 mb-1" />
                <span className="text-xs">Earnings</span>
            </Button>
          </Link>
          <Link href="#" className="flex flex-col h-auto items-center text-muted-foreground">
            <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
              <Icons.user className="h-6 w-6 mb-1" />
              <span className="text-xs">Profile</span>
            </Button>
          </Link>
        </nav>
      </footer>
    </div>
  );
}
