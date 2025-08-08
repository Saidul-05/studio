
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Icons } from '@/components/icons';

export default function AdminSettingsPage() {
    const { toast } = useToast();

    const handleSave = (section: string) => {
        toast({
            title: "Settings Saved",
            description: `${section} settings have been successfully updated.`,
        });
    }

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage admin panel and platform settings.</CardDescription>
            </CardHeader>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="appName">Application Name</Label>
                    <Input id="appName" defaultValue="ResQ Auto" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Contact Email</Label>
                    <Input id="adminEmail" type="email" defaultValue="admin@resq.auto" />
                </div>
                 <Button onClick={() => handleSave('General')}>Save Changes</Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                 <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className='space-y-0.5'>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive email notifications for new bookings and system alerts.</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className='space-y-0.5'>
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get push notifications on your registered devices.</p>
                    </div>
                    <Switch />
                </div>
                 <Button onClick={() => handleSave('Notification')}>Save Changes</Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>API Keys</CardTitle>
                 <CardDescription>Manage API keys for third-party integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="googleMapsKey">Google Maps API Key</Label>
                    <div className="flex items-center gap-2">
                        <Input id="googleMapsKey" type="password" defaultValue="......." />
                        <Button variant="outline">Reveal</Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stripeKey">Stripe API Key</Label>
                     <div className="flex items-center gap-2">
                        <Input id="stripeKey" type="password" defaultValue="......." />
                         <Button variant="outline">Reveal</Button>
                    </div>
                </div>
                <Button onClick={() => handleSave('API Keys')}>Save Changes</Button>
            </CardContent>
        </Card>

         <Card className="border-red-500/50">
            <CardHeader>
                <CardTitle className='text-red-600'>Danger Zone</CardTitle>
                 <CardDescription>These actions are irreversible. Please proceed with caution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center justify-between rounded-lg border border-red-500/50 p-3">
                    <div>
                        <Label className="font-bold">Shutdown Platform</Label>
                        <p className="text-sm text-muted-foreground">Temporarily disable all user-facing services.</p>
                    </div>
                    <Button variant="destructive">Shutdown</Button>
                </div>
            </CardContent>
        </Card>

    </div>
  );
}
