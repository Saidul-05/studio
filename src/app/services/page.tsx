
'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const emergencyServices = [
  {
    name: 'Emergency Towing',
    price: '75 - 150',
    description: '24/7 towing service for vehicle breakdowns and accidents',
    time: '15-30 mins',
    icon: '/tow-truck.png',
    hint: 'towing truck',
  },
  {
    name: 'Roadside Battery',
    price: '45 - 90',
    description: 'Quick battery jump-start and replacement service',
    time: '20-35 mins',
    icon: '/battery.png',
    hint: 'car battery',
  },
];

const maintenanceServices = [
  {
    name: 'Oil Change',
    price: '40 - 80',
    description: 'Professional oil change service with quality lubricants',
    time: '30-45 mins',
    icon: '/fuel.png',
    hint: 'oil change',
  },
  {
    name: 'Brake Service',
    price: '100 - 300',
    description: 'Comprehensive brake inspection and maintenance',
    time: '1-2 hours',
    icon: '/tire.png',
    hint: 'brake pad',
  },
];

const serviceCategories = ['All', 'Emergency', 'Maintenance', 'Repair'];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = React.useState('All');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white shadow-sm z-10 p-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <Icons.arrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="relative flex-grow">
            <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search services..."
              className="pl-10 bg-gray-100 border-none"
            />
          </div>
          <Button variant="outline" size="icon">
            <Icons.filter className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 -mb-2">
          {serviceCategories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'ghost'}
              className={`rounded-full px-4 py-1 h-auto text-sm font-medium
                ${
                  activeCategory === category
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-500 border border-gray-200'
                }
                ${
                  category === 'Emergency' && activeCategory !== 'Emergency' ? 'text-red-500' : ''
                }
                ${
                  category === 'Maintenance' && activeCategory !== 'Maintenance' ? 'text-blue-500' : ''
                }
                ${
                  category === 'Repair' && activeCategory !== 'Repair' ? 'text-green-500' : ''
                }
              `}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </header>

      <main className="flex-grow p-4 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-red-600 mb-2">
            Emergency Services
          </h2>
          <div className="space-y-4">
            {emergencyServices.map((service) => (
              <Card key={service.name} className="p-4 shadow-md rounded-xl">
                <div className="flex gap-4">
                  <Image
                    src={service.icon}
                    alt={service.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-contain aspect-square"
                    data-ai-hint={service.hint}
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">{service.name}</h3>
                      <p className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded-md text-sm">${service.price}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Icons.clock className="h-4 w-4 mr-1" />
                        <span>{service.time}</span>
                      </div>
                      <Button size="sm" className="bg-gray-800 text-white hover:bg-gray-900 rounded-lg">Book Service</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-blue-600 mb-2">
            Maintenance Services
          </h2>
          <div className="space-y-4">
            {maintenanceServices.map((service) => (
              <Card key={service.name} className="p-4 shadow-md rounded-xl">
                <div className="flex gap-4">
                  <Image
                    src={service.icon}
                    alt={service.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-contain aspect-square"
                    data-ai-hint={service.hint}
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">{service.name}</h3>
                      <p className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded-md text-sm">${service.price}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Icons.clock className="h-4 w-4 mr-1" />
                        <span>{service.time}</span>
                      </div>
                      <Button size="sm" className="bg-gray-800 text-white hover:bg-gray-900 rounded-lg">Book Service</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 bg-white shadow-[0_-1px_10px_rgba(0,0,0,0.1)] rounded-t-2xl">
        <nav className="flex justify-around items-center p-2">
           <Link href="/" className="flex flex-col h-auto items-center text-muted-foreground">
            <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
                <Icons.home className="h-6 w-6 mb-1" />
                <span className="text-xs">Home</span>
            </Button>
          </Link>
          <Link href="/services" className="flex flex-col h-auto items-center text-primary">
            <Button variant="ghost" className="flex flex-col h-auto items-center text-primary">
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
  );
}
