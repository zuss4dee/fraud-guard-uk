"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm">
        <span className="text-slate-500">Home</span>
        <ChevronRight className="h-4 w-4 text-slate-400" />
        <span className="font-medium text-slate-900">{currentPage}</span>
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-slate-500" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <Separator orientation="vertical" className="h-8" />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">John Smith</p>
            <p className="text-xs text-slate-500">Property Manager</p>
          </div>
          <Avatar className="h-9 w-9">
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
