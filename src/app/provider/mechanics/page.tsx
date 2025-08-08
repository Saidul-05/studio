
'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star } from 'lucide-react';
import withAuth from '@/components/withAuth';

const mechanics = [
  { id: 'mech1', name: 'Michael Chen', avatar: 'https://placehold.co/100x100.png', rating: 4.9, onJob: false, totalJobs: 125, since: '2023-03-10' },
  { id: 'mech2', name: 'David Rodriguez', avatar: 'https://placehold.co/100x100.png', rating: 4.8, onJob: true, totalJobs: 98, since: '2023-04-01' },
  { id: 'mech3', name: 'Chris Lee', avatar: 'https://placehold.co/100x100.png', rating: 4.7, onJob: false, totalJobs: 150, since: '2023-05-15' },
];

function ProviderMechanicsPage() {
  return (
     <Card>
      <CardHeader>
         <div className="flex justify-between items-center">
            <div>
                <CardTitle>Your Mechanics</CardTitle>
                <CardDescription>Manage your team of mechanics.</CardDescription>
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
                    className={mechanic.onJob ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}
                  >
                    {mechanic.onJob ? 'On Job' : 'Available'}
                  </Badge>
                </TableCell>
                <TableCell>{mechanic.since}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default withAuth(ProviderMechanicsPage);
