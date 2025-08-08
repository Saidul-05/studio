import { Button } from "@/components/ui/button";

type LandingViewProps = {
  onRequestHelp: () => void;
};

export default function LandingView({ onRequestHelp }: LandingViewProps) {
  return (
    <div className="text-center animate-in fade-in duration-500">
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
        Stranded? Get Help Now.
      </h2>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
        Don't let a breakdown ruin your day. ResQNow provides fast, reliable roadside assistance at the tap of a button.
      </p>
      <Button onClick={onRequestHelp} size="lg" className="mt-8 text-lg font-bold h-14 px-10">
        Request Help
      </Button>
    </div>
  );
}
