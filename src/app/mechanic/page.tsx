
'use client';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const stats = [
    { title: "Today's Earnings", value: "$125.50", icon: <Icons.dollarSign className="h-6 w-6 text-muted-foreground" /> },
    { title: "Active Jobs", value: "2", icon: <Icons.wrench className="h-6 w-6 text-muted-foreground" /> },
    { title: "Completed Today", value: "3", icon: <Icons.checkCircle className="h-6 w-6 text-muted-foreground" /> },
    { title: "Average Rating", value: "4.9", icon: <Icons.star className="h-6 w-6 text-muted-foreground" /> },
]

export default function MechanicDashboardPage() {
    const [activeJobs, setActiveJobs] = React.useState(activeServices);

    const handleStatusChange = (index: number, newStatus: string) => {
        const updatedJobs = [...activeJobs];
        updatedJobs[index].status = newStatus;
        setActiveJobs(updatedJobs);
    };


  return (
    <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map(stat => (
                 <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        {stat.icon}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Active Service Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            {activeJobs.map((item, index) => (
                <Card key={index} className="p-4 shadow-sm rounded-xl bg-card">
                    <div className="flex gap-4">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${item.iconBg}`}>
                        {item.icon}
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold">{item.service}</h3>
                                <p className="text-sm font-medium">{item.time}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.location}</p>
                        </div>
                    </div>
                     <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={item.customerAvatar} data-ai-hint="customer portrait"/>
                                <AvatarFallback>{item.customerName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{item.customerName}</span>
                        </div>
                        <div className="w-[140px]">
                            <Select value={item.status} onValueChange={(newStatus) => handleStatusChange(index, newStatus)}>
                                <SelectTrigger className="w-full bg-background border-border">
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
            </CardContent>
        </Card>
    </div>
  );
}
