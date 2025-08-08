
import { ArrowLeft, Bell, Calendar, Car, ChevronDown, ChevronRight, Clock, Compass, CreditCard, DollarSign, Filter, Fuel, Headset, Heart, History, Home, LayoutDashboard, List, LogOut, MapPin, Moon, MoreHorizontal, Pencil, Search, Settings, Shield, Star, User, UserCog, Users, Wrench, X, type SVGProps } from "lucide-react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m4.93 19.07 1.41-1.41" />
      <path d="m17.66 6.34 1.41-1.41" />
    </svg>
  ),
  bell: Bell,
  home: Home,
  wrench: Wrench,
  compass: Compass,
  history: History,
  user: User,
  users: Users,
  mapPin: MapPin,
  calendar: Calendar,
  list: List,
  settings: Settings,
  pencil: Pencil,
  car: Car,
  creditCard: CreditCard,
  headset: Headset,
  heart: Heart,
  star: Star,
  moon: Moon,
  layoutDashboard: LayoutDashboard,
  dollarSign: DollarSign,
  fuel: Fuel,
  chevronRight: ChevronRight,
  logOut: LogOut,
  userCog: UserCog,
  shield: Shield,
  moreHorizontal: MoreHorizontal,
  sliders: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  filter: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  target: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <line x1="21" x2="19" y1="12" y2="12" />
      <line x1="5" x2="3" y1="12" y2="12" />
      <line x1="12" x2="12" y1="21" y2="19" />
      <line x1="12" x2="12" y1="5" y2="3" />
    </svg>
  ),
  alertCircle: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  ),
  arrowLeft: ArrowLeft,
  search: Search,
  clock: Clock,
  towTruck: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 12V8H2v4" />
      <path d="M2 12v4h12v-4" />
      <path d="m14 16 2-2 2 2" />
      <path d="M18 10V4a2 2 0 0 1 2-2h2" />
      <path d="M22 8h-4" />
      <path d="M10 16h4" />
      <circle cx="4" cy="18" r="2" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  ),
  battery: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="7" width="20" height="12" rx="2" ry="2" />
      <line x1="6" y1="13" x2="6" y2="13" />
      <line x1="10" y1="13" x2="10" y2="13" />
      <line x1="14" y1="13" x2="14" y2="13" />
      <line x1="18" y1="13" x2="18" y2="13" />
      <line x1="7" y1="7" x2="7" y2="5" />
      <line x1="17" y1="7" x2="17" y2="5" />
    </svg>
  ),
  carTire: (props: SVGProps<SVGSVGElement>) => (
     <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="22" y1="12" x2="20" y2="12" />
        <line x1="4" y1="12" x2="2" y2="12" />
        <line x1="18.36" y1="5.64" x2="16.95" y2="7.05" />
        <line x1="7.05" y1="16.95" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="18.36" x2="16.95" y2="16.95" />
        <line x1="7.05" y1="7.05" x2="5.64" y2="5.64" />
     </svg>
  ),
  info: (props: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}>
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
  bill: (props: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}>
        <path d="M16 3H8C6.34 3 5 4.34 5 6v12c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3z"/>
        <line x1="8" y1="9" x2="16" y2="9"/>
        <line x1="8" y1="13" x2="16" y2="13"/>
        <line x1="11" y1="17" x2="13" y2="17"/>
    </svg>
  ),
  shieldCheck: (props: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  close: X,
};
