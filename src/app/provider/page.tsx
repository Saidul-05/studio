
'use client';

import { AssignMechanicDialog } from '@/components/assign-mechanic-dialog';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';
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

export default function ProviderDashboardPage() {
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
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="sticky top-0 bg-white shadow-sm z-10 p-4">
          <div className="flex items-center justify-between">
            <div className='flex items-center gap-2'>
              <Icons.logo className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold">Provider Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Icons.bell className="h-6 w-6" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="provider portrait" />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-grow p-4 space-y-6">
          <div>
              <h2 className="text-xl font-bold mb-4">New Service Requests</h2>
              {newRequests.length > 0 ? (
                <div className="space-y-4">
                  {newRequests.map((item) => (
                      <Card key={item.id} className="p-4 shadow-md rounded-xl bg-white">
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
                               <DialogTrigger asChild>
                                  <Button size="sm" onClick={() => setSelectedRequest(item)}>Assign Mechanic</Button>
                               </DialogTrigger>
                          </div>
                      </Card>
                  ))}
                </div>
              ) : (
                <Card className='p-4 text-center text-gray-500 bg-gray-100'>
                    No new service requests.
                </Card>
              )}
          </div>

          <div>
              <h2 className="text-xl font-bold mb-4">Active Jobs</h2>
               {activeJobs.length > 0 ? (
                    <div className="space-y-4">
                    {activeJobs.map((item) => (
                        <Card key={item.id} className="p-4 shadow-md rounded-xl bg-white">
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
                        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <p className='text-sm text-gray-500'>Customer:</p>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={item.customerAvatar} data-ai-hint="customer portrait"/>
                                    <AvatarFallback>{item.customerName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{item.customerName}</span>
                            </div>
                             <div className="flex items-center gap-2">
                                <p className='text-sm text-gray-500'>Mechanic:</p>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={item.mechanic?.avatar} data-ai-hint="mechanic portrait"/>
                                    <AvatarFallback>{item.mechanic?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{item.mechanic?.name}</span>
                            </div>
                        </div>
                        </Card>
                    ))}
                    </div>
                ) : (
                    <Card className='p-4 text-center text-gray-500 bg-gray-100'>
                        No active jobs.
                    </Card>
                )}
          </div>
        </main>

        <footer className="sticky bottom-0 bg-white shadow-[0_-1px_10px_rgba(0,0,0,0.1)] rounded-t-2xl z-20">
          <nav className="flex justify-around items-center p-2">
            <Link href="/provider" className="flex flex-col h-auto items-center text-primary">
              <Button variant="ghost" className="flex flex-col h-auto items-center text-primary">
                  <Icons.layoutDashboard className="h-6 w-6 mb-1" />
                  <span className="text-xs">Dashboard</span>
              </Button>
            </Link>
            <Link href="#" className="flex flex-col h-auto items-center text-muted-foreground">
              <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
                  <Icons.users className="h-6 w-6 mb-1" />
                  <span className="text-xs">Mechanics</span>
              </Button>
            </Link>
             <Link href="#" className="flex flex-col h-auto items-center text-muted-foreground">
                <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
                    <Icons.history className="h-6 w-6 mb-1" />
                    <span className="text-xs">History</span>
                </Button>
            </Link>
            <Link href="/profile" className="flex flex-col h-auto items-center text-muted-foreground">
              <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
                <Icons.user className="h-6 w-6 mb-1" />
                <span className="text-xs">Profile</span>
              </Button>
            </Link>
          </nav>
        </footer>
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
