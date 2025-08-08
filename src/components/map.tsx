"use client";

import { APIProvider, Map as GoogleMap, Marker } from "@vis.gl/react-google-maps";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function Map() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const position = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco

  if (!apiKey) {
    return (
      <Alert className="h-full">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Map is not configured</AlertTitle>
        <AlertDescription>
          Please provide a Google Maps API key in your environment variables to display the map.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <GoogleMap
        style={{ width: "100%", height: "100%" }}
        defaultCenter={position}
        defaultZoom={13}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId="resqnow_map"
      >
        <Marker position={position} />
      </GoogleMap>
    </APIProvider>
  );
}
