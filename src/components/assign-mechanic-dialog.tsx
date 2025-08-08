
'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Icons } from './icons';
import React from 'react';

type Mechanic = {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    onJob: boolean;
};

type AssignMechanicDialogProps = {
  request: {
    id: string;
    service: string;
  };
  mechanics: Mechanic[];
  onAssign: (requestId: string, mechanic: Mechanic) => void;
};

export function AssignMechanicDialog({ request, mechanics, onAssign }: AssignMechanicDialogProps) {
  const [selectedMechanicId, setSelectedMechanicId] = React.useState<string | null>(null);

  const handleAssign = () => {
    const selectedMechanic = mechanics.find(m => m.id === selectedMechanicId);
    if (selectedMechanic && request) {
      onAssign(request.id, selectedMechanic);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px] p-0">
       <DialogHeader className="p-6 pb-4">
        <div className='flex justify-between items-center'>
            <DialogTitle className="text-xl font-bold">Assign Mechanic</DialogTitle>
            <DialogClose asChild>
                <Button variant="ghost" size="icon">
                    <Icons.close className="h-6 w-6" />
                </Button>
            </DialogClose>
        </div>
        <p className='text-sm text-muted-foreground'>Assign a mechanic for the service request: <strong>{request.service}</strong></p>
      </DialogHeader>
      <div className="px-6 space-y-4 max-h-[60vh] overflow-y-auto">
        <h3 className="font-semibold">Available Mechanics</h3>
        <RadioGroup value={selectedMechanicId || ''} onValueChange={setSelectedMechanicId} className="space-y-3">
            {mechanics.map((mechanic) => (
                <Label
                    key={mechanic.id}
                    htmlFor={mechanic.id}
                    className={`flex items-center gap-4 p-4 border rounded-lg has-[:checked]:border-primary has-[:checked]:bg-primary/5 cursor-pointer
                    ${mechanic.onJob ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                >
                    <RadioGroupItem value={mechanic.id} id={mechanic.id} disabled={mechanic.onJob}/>
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={mechanic.avatar} />
                        <AvatarFallback>{mechanic.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <p className="font-medium">{mechanic.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                           <Icons.star className="h-4 w-4 text-yellow-500 mr-1" /> {mechanic.rating}
                        </div>
                    </div>
                     <Badge variant={mechanic.onJob ? 'destructive' : 'default'}
                      className={
                        mechanic.onJob ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }
                     >
                        {mechanic.onJob ? 'On Job' : 'Available'}
                     </Badge>
                </Label>
            ))}
        </RadioGroup>
      </div>
      <DialogFooter className="bg-gray-50 p-6 flex-col gap-2">
        <DialogClose asChild>
          <Button className="w-full" onClick={handleAssign} disabled={!selectedMechanicId}>Confirm Assignment</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
