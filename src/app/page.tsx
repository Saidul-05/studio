
import HomeView from "@/components/home-view";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-2">
          <Icons.logo className="h-8 w-8" />
          <h1 className="text-xl font-bold">ResQ Auto</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Icons.bell className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="bg-white/20 hover:bg-white/30">
            Sign In
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <HomeView />
      </main>

      <footer className="sticky bottom-0 bg-white shadow-[0_-1px_10px_rgba(0,0,0,0.1)] rounded-t-2xl">
        <nav className="flex justify-around items-center p-2">
          <Link href="/" className="flex flex-col h-auto items-center text-primary">
            <Button variant="ghost" className="flex flex-col h-auto items-center text-primary">
              <Icons.home className="h-6 w-6 mb-1" />
              <span className="text-xs">Home</span>
            </Button>
          </Link>
          <Link href="/services" className="flex flex-col h-auto items-center text-muted-foreground">
            <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
              <Icons.wrench className="h-6 w-6 mb-1" />
              <span className="text-xs">Services</span>
            </Button>
          </Link>
          <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
            <Icons.compass className="h-6 w-6 mb-1" />
            <span className="text-xs">Explore</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
            <Icons.history className="h-6 w-6 mb-1" />
            <span className="text-xs">History</span>
          </Button>
           <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
            <Icons.user className="h-6 w-6 mb-1" />
            <span className="text-xs">Profile</span>
          </Button>
        </nav>
      </footer>
    </div>
  );
}
