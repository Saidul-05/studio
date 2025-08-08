
'use client';

import { AssignMechanicDialog } from '@/components/assign-mechanic-dialog';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import withAuth from '@/components/withAuth';
import React from 'react';

const initialNewRequests = [
  {
    id: 'req1',
    customerName: 'Alice Johnson',
    customerAvatar: 'https://placehold.co/100x100.png',
    service: 'Tire Change',
    location: '456 Oak Avenue, New York, NY',
    time: '10:15 AM',
    icon: <Icons.carTire className="h-6 w-6 text-white" />,
    iconBg: 'bg-green-500',
  },
  {
    id: 'req2',
    customerName: 'Bob Williams',
    customerAvatar: 'https://placehold.co/100x100.png',
    service: 'Fuel Delivery',
    location: '789 Pine Street, New York, NY',
    time: '10:05 AM',
    icon: <Icons.fuel className="h-6 w-6 text-white" />,
    iconBg: 'bg-orange-500',
  },
];

const initialActiveJobs = [
    {
        id: 'job1',
        customerName: 'Jane Doe',
        customerAvatar: 'https://placehold.co/100x100.png',
        service: 'Towing Service',
        location: '123 Main Street, New York, NY',
        mechanic: {
            name: 'Michael Chen',
            avatar: 'https://placehold.co/100x100.png'
        },
        status: 'En Route',
        icon: <Icons.towTruck className="h-6 w-6 text-white" />,
        iconBg: 'bg-blue-500',
    }
]

const availableMechanics = [
    { id: 'mech1', name: 'Michael Chen', avatar: 'https://placehold.co/100x100.png', rating: 4.9, onJob: false },
    { id: 'mech2', name: 'David Rodriguez', avatar: 'https://placehold.co/100x100.png', rating: 4.8, onJob: false },
    { id: 'mech3', name: 'Chris Lee', avatar: 'https://placehold.co/100x100.png', rating: 4.7, onJob: true },
];

type Job = {
    id: string;
    customerName: string;
    customerAvatar: string;
    service: string;
    location: string;
    mechanic?: {
        name: string;
        avatar: string;
    };
    status?: string;
    time?: string;
    icon: React.ReactNode;
    iconBg: string;
};

function ProviderDashboardPage() {
    const [newRequests, setNewRequests] = React.useState<Job[]>(initialNewRequests);
    const [activeJobs, setActiveJobs] = React.useState<Job[]>(initialActiveJobs);
    const [selectedRequest, setSelectedRequest] = React.useState<Job | null>(null);

    const handleAssignMechanic = (requestId: string, mechanic: typeof availableMechanics[0]) => {
        const requestToAssign = newRequests.find(req => req.id === requestId);
        if (requestToAssign) {
            setNewRequests(newRequests.filter(req => req.id !== requestId));
            setActiveJobs([...activeJobs, { ...requestToAssign, mechanic: { name: mechanic.name, avatar: mechanic.avatar }, status: 'Assigned' }]);
        }
    }


  return (
    <Dialog onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <Icons.dollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$12,450.50</div>
                        <p className="text-xs text-muted-foreground">+15.2% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                        <Icons.wrench className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+450</div>
                        <p className="text-xs text-muted-foreground">+8.5% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Mechanics</CardTitle>
                        <Icons.userCog className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12 / 15</div>
                        <p className="text-xs text-muted-foreground">3 mechanics available</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>New Service Requests</CardTitle>
                        <CardDescription>Assign these requests to available mechanics.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    {newRequests.length > 0 ? (
                        <div className="space-y-4">
                        {newRequests.map((item) => (
                            <Card key={item.id} className="p-4 shadow-sm">
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
                                <div className="mt-3 pt-3 border-t flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={item.customerAvatar} data-ai-hint="customer portrait"/>
                                            <AvatarFallback>{item.customerName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{item.customerName}</span>
                                    </div>
                                    <DialogTrigger asChild>
                                        <Button size="sm" onClick={() => setSelectedRequest(item)}>Assign Mechanic</Button>
                                    </DialogTrigger>
                                </div>
                            </Card>
                        ))}
                        </div>
                    ) : (
                        <div className='p-4 text-center text-gray-500 bg-gray-100 rounded-md'>
                            No new service requests.
                        </div>
                    )}
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Active Jobs</CardTitle>
                        <CardDescription>Track the progress of ongoing services.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    {activeJobs.length > 0 ? (
                            <div className="space-y-4">
                            {activeJobs.map((item) => (
                                <Card key={item.id} className="p-4 shadow-sm">
                                <div className="flex gap-4">
                                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${item.iconBg}`}>
                                    {item.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold">{item.service}</h3>
                                            <Badge variant={item.status === 'En Route' ? 'default' : 'secondary'}
                                                className={
                                                    item.status === 'En Route'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : item.status === 'Assigned'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : ''
                                                }
                                            >{item.status}</Badge>
                                        </div>
                                        <p className="text-sm text-gray-500">{item.location}</p>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2">
                                    <div className="flex items-center gap-2">
                                        <p className='text-xs text-gray-500'>Customer:</p>
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={item.customerAvatar} data-ai-hint="customer portrait"/>
                                            <AvatarFallback>{item.customerName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs font-medium">{item.customerName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className='text-xs text-gray-500'>Mechanic:</p>
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={item.mechanic?.avatar} data-ai-hint="mechanic portrait"/>
                                            <AvatarFallback>{item.mechanic?.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs font-medium">{item.mechanic?.name}</span>
                                    </div>
                                </div>
                                </Card>
                            ))}
                            </div>
                        ) : (
                            <div className='p-4 text-center text-gray-500 bg-gray-100 rounded-md'>
                                No active jobs.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
       {selectedRequest && (
        <AssignMechanicDialog
          request={selectedRequest}
          mechanics={availableMechanics}
          onAssign={handleAssignMechanic}
        />
      )}
    </Dialog>
  );
}

export default withAuth(ProviderDashboardPage);
