
'use client';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const quickActions = [
    { name: 'Vehicles', icon: <Icons.car className="h-6 w-6 text-primary" /> },
    { name: 'Addresses', icon: <Icons.mapPin className="h-6 w-6 text-primary" /> },
    { name: 'Payments', icon: <Icons.creditCard className="h-6 w-6 text-primary" /> },
    { name: 'Support', icon: <Icons.headset className="h-6 w-6 text-primary" /> },
];

const stats = [
    { value: '24', label: 'Total Services', icon: <Icons.wrench className="h-5 w-5 text-white" />, color: 'bg-blue-500' },
    { value: '2', label: 'Active Bookings', icon: <Icons.clock className="h-5 w-5 text-white" />, color: 'bg-blue-500' },
    { value: '8', label: 'Saved Services', icon: <Icons.heart className="h-5 w-5 text-white" />, color: 'bg-blue-500' },
    { value: '2,450', label: 'Loyalty Points', icon: <Icons.star className="h-5 w-5 text-white" />, color: 'bg-blue-500' },
]

const recentServices = [
  {
    name: 'Oil Change Service',
    date: 'Mar 23, 2025',
    price: 75.0,
    status: 'Completed',
    icon: '/fuel.png',
    hint: 'oil change',
  },
  {
    name: 'Brake Inspection',
    date: 'Mar 20, 2025',
    price: 120.0,
    status: 'Completed',
    icon: '/tire.png',
    hint: 'brake pad',
  },
];


export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white shadow-sm z-10 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Profile</h1>
          <Button variant="ghost" size="icon">
            <Icons.settings className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="flex-grow p-4 space-y-6">
        <Card className="p-4 shadow-md rounded-xl bg-white">
            <div className='flex items-center gap-4'>
                <Avatar className="h-16 w-16">
                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person face" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className='flex-grow'>
                    <h2 className='font-bold text-lg'>James Davidson</h2>
                    <p className='text-sm text-gray-500'>Premium Member</p>
                    <Badge className='mt-1 bg-blue-100 text-blue-800 border-blue-200'>Verified Account</Badge>
                </div>
                <Button variant="ghost" size="icon" className='bg-gray-100'>
                    <Icons.pencil className='h-5 w-5'/>
                </Button>
            </div>
        </Card>
        
        <Card className="p-4 shadow-md rounded-xl bg-white">
            <div className="grid grid-cols-4 gap-2 text-center">
                {quickActions.map(action => (
                    <div key={action.name} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center justify-center h-12 w-12 bg-gray-100 rounded-lg mb-2">
                           {action.icon}
                        </div>
                        <p className="text-xs font-medium text-gray-600">{action.name}</p>
                    </div>
                ))}
            </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
            {stats.map(stat => (
                <Card key={stat.label} className="p-4 shadow-md rounded-xl bg-white flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${stat.color}`}>
                        {stat.icon}
                    </div>
                    <div>
                        <p className="font-bold text-xl">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                </Card>
            ))}
        </div>

        <Card className="p-4 shadow-md rounded-xl bg-white">
            <h3 className="font-bold mb-3 text-lg">Recent Services</h3>
            <div className="space-y-4">
                {recentServices.map((service, index) => (
                    <div key={index} className="flex items-center">
                        <Image
                            src={service.icon}
                            alt={service.name}
                            width={48}
                            height={48}
                            className="rounded-lg object-contain aspect-square bg-gray-100 p-1"
                            data-ai-hint={service.hint}
                        />
                        <div className="flex-grow ml-4">
                            <p className="font-semibold">{service.name}</p>
                            <p className="text-sm text-gray-500">{service.date}</p>
                        </div>
                        <div className="text-right">
                            <Badge variant="secondary" className='bg-green-100 text-green-800'>{service.status}</Badge>
                            <p className="font-bold text-gray-800 mt-1">${service.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
        
        <Card className="p-4 shadow-md rounded-xl bg-white">
            <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                    <Icons.bell className="h-5 w-5 text-gray-600"/>
                    <span className="font-medium">Notifications</span>
                </div>
                <Switch defaultChecked/>
            </div>
            <div className="flex items-center justify-between py-2 mt-2">
                <div className="flex items-center gap-3">
                    <Icons.moon className="h-5 w-5 text-gray-600"/>
                    <span className="font-medium">Dark Mode</span>
                </div>
                <Switch />
            </div>
        </Card>

      </main>

      <footer className="sticky bottom-0 bg-white shadow-[0_-1px_10px_rgba(0,0,0,0.1)] rounded-t-2xl z-20">
        <nav className="flex justify-around items-center p-2">
          <Link href="/" className="flex flex-col h-auto items-center text-muted-foreground">
            <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
                <Icons.home className="h-6 w-6 mb-1" />
                <span className="text-xs">Home</span>
            </Button>
          </Link>
          <Link href="/services" className="flex flex-col h-auto items-center text-muted-foreground">
            <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
                <Icons.wrench className="h-6 w-6 mb-1" />
                <span className="text-xs">Services</span>
            </Button>
          </Link>
          <Link href="/explore" className="flex flex-col h-auto items-center text-muted-foreground">
            <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
              <Icons.compass className="h-6 w-6 mb-1" />
              <span className="text-xs">Explore</span>
            </Button>
          </Link>
          <Link href="/history" className="flex flex-col h-auto items-center text-muted-foreground">
            <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
                <Icons.history className="h-6 w-6 mb-1" />
                <span className="text-xs">History</span>
            </Button>
          </Link>
          <Link href="/profile" className="flex flex-col h-auto items-center text-primary">
            <Button variant="ghost" className="flex flex-col h-auto items-center text-primary">
              <Icons.user className="h-6 w-6 mb-1" />
              <span className="text-xs">Profile</span>
            </Button>
          </Link>
        </nav>
      </footer>
    </div>
  );
}
