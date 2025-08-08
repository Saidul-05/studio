
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import withAuth from '@/components/withAuth';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

const earningsData = [
  { id: 'PAY001', date: '2025-05-05', amount: '$250.75', status: 'Paid' },
  { id: 'PAY002', date: '2025-04-28', amount: '$310.20', status: 'Paid' },
  { id: 'PAY003', date: '2025-04-21', amount: '$280.00', status: 'Paid' },
  { id: 'PAY004', date: '2025-04-14', amount: '$350.50', status: 'Paid' },
];

const chartData = [
  { month: "January", earnings: 1860 },
  { month: "February", earnings: 3050 },
  { month: "March", earnings: 2370 },
  { month: "April", earnings: 1730 },
  { month: "May", earnings: 2090 },
]

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--primary))",
  },
}


function MechanicEarningsPage() {
  return (
    <div className="space-y-6">
         <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Total Earnings</CardTitle>
                    <CardDescription>Your total earnings this month.</CardDescription>
                </div>
                <div className='text-right'>
                    <p className='text-3xl font-bold'>$2,090.00</p>
                    <p className='text-xs text-muted-foreground'>+12% from last month</p>
                </div>
            </CardHeader>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <BarChart data={chartData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="earnings" fill="var(--color-earnings)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Payout History</CardTitle>
                        <CardDescription>Review all your past payouts.</CardDescription>
                    </div>
                    <Button variant="outline">
                        <Icons.download className="mr-2" />
                        Download Statement
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Payout ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {earningsData.map((payout) => (
                    <TableRow key={payout.id}>
                        <TableCell className="font-medium">{payout.id}</TableCell>
                        <TableCell>{payout.date}</TableCell>
                        <TableCell>
                            <span className="text-green-400 bg-green-500/10 px-2 py-1 rounded-full text-xs">{payout.status}</span>
                        </TableCell>
                        <TableCell className="text-right font-bold">{payout.amount}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}

export default withAuth(MechanicEarningsPage);
