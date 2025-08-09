
'use client';

import { BookServiceDialog } from '@/components/book-service-dialog';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const allServices = [
  {
    name: 'Emergency Towing',
    category: 'Emergency',
    priceRange: '75 - 150',
    price: 75,
    description: '24/7 towing service for vehicle breakdowns and accidents',
    time: '15-30 mins',
    icon: '/tow-truck.png',
    hint: 'towing truck',
  },
  {
    name: 'Roadside Battery',
    category: 'Emergency',
    priceRange: '45 - 90',
    price: 45,
    description: 'Quick battery jump-start and replacement service',
    time: '20-35 mins',
    icon: '/battery.png',
    hint: 'car battery',
  },
    {
    name: 'Tire Change',
    category: 'Emergency',
    price: 55,
    priceRange: '55 - 100',
    description: 'Flat tire replacement service.',
    time: '20-40 mins',
    icon: '/tire.png',
    hint: 'tire change',
  },
  {
    name: 'Fuel Delivery',
    category: 'Emergency',
    price: 65,
    priceRange: '65 - 90',
    description: 'Emergency fuel delivery when you run out.',
    time: '15-30 mins',
    icon: '/fuel.png',
    hint: 'gas can',
  },
  {
    name: 'Oil Change',
    category: 'Maintenance',
    priceRange: '40 - 80',
    price: 40,
    description: 'Professional oil change service with quality lubricants',
    time: '30-45 mins',
    icon: '/fuel.png',
    hint: 'oil change',
  },
  {
    name: 'Brake Service',
    category: 'Maintenance',
    priceRange: '100 - 300',
    price: 100,
    description: 'Comprehensive brake inspection and maintenance',
    time: '1-2 hours',
    icon: '/tire.png',
    hint: 'brake pad',
  },
    {
    name: 'Engine Diagnostics',
    category: 'Repair',
    price: 80,
    priceRange: '80 - 200',
    description: 'Advanced diagnostics to identify engine issues.',
    time: '1-3 hours',
    icon: '/tow-truck.png',
    hint: 'engine diagnostic',
  },
];

const serviceCategories = ['All', 'Emergency', 'Maintenance', 'Repair'];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [selectedService, setSelectedService] = React.useState<{ name: string; price: number; icon: string; } | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredServices = allServices.filter(service => {
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const emergencyServices = filteredServices.filter(s => s.category === 'Emergency');
  const maintenanceServices = filteredServices.filter(s => s.category === 'Maintenance');
  const repairServices = filteredServices.filter(s => s.category === 'Repair');

  return (
    <Dialog onOpenChange={(open) => !open && setSelectedService(null)}>
      <div className="flex flex-col min-h-screen bg-card">
        <header className="sticky top-0 bg-background shadow-sm z-10 p-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <Icons.arrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div className="relative flex-grow">
              <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                className="pl-10 bg-card border-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 -mb-2">
            {serviceCategories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'secondary'}
                className="rounded-full px-4"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </header>

        <main className="flex-grow p-4 space-y-6">
          {(activeCategory === 'All' || activeCategory === 'Emergency') && emergencyServices.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-accent mb-2">
                Emergency Services
              </h2>
              <div className="space-y-4">
                {emergencyServices.map((service) => (
                  <Card key={service.name} className="p-4 shadow-md rounded-xl bg-background">
                    <div className="flex gap-4">
                      <Image
                        src={service.icon}
                        alt={service.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-contain aspect-square p-2 bg-card"
                        data-ai-hint={service.hint}
                      />
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold">{service.name}</h3>
                          <p className="font-bold text-foreground bg-card px-2 py-1 rounded-md text-sm">${service.priceRange}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Icons.clock className="h-4 w-4 mr-1" />
                            <span>{service.time}</span>
                          </div>
                          <DialogTrigger asChild>
                            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg" onClick={() => setSelectedService(service)}>Book Service</Button>
                          </DialogTrigger>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {(activeCategory === 'All' || activeCategory === 'Maintenance') && maintenanceServices.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-blue-400 mb-2">
                Maintenance Services
              </h2>
              <div className="space-y-4">
                {maintenanceServices.map((service) => (
                   <Card key={service.name} className="p-4 shadow-md rounded-xl bg-background">
                   <div className="flex gap-4">
                     <Image
                       src={service.icon}
                       alt={service.name}
                       width={80}
                       height={80}
                       className="rounded-lg object-contain aspect-square p-2 bg-card"
                       data-ai-hint={service.hint}
                     />
                     <div className="flex-grow">
                       <div className="flex justify-between items-start">
                         <h3 className="font-bold">{service.name}</h3>
                         <p className="font-bold text-foreground bg-card px-2 py-1 rounded-md text-sm">${service.priceRange}</p>
                       </div>
                       <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                       <div className="flex items-center justify-between mt-2">
                         <div className="flex items-center text-sm text-muted-foreground">
                           <Icons.clock className="h-4 w-4 mr-1" />
                           <span>{service.time}</span>
                         </div>
                         <DialogTrigger asChild>
                           <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg" onClick={() => setSelectedService(service)}>Book Service</Button>
                         </DialogTrigger>
                       </div>
                     </div>
                   </div>
                 </Card>
                ))}
              </div>
            </div>
          )}

          {(activeCategory === 'All' || activeCategory === 'Repair') && repairServices.length > 0 && (
             <div>
              <h2 className="text-lg font-bold text-green-400 mb-2">
                Repair Services
              </h2>
              <div className="space-y-4">
                {repairServices.map((service) => (
                   <Card key={service.name} className="p-4 shadow-md rounded-xl bg-background">
                   <div className="flex gap-4">
                     <Image
                       src={service.icon}
                       alt={service.name}
                       width={80}
                       height={80}
                       className="rounded-lg object-contain aspect-square p-2 bg-card"
                       data-ai-hint={service.hint}
                     />
                     <div className="flex-grow">
                       <div className="flex justify-between items-start">
                         <h3 className="font-bold">{service.name}</h3>
                         <p className="font-bold text-foreground bg-card px-2 py-1 rounded-md text-sm">${service.priceRange}</p>
                       </div>
                       <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                       <div className="flex items-center justify-between mt-2">
                         <div className="flex items-center text-sm text-muted-foreground">
                           <Icons.clock className="h-4 w-4 mr-1" />
                           <span>{service.time}</span>
                         </div>
                         <DialogTrigger asChild>
                           <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg" onClick={() => setSelectedService(service)}>Book Service</Button>
                         </DialogTrigger>
                       </div>
                     </div>
                   </div>
                 </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      {selectedService && <BookServiceDialog service={selectedService} />}
    </Dialog>
  );
}
