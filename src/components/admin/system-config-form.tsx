
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function SystemConfigForm() {
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Settings Saved",
            description: "System configuration has been successfully updated.",
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Manage core system settings and business logic.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="commissionRate">Service Commission Rate (%)</Label>
                    <Input id="commissionRate" type="number" defaultValue="15" placeholder="e.g., 15" />
                    <p className="text-xs text-muted-foreground">The percentage the platform takes from each completed service.</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="serviceZone">Service Operational Zone</Label>
                    <Select defaultValue="urban">
                        <SelectTrigger id="serviceZone">
                            <SelectValue placeholder="Select a zone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="urban">Urban</SelectItem>
                            <SelectItem value="suburban">Suburban</SelectItem>
                            <SelectItem value="rural">Rural</SelectItem>
                            <SelectItem value="all">All Zones</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Define the primary operational area to optimize mechanic dispatching.</p>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="peakHoursMultiplier">Peak Hours Pricing Multiplier</Label>
                    <Input id="peakHoursMultiplier" type="number" defaultValue="1.25" placeholder="e.g., 1.5" />
                    <p className="text-xs text-muted-foreground">Multiplier for service prices during peak hours (e.g., 5 PM - 9 PM).</p>
                </div>

                <Button onClick={handleSave}>Save System Configuration</Button>
            </CardContent>
        </Card>
    )
}
