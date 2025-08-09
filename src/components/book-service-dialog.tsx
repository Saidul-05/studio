
'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { Icons } from './icons';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Label } from './ui/label';

const dates = ['April 16', 'April 17', 'April 18'];
const timeSlots = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'];
const vehicles = [
  {
    name: 'Toyota Camry (2019)',
    license: 'ABC-1234',
    id: 'vehicle1',
  },
  {
    name: 'Honda Accord (2021)',
    license: 'XYZ-5678',
    id: 'vehicle2',
  },
];

type BookServiceDialogProps = {
  service: {
    name: string;
    price: number;
    icon: string;
  };
};

export function BookServiceDialog({ service }: BookServiceDialogProps) {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = React.useState(dates[0]);
  const [selectedTime, setSelectedTime] = React.useState(timeSlots[0]);

  const handleConfirmBooking = () => {
    toast({
        title: "Booking Confirmed!",
        description: `Your booking for ${service.name} on ${selectedDate} at ${selectedTime} is confirmed.`,
    })
  }

  return (
    <DialogContent className="sm:max-w-[425px] p-0">
       <DialogHeader className="p-6 pb-4 border-b">
        <div className='flex justify-between items-center'>
            <DialogTitle className="text-xl font-bold">Book Service</DialogTitle>
            <DialogClose asChild>
                <Button variant="ghost" size="icon">
                    <Icons.close className="h-6 w-6" />
                </Button>
            </DialogClose>
        </div>
      </DialogHeader>
      <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
        <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
          <Image
            src={service.icon}
            alt={service.name}
            width={48}
            height={48}
            className="rounded-lg object-contain bg-background p-2"
          />
          <div>
            <p className="font-semibold">{service.name}</p>
            <p className="text-sm text-muted-foreground">
              Starting from ${service.price}
            </p>
          </div>
        </div>

        <div className="space-y-2">
            <h3 className="font-semibold text-muted-foreground">Select Service Date</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
                {dates.map((date) => (
                    <Button
                        key={date}
                        variant={selectedDate === date ? 'default' : 'outline'}
                        onClick={() => setSelectedDate(date)}
                        className='flex-shrink-0'
                    >
                        {date}
                    </Button>
                ))}
            </div>
        </div>

         <div className="space-y-2">
            <h3 className="font-semibold text-muted-foreground">Select Time Slot</h3>
            <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                    <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        onClick={() => setSelectedTime(time)}
                        className="text-center"
                    >
                        {time}
                    </Button>
                ))}
            </div>
        </div>
        
        <div className="space-y-2">
            <h3 className="font-semibold text-muted-foreground">Service Location</h3>
            <Input defaultValue="123 Main Street, New York, NY" className='bg-secondary border-border'/>
        </div>
        
        <div className="space-y-2">
            <h3 className="font-semibold text-muted-foreground">Vehicle Details</h3>
            <RadioGroup defaultValue={vehicles[0].id} className="space-y-3">
                {vehicles.map((vehicle) => (
                    <Label
                        key={vehicle.id}
                        htmlFor={vehicle.id}
                        className="flex items-center gap-4 p-4 border rounded-lg has-[:checked]:border-primary has-[:checked]:bg-primary/10 cursor-pointer"
                    >
                        <RadioGroupItem value={vehicle.id} id={vehicle.id} />
                        <div>
                            <p className="font-medium">{vehicle.name}</p>
                            <p className="text-sm text-muted-foreground">License: {vehicle.license}</p>
                        </div>
                    </Label>
                ))}
            </RadioGroup>
        </div>

        <p className="text-xs text-muted-foreground text-center px-4">
            Service fees may vary based on vehicle condition and additional parts required.
        </p>
      </div>
      <DialogFooter className="bg-secondary p-6 flex-col gap-2">
        <DialogClose asChild>
          <Button className="w-full" onClick={handleConfirmBooking}>Confirm Booking</Button>
        </DialogClose>
        <DialogClose asChild>
            <Button variant="ghost" className="w-full">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
