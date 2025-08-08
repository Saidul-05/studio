
'use client';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const mechanics = [
  {
    name: 'AutoFix Express',
    rating: 4.8,
    reviews: 124,
    distance: 0.8,
    services: ['Engine Repair', 'Diagnostics'],
    hours: '8:00 AM - 6:00 PM',
    available: true,
    image: 'https://placehold.co/100x100.png',
    lat: 40.7128,
    lng: -74.006,
  },
  {
    name: 'Premium Auto Care',
    rating: 4.9,
    reviews: 89,
    distance: 1.2,
    services: ['Luxury Vehicles', 'Electrical Systems'],
    hours: '7:30 AM - 8:00 PM',
    available: true,
    image: 'https://placehold.co/100x100.png',
    lat: 40.7228,
    lng: -74.016,
  },
  {
    name: 'Tire Pros',
    rating: 4.5,
    reviews: 210,
    distance: 2.1,
    services: ['Tire Change', 'Alignment'],
    hours: '9:00 AM - 5:00 PM',
    available: false,
    image: 'https://placehold.co/100x100.png',
    lat: 40.7158,
    lng: -73.996,
  },
];

const filterCategories = ['All', 'Towing', 'Repairs', 'Tires', 'Battery', 'EV Service'];

export default function ExplorePage() {
  const [viewMode, setViewMode] = React.useState('Map View');
  const [activeCategory, setActiveCategory] = React.useState('All');

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="sticky top-0 bg-white shadow-sm z-20 p-4">
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
          <div className="mt-4 relative">
            <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search mechanics, services..."
              className="pl-10 bg-gray-100 border-none"
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
                <Icons.sliders className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </header>

        <main className="flex-grow flex flex-col relative">
          <div className="p-4 bg-white">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                onClick={() => setViewMode('Map View')}
                className={`flex-1 ${viewMode === 'Map View' ? 'bg-white shadow' : 'bg-transparent text-gray-500'}`}
                variant="ghost"
              >
                <Icons.mapPin className="mr-2 h-5 w-5" /> Map View
              </Button>
              <Button
                onClick={() => setViewMode('List View')}
                className={`flex-1 ${viewMode === 'List View' ? 'bg-white shadow' : 'bg-transparent text-gray-500'}`}
                variant="ghost"
              >
                <Icons.list className="mr-2 h-5 w-5" /> List View
              </Button>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 -mb-2">
              {filterCategories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  className="rounded-full px-4"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {viewMode === 'Map View' && (
            <div className="flex-grow h-[300px] md:h-auto">
              <Map
                defaultCenter={{ lat: 40.7128, lng: -74.006 }}
                defaultZoom={13}
                mapId="RESQ_AUTO_MAP"
              >
                {mechanics.map((m) => (
                  <Marker key={m.name} position={{ lat: m.lat, lng: m.lng }} />
                ))}
              </Map>
            </div>
          )}

          <div className={`p-4 space-y-4 ${viewMode === 'Map View' ? 'absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg' : ''}`}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Nearby Mechanics</h2>
              <span className="text-sm text-gray-500">{mechanics.length} found</span>
            </div>
            <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-500px)]">
              {mechanics.map((mechanic) => (
                <Card key={mechanic.name} className="p-3 shadow-md rounded-xl">
                  <div className="flex gap-4">
                    <Image
                      src={mechanic.image}
                      alt={mechanic.name}
                      width={72}
                      height={72}
                      className="rounded-lg object-cover aspect-square"
                      data-ai-hint="car workshop"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold">{mechanic.name}</h3>
                        {mechanic.available && <Badge className="bg-green-100 text-green-800">Available</Badge>}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span className="text-yellow-500 mr-1">⭐</span>
                        <span>{mechanic.rating} ({mechanic.reviews})</span>
                        <span className="mx-1">·</span>
                        <Icons.mapPin className="h-4 w-4 mr-1"/>
                        <span>{mechanic.distance} km</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {mechanic.services.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Icons.clock className="h-4 w-4 mr-1" />
                          <span>{mechanic.hours}</span>
                        </div>
                        <Button variant="link" className="p-0 h-auto">View Details</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <Button className="absolute bottom-24 right-4 h-14 w-14 rounded-full bg-primary shadow-lg">
            <Icons.filter className="h-6 w-6" />
          </Button>
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
            <Link href="/explore" className="flex flex-col h-auto items-center text-primary">
              <Button variant="ghost" className="flex flex-col h-auto items-center text-primary">
                <Icons.compass className="h-6 w-6 mb-1" />
                <span className="text-xs">Explore</span>
              </Button>
            </Link>
            <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
              <Icons.history className="h-6 w-6 mb-1" />
              <span className="text-xs">History</span>
            </Button>
             <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
              <Icons.user className="h-6 w-6 mb-1" />
              <span className="text-xs">Profile</span>
            </Button>
          </nav>
        </footer>
      </div>
    </APIProvider>
  );
}
