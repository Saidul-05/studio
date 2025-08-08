"use client";

import { useState } from "react";
import LandingView from "@/components/landing-view";
import RequestForm from "@/components/request-form";
import TrackingView from "@/components/tracking-view";
import { Icons } from "@/components/icons";

type FlowState = "idle" | "requesting" | "tracking";

export default function Home() {
  const [flowState, setFlowState] = useState<FlowState>("idle");
  const [requestDetails, setRequestDetails] = useState({
    service: "",
    eta: 0,
  });

  const handleRequestHelp = () => {
    setFlowState("requesting");
  };

  const handleRequestComplete = (service: string, eta: number) => {
    setRequestDetails({ service, eta });
    setFlowState("tracking");
  };

  const handleBackToHome = () => {
    setFlowState("idle");
  };

  const renderContent = () => {
    switch (flowState) {
      case "requesting":
        return <RequestForm onComplete={handleRequestComplete} onBack={handleBackToHome} />;
      case "tracking":
        return (
          <TrackingView
            service={requestDetails.service}
            eta={requestDetails.eta}
            onNewRequest={handleBackToHome}
          />
        );
      case "idle":
      default:
        return <LandingView onRequestHelp={handleRequestHelp} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 flex items-center justify-between border-b border-border/20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleBackToHome}>
          <Icons.logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">ResQNow</h1>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm">
        © {new Date().getFullYear()} ResQNow. All rights reserved.
      </footer>
    </div>
  );
}
