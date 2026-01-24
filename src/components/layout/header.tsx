"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MobileNav } from "./mobile-nav";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/scan": "Scan Document",
  "/reports": "Reports",
  "/settings": "Settings",
};

export function Header() {
  const pathname = usePathname();
  const currentPage = pageTitles[pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
      {/* Left side - Mobile Nav + Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <MobileNav />

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm">
          <span className="hidden text-slate-500 sm:inline">Home</span>
          <ChevronRight className="hidden h-4 w-4 text-slate-400 sm:inline" />
          <span className="font-medium text-slate-900">{currentPage}</span>
        </nav>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-slate-500" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <Separator orientation="vertical" className="hidden h-8 md:block" />

        {/* User Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-900">John Smith</p>
            <p className="text-xs text-slate-500">Property Manager</p>
          </div>
          <Avatar className="h-8 w-8 md:h-9 md:w-9">
            <AvatarImage src="" alt="User avatar" />
            <AvatarFallback className="bg-slate-200 text-slate-600">
              JS
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
