
'use client';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import React from 'react';

const serviceHistory = [
  {
    date: 'April 24, 2025',
    time: '02:15 PM',
    service: 'Towing Service',
    location: '123 Main Street, New York, NY',
    mechanic: 'Michael Johnson',
    mechanicAvatar: 'https://placehold.co/100x100.png',
    price: 85.00,
    status: 'Completed',
    rating: 4,
    icon: <Icons.towTruck className="h-6 w-6 text-white" />,
    iconBg: 'bg-blue-500',
  },
  {
    date: 'April 18, 2025',
    time: '09:30 AM',
    service: 'Battery Jump',
    location: '456 Park Avenue, New York, NY',
    mechanic: 'Sarah Williams',
    mechanicAvatar: 'https://placehold.co/100x100.png',
    price: 45.00,
    status: 'Completed',
    rating: null,
    icon: <Icons.battery className="h-6 w-6 text-white" />,
    iconBg: 'bg-blue-500',
  },
  {
    date: 'April 10, 2025',
    time: '11:45 AM',
    service: 'Tire Change',
    location: '789 Broadway, New York, NY',
    mechanic: 'Robert Chen',
    mechanicAvatar: 'https://placehold.co/100x100.png',
    price: 55.00,
    status: 'Completed',
    rating: 5,
    icon: <Icons.carTire className="h-6 w-6 text-white" />,
    iconBg: 'bg-blue-500',
  },
  {
    date: 'March 30, 2025',
    time: '04:20 PM',
    service: 'Towing Service',
    location: '555 Fifth Avenue, New York, NY',
    mechanic: 'Jessica Brown',
    mechanicAvatar: 'https://placehold.co/100x100.png',
    price: 95.00,
    status: 'Canceled',
    rating: null,
    icon: <Icons.towTruck className="h-6 w-6 text-white" />,
    iconBg: 'bg-gray-400',
  },
];


const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.25 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );

export default function HistoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white shadow-sm z-10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.logo className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold">ResQ Auto</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Icons.bell className="h-6 w-6" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person face" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Service History</h2>
        </div>
        <div className="flex gap-2 mb-4">
            <Select defaultValue="all-time">
                <SelectTrigger className="w-[140px] bg-white">
                    <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                </SelectContent>
            </Select>
            <Select defaultValue="all-services">
                <SelectTrigger className="w-[140px] bg-white">
                    <SelectValue placeholder="All Services" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-services">All Services</SelectItem>
                    <SelectItem value="towing">Towing</SelectItem>
                    <SelectItem value="battery">Battery Jump</SelectItem>
                    <SelectItem value="tire">Tire Change</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="space-y-4">
          {serviceHistory.map((item, index) => (
            <Card key={index} className="p-4 shadow-md rounded-xl bg-white">
              <div className="text-sm text-gray-500 mb-2">
                {item.date} • {item.time}
              </div>
              <div className="flex gap-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${item.iconBg}`}>
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold">{item.service}</h3>
                        <p className="text-sm text-gray-500">{item.location}</p>
                    </div>
                    <Badge variant={item.status === 'Completed' ? 'default' : 'destructive'}
                      className={
                        item.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : item.status === 'Canceled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={item.mechanicAvatar} data-ai-hint="mechanic portrait"/>
                        <AvatarFallback>{item.mechanic.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{item.mechanic}</span>
                </div>
                <div className="text-right">
                    <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                    {item.rating ? (
                        <StarRating rating={item.rating} />
                    ) : item.status === 'Completed' ? (
                        <Button variant="outline" size="sm" className="mt-1">Leave Review</Button>
                    ) : null}
                </div>
              </div>
            </Card>
          ))}
        </div>
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
          <Link href="/history" className="flex flex-col h-auto items-center text-primary">
            <Button variant="ghost" className="flex flex-col h-auto items-center text-primary">
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
  );
}
