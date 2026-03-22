"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BellIcon,
  LogOutIcon,
  MessageSquareIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

export const MainNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border/50">
      <div className="flex h-16 items-center px-4 gap-4">
        <SidebarTrigger className="text-muted-foreground hover:bg-muted shrink-0" />

        {/* Search Bar */}
        <div className="flex-1 flex items-center">
          <div className="flex-1 max-w-xl relative hidden md:block ml-4">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-slate-50/50 border-slate-200 h-10 w-full rounded-md focus-visible:ring-1 focus-visible:ring-slate-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-500 rounded-full hover:bg-slate-100"
          >
            <MessageSquareIcon className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-500 rounded-full hover:bg-slate-100 relative"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full transition-colors ml-2 outline-none">
                <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-slate-300">
                  <UserIcon className="h-5 w-5 text-slate-500" />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <div className="p-2 border-b mb-1">
                <p className="font-medium text-sm">James</p>
                <p className="text-xs text-muted-foreground truncate">
                  james@dukademo.com
                </p>
              </div>
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 cursor-pointer"
                  prefetch
                >
                  <UserIcon className="size-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 cursor-pointer"
                  prefetch
                >
                  <SettingsIcon className="size-4" />
                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer">
                <LogOutIcon className="size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export const NavbarSkeleton = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border/50">
      <div className="flex h-16 items-center px-4 gap-4">
        <Skeleton className="h-8 w-8 rounded-md lg:hidden" />

        <div className="flex-1 max-w-xl hidden md:block ml-4">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="flex-1 md:hidden" />

        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full ml-2" />
        </div>
      </div>
    </header>
  );
};
