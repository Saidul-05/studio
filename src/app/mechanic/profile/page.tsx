
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import withAuth from '@/components/withAuth';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';


const services = ['Towing', 'Battery Jumpstart', 'Tire Change', 'Fuel Delivery', 'Engine Diagnostics', 'Brake Repair'];

function MechanicProfilePage() {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Manage your public profile and settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="mechanic portrait" />
                        <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                    <div className='space-y-1'>
                        <Button>Change Photo</Button>
                        <p className='text-xs text-muted-foreground'>JPG, GIF or PNG. 1MB max.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Mechanic User" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue="mechanic@resq.auto" disabled />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+1 234 567 8900" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="location">Service Area</Label>
                        <Input id="location" defaultValue="New York, NY" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bio">Your Bio</Label>
                    <Textarea id="bio" defaultValue="Experienced mechanic with over 10 years of experience in all types of vehicle repairs. Certified in European car models." />
                </div>
                
                 <div className="space-y-2">
                    <Label>Services Offered</Label>
                    <div className='flex flex-wrap gap-2'>
                        {services.map(service => (
                            <Badge key={service} variant="secondary">{service}</Badge>
                        ))}
                    </div>
                </div>


                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label>Availability Status</Label>
                        <p className="text-sm text-muted-foreground">Set your status to available to receive new job requests.</p>
                    </div>
                    <Switch defaultChecked />
                </div>

                 <Button>Update Profile</Button>
            </CardContent>
        </Card>
    </div>
  );
}

export default withAuth(MechanicProfilePage);
