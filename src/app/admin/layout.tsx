
'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarContent, SidebarFooter, SidebarInset } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const adminNavItems = [
    { href: "/admin", icon: <Icons.layoutDashboard />, label: "Dashboard" },
    { href: "/admin/users", icon: <Icons.users />, label: "Users" },
    { href: "/admin/services", icon: <Icons.wrench />, label: "Services" },
    { href: "/admin/bookings", icon: <Icons.calendar />, label: "Bookings" },
    { href: "/admin/mechanics", icon: <Icons.userCog />, label: "Mechanics" },
    { href: "/admin/settings", icon: <Icons.settings />, label: "Settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const pathname = usePathname();

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Icons.logo className="h-8 w-8 text-primary" />
                    <span className="text-lg font-bold">ResQ Admin</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {adminNavItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                             <Link href={item.href} passHref>
                                <SidebarMenuButton isActive={pathname === item.href}>
                                    {item.icon}
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
             <SidebarFooter>
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="admin portrait" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="text-sm font-semibold">Admin User</p>
                        <p className="text-xs text-muted-foreground">admin@resq.auto</p>
                    </div>
                     <Link href="/" passHref>
                        <Button variant="ghost" size="icon" title="Exit Admin Panel">
                           <Icons.logOut className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                 <SidebarTrigger className="md:hidden" />
                 <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                        <Icons.bell className="h-5 w-5" />
                    </Button>
                 </div>
            </header>
            <main className="p-4 sm:px-6 sm:py-0 space-y-4">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  )
}
