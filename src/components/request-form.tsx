"use client";

import { useState, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { getSuggestions } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BatteryCharging, Fuel, KeyRound, Loader2, Truck, Wrench } from "lucide-react";
import Map from "./map";

type RequestFormProps = {
  onComplete: (service: string, eta: number) => void;
  onBack: () => void;
};

const services = [
  { name: "Towing", icon: Truck },
  { name: "Flat Tire", icon: Wrench },
  { name: "Battery Jump", icon: BatteryCharging },
  { name: "Fuel Delivery", icon: Fuel },
  { name: "Lockout", icon: KeyRound },
  { name: "Other", icon: Loader2 },
];

const initialState = {
  solutions: [],
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="animate-spin" /> : "Get Suggestions"}
    </Button>
  );
}

export default function RequestForm({ onComplete, onBack }: RequestFormProps) {
  const [step, setStep] = useState<"service_selection" | "confirmation">("service_selection");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formState, formAction] = useFormState(getSuggestions, initialState);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
    setStep("confirmation");
  };

  const handleConfirm = () => {
    if (!selectedService) return;
    setIsConfirming(true);
    // Simulate API call to dispatch service
    setTimeout(() => {
      const eta = Math.floor(Math.random() * 25) + 10; // Random ETA between 10-35 mins
      onComplete(selectedService, eta);
    }, 1500);
  };

  if (step === "confirmation" && selectedService) {
    return (
      <div className="w-full max-w-4xl animate-in fade-in duration-500">
        <Button variant="ghost" onClick={() => setStep('service_selection')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Confirm Your Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-64 md:h-80 w-full rounded-lg overflow-hidden">
                <Map />
            </div>
            <Alert>
              <AlertTitle className="font-bold">Service Requested: {selectedService}</AlertTitle>
              <AlertDescription>
                A service provider will be dispatched to your location. Please ensure you are in a safe place.
              </AlertDescription>
            </Alert>
            <Button onClick={handleConfirm} size="lg" className="w-full text-lg font-bold h-14" disabled={isConfirming}>
              {isConfirming ? <Loader2 className="animate-spin" /> : "Confirm & Request Service"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl animate-in fade-in duration-500">
      <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>What do you need help with?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={formAction} className="space-y-4">
            <Textarea
              name="description"
              placeholder="e.g., 'My car won't start, and I hear a clicking sound when I turn the key.'"
              rows={4}
            />
            <SubmitButton />
            {formState?.error && <p className="text-sm text-destructive">{formState.error}</p>}
          </form>

          {formState.solutions && formState.solutions.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground">Suggested Solutions:</h3>
              <div className="flex flex-wrap gap-2">
                {formState.solutions.map((solution) => (
                  <Badge
                    key={solution}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary/20"
                    onClick={() => handleServiceSelect(solution)}
                  >
                    {solution}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service) => (
              <Card
                key={service.name}
                className="flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-card/80 hover:border-primary transition-colors"
                onClick={() => handleServiceSelect(service.name)}
              >
                <service.icon className="h-10 w-10 text-primary mb-2" />
                <span className="font-semibold">{service.name}</span>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
