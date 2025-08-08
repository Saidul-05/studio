
'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import Link from 'next/link';

const serviceTypes = [
  {
    name: 'Towing Service',
    price: 75,
    icon: '/tow-truck.png',
    hint: 'tow truck',
  },
  {
    name: 'Battery Jump',
    price: 45,
    icon: '/battery.png',
    hint: 'car battery',
  },
  {
    name: 'Tire Change',
    price: 55,
    icon: '/tire.png',
    hint: 'tire change',
  },
  {
    name: 'Fuel Delivery',
    price: 65,
    icon: '/fuel.png',
    hint: 'gas can',
  },
];

export default function ConfirmEmergencyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white shadow-sm z-10 p-4 flex items-center gap-4">
        <Link href="/" passHref>
          <Button variant="ghost" size="icon">
            <Icons.arrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-center flex-grow">
          Confirm Emergency Request
        </h1>
        <div className="w-8"></div>
      </header>

      <main className="flex-grow p-4 space-y-6">
        <div>
          <Label htmlFor="location" className="font-bold text-lg">
            Your Location
          </Label>
          <div className="relative mt-2">
            <Icons.mapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
            <Input
              id="location"
              placeholder="Enter your location"
              defaultValue="23 Main Street, New York, NY"
              className="pl-10 h-12 bg-white border-primary"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
            <Icons.info className="h-4 w-4 text-blue-500" />
            <p>Please provide accurate location for faster response</p>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-2">Select Service Type</h2>
          <RadioGroup defaultValue={serviceTypes[0].name} className="space-y-3">
            {serviceTypes.map((service) => (
              <Label
                key={service.name}
                htmlFor={service.name}
                className="flex items-center gap-4 p-4 border rounded-xl bg-white has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer"
              >
                <RadioGroupItem value={service.name} id={service.name} />
                <Image
                  src={service.icon}
                  alt={service.name}
                  width={48}
                  height={48}
                  data-ai-hint={service.hint}
                />
                <div className="flex-grow">
                  <p className="font-semibold">{service.name}</p>
                  <p className="text-sm text-gray-500">
                    Starting from ${service.price}
                  </p>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <Card className="p-4 bg-white rounded-xl space-y-3">
            <h3 className="font-bold text-lg">Service Information</h3>
            <div className="flex items-center gap-3 text-sm text-gray-700">
                <Icons.clock className="h-5 w-5 text-primary" />
                <span>Estimated response time: 15-30 minutes</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
                <Icons.bill className="h-5 w-5 text-primary" />
                <span>Service fees may vary based on distance and complexity</span>
            </div>
             <div className="flex items-center gap-3 text-sm text-gray-700">
                <Icons.shieldCheck className="h-5 w-5 text-primary" />
                <span>All our mechanics are certified professionals</span>
            </div>
        </Card>
      </main>

      <footer className="sticky bottom-0 bg-white p-4 border-t">
        <div className="space-y-2">
          <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-lg">
            Confirm & Request Help
          </Button>
          <Link href="/" passHref className="w-full">
            <Button variant="ghost" className="w-full h-12 text-gray-600 text-lg">
                Cancel
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
