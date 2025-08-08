
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { useActionState, useEffect, useRef, useState } from 'react';
import { getSuggestions } from '@/lib/actions';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const emergencyServices = [
  { name: 'Towing Service', price: 75, icon: '/tow-truck.png', hint: 'tow truck' },
  { name: 'Battery Jump', price: 45, icon: '/battery.png', hint: 'car battery' },
  { name: 'Tire Change', price: 55, icon: '/tire.png', hint: 'tire change' },
  { name: 'Fuel Delivery', price: 65, icon: '/fuel.png', hint: 'gas can' },
];

export function HomeView() {
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(getSuggestions, { solutions: [] });
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
    const formData = new FormData(e.currentTarget);
    
    // Check which button was clicked
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

    if (submitter && submitter.name === 'confirm-emergency') {
        router.push('/confirm-emergency');
    } else {
        if (description.length < 10) {
            toast({
                title: 'Error',
                description: 'Please provide a more detailed description.',
                variant: 'destructive',
            });
            return;
        }
        formAction(formData);
    }
  }

  const hasSuggestions = state.solutions && state.solutions.length > 0;

  return (
    <div className="bg-background">
      <div className="relative h-64">
        <Image
          src="https://placehold.co/600x400.png"
          alt="Car repair shop"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          data-ai-hint="car service"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white space-y-2">
          <h2 className="text-3xl font-bold">24/7 Auto Assistance</h2>
          <p className="text-sm">Professional help whenever you need it</p>
        </div>
      </div>

      <div className="p-4 space-y-6 bg-background -mt-8 rounded-t-2xl relative">
        <div className="relative">
          <Icons.mapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="123 Main Street, New York, NY"
            className="pl-10 h-12 bg-card shadow-md"
          />
          <Icons.target className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        <Card className="p-4 shadow-md bg-card">
            <h3 className="font-bold text-lg mb-2 text-center">Request Emergency Assistance</h3>
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-3">
                <Textarea 
                    name="description"
                    placeholder="Describe your car problem... e.g., 'My car won't start and is making a clicking sound.'"
                    className="bg-background min-h-[80px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {hasSuggestions ? (
                     <Button type="submit" name="confirm-emergency" className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-bold text-base">
                        <Icons.alertCircle className="mr-2 h-5 w-5" />
                        Confirm Emergency
                    </Button>
                ) : (
                    <Button type="submit" name="get-suggestions" className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-bold text-base" disabled={isPending}>
                        <Icons.alertCircle className="mr-2 h-5 w-5" />
                        {isPending ? 'Analyzing...' : 'Get Help Now'}
                    </Button>
                )}
            </form>
            {hasSuggestions && (
                 <div className="mt-4">
                    <h4 className="font-semibold mb-2">Suggested Services:</h4>
                    <div className="flex flex-wrap gap-2">
                        {state.solutions.map((solution, index) => (
                            <Link href="/services" key={index} passHref>
                                <Button variant="outline" className="bg-primary/20 border-primary text-foreground">
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
            <Card className="p-4 flex flex-col items-start shadow-md h-full bg-card">
              <Icons.calendar className="h-6 w-6 text-accent mb-2" />
              <p className="font-semibold">Book Service</p>
              <p className="text-xs text-muted-foreground">Schedule Now</p>
            </Card>
          </Link>
          <Link href="/history">
            <Card className="p-4 flex flex-col items-start shadow-md h-full bg-card">
              <Icons.history className="h-6 w-6 text-accent mb-2" />
              <p className="font-semibold">View History</p>
              <p className="text-xs text-muted-foreground">Past Services</p>
            </Card>
          </Link>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">Emergency Services</h3>
            <Link href="/services">
              <Button variant="link" className="text-accent">
                View All &gt;
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4 text-center">
            {emergencyServices.map((service) => (
              <Link href="/services" key={service.name}>
                <div className="flex flex-col items-center">
                  <Card className="p-2 aspect-square flex items-center justify-center mb-1 shadow-md w-full bg-card">
                    <Image
                      src={service.icon}
                      alt={service.name}
                      width={50}
                      height={50}
                      data-ai-hint={service.hint}
                    />
                  </Card>
                  <p className="text-xs font-semibold mt-1">{service.name}</p>
                  <p className="text-xs text-accent font-bold">
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
              <Button variant="link" className="text-accent">
                Within 5km
              </Button>
            </Link>
          </div>
          <Link href="/explore">
            <Card className="p-4 shadow-md bg-card">
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
                    <Badge className="bg-green-500/20 text-green-300">
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
