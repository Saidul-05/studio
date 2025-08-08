"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

type EtaTrackerProps = {
  initialEtaMinutes: number;
};

export default function EtaTracker({ initialEtaMinutes }: EtaTrackerProps) {
  const [eta, setEta] = useState(initialEtaMinutes);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setEta(initialEtaMinutes);
    setProgress(0);
    const totalSeconds = initialEtaMinutes * 60;

    const timer = setInterval(() => {
      setEta((prevEta) => {
        if (prevEta <= 1) {
          clearInterval(timer);
          setProgress(100);
          return 0;
        }
        const newEta = prevEta - 1;
        const elapsedSeconds = totalSeconds - newEta * 60;
        setProgress((elapsedSeconds / totalSeconds) * 100);
        return newEta;
      });
    }, 60 * 1000); // Update every minute

    // Initial progress setup
    const elapsedSecondsFirst = totalSeconds - initialEtaMinutes * 60;
    setProgress((elapsedSecondsFirst / totalSeconds) * 100);


    return () => clearInterval(timer);
  }, [initialEtaMinutes]);

  const arrivalMessage = eta > 0 
    ? `~${Math.round(eta)} minutes` 
    : "Arriving now";

  return (
    <div className="space-y-4">
      <div>
        <p className="text-muted-foreground text-sm">Estimated Arrival</p>
        <p className="text-4xl font-bold text-primary">{arrivalMessage}</p>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
