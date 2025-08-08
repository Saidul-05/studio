
'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, Star } from 'lucide-react';

const mechanics = [
  { id: 'mech1', name: 'Michael Chen', avatar: 'https://placehold.co/100x100.png', rating: 4.9, onJob: false, totalJobs: 125, since: '2023-03-10' },
  { id: 'mech2', name: 'David Rodriguez', avatar: 'https://placehold.co/100x100.png', rating: 4.8, onJob: true, totalJobs: 98, since: '2023-04-01' },
  { id: 'mech3', name: 'Chris Lee', avatar: 'https://placehold.co/100x100.png', rating: 4.7, onJob: false, totalJobs: 150, since: '2023-05-15' },
  { id: 'mech4', name: 'Robert Chen', avatar: 'https://placehold.co/100x100.png', rating: 4.8, onJob: false, totalJobs: 82, since: '2023-05-22' },
];

export default function AdminMechanicsPage() {
  return (
     <Card>
      <CardHeader>
         <div className="flex justify-between items-center">
            <div>
                <CardTitle>Mechanics</CardTitle>
                <CardDescription>Manage all mechanics on the platform.</CardDescription>
            </div>
            <Button>Add New Mechanic</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mechanic</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Total Jobs</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Member Since</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mechanics.map((mechanic) => (
              <TableRow key={mechanic.id}>
                <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={mechanic.avatar} />
                            <AvatarFallback>{mechanic.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{mechanic.name}</span>
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        {mechanic.rating.toFixed(1)}
                    </div>
                </TableCell>
                <TableCell>{mechanic.totalJobs}</TableCell>
                <TableCell>
                  <Badge variant={mechanic.onJob ? 'destructive' : 'default'}  
                    className={mechanic.onJob ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}
                  >
                    {mechanic.onJob ? 'On Job' : 'Available'}
                  </Badge>
                </TableCell>
                <TableCell>{mechanic.since}</TableCell>
                 <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>View Job History</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
