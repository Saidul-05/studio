
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { useActionState } from 'react';
import { getSuggestions } from '@/lib/actions';
import { Textarea } from './ui/textarea';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const emergencyServices = [
  { name: 'Towing Service', price: 75, icon: '/tow-truck.png', hint: 'tow truck' },
  { name: 'Battery Jump', price: 45, icon: '/battery.png', hint: 'car battery' },
  { name: 'Tire Change', price: 55, icon: '/tire.png', hint: 'tire change' },
  { name: 'Fuel Delivery', price: 65, icon: '/fuel.png', hint: 'gas can' },
];

export function HomeView() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(getSuggestions, { solutions: [] });
  const [description, setDescription] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state, toast]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(description.length < 10) {
      toast({
        title: 'Error',
        description: 'Please provide a more detailed description.',
        variant: 'destructive',
      });
      return;
    }
    formAction(new FormData(e.currentTarget));
  }

  return (
    <div className="bg-secondary">
      <div className="relative h-64">
        <Image
          src="https://placehold.co/600x400.png"
          alt="Car repair shop"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          data-ai-hint="car service"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white space-y-2">
          <h2 className="text-3xl font-bold">24/7 Auto Assistance</h2>
          <p className="text-sm">Professional help whenever you need it</p>
        </div>
      </div>

      <div className="p-4 space-y-6 bg-secondary -mt-8 rounded-t-2xl relative">
        <div className="relative">
          <Icons.mapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="123 Main Street, New York, NY"
            className="pl-10 h-12 bg-white shadow-md"
          />
          <Icons.target className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        <Card className="p-4 shadow-md">
            <h3 className="font-bold text-lg mb-2 text-center">Request Emergency Assistance</h3>
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-3">
                <Textarea 
                    name="description"
                    placeholder="Describe your car problem... e.g., 'My car won't start and is making a clicking sound.'"
                    className="bg-white min-h-[80px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button type="submit" className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-base">
                    <Icons.alertCircle className="mr-2 h-5 w-5" />
                    Get Help Now
                </Button>
            </form>
            {state?.solutions && state.solutions.length > 0 && (
                 <div className="mt-4">
                    <h4 className="font-semibold mb-2">Suggested Services:</h4>
                    <div className="flex flex-wrap gap-2">
                        {state.solutions.map((solution, index) => (
                            <Link href="/services" key={index} passHref>
                                <Button variant="outline" className="bg-blue-100 border-blue-200 text-blue-800">
                                    {solution}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/services">
            <Card className="p-4 flex flex-col items-start shadow-md h-full">
              <Icons.calendar className="h-6 w-6 text-primary mb-2" />
              <p className="font-semibold">Book Service</p>
              <p className="text-xs text-muted-foreground">Schedule Now</p>
            </Card>
          </Link>
          <Link href="/history">
            <Card className="p-4 flex flex-col items-start shadow-md h-full">
              <Icons.history className="h-6 w-6 text-primary mb-2" />
              <p className="font-semibold">View History</p>
              <p className="text-xs text-muted-foreground">Past Services</p>
            </Card>
          </Link>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">Emergency Services</h3>
            <Link href="/services">
              <Button variant="link" className="text-primary">
                View All &gt;
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4 text-center">
            {emergencyServices.map((service) => (
              <Link href="/services" key={service.name}>
                <div>
                  <Card className="p-2 aspect-square flex items-center justify-center mb-1 shadow-md">
                    <Image
                      src={service.icon}
                      alt={service.name}
                      width={50}
                      height={50}
                      data-ai-hint={service.hint}
                    />
                  </Card>
                  <p className="text-sm font-semibold">{service.name}</p>
                  <p className="text-sm text-primary font-bold">
                    ${service.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">Nearby Mechanics</h3>
            <Link href="/explore">
              <Button variant="link" className="text-primary">
                Within 5km
              </Button>
            </Link>
          </div>
          <Link href="/explore">
            <Card className="p-4 shadow-md">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="https://placehold.co/100x100.png"
                    data-ai-hint="mechanic portrait"
                  />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold">Michael Chen</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>⭐ 4.9</span>
                        <span className="mx-1">·</span>
                        <span>0.8 km</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Icons.wrench className="h-4 w-4 mr-1" />
                        <span>European Cars</span>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Available
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
