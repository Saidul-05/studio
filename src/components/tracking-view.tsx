import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EtaTracker from "./eta-tracker";
import Map from "./map";
import { Button } from "./ui/button";

type TrackingViewProps = {
  service: string;
  eta: number;
  onNewRequest: () => void;
};

export default function TrackingView({ service, eta, onNewRequest }: TrackingViewProps) {
  return (
    <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 animate-in fade-in duration-500">
      <div className="h-80 md:h-full w-full rounded-lg overflow-hidden order-1 md:order-2">
        <Map />
      </div>
      <div className="order-2 md:order-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Help is on the way!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              You've requested: <span className="font-bold text-foreground">{service}</span>.
              A service provider is en route to your location.
            </p>
            <EtaTracker initialEtaMinutes={eta} />
            <Button variant="outline" className="w-full" onClick={onNewRequest}>
              Start a New Request
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
