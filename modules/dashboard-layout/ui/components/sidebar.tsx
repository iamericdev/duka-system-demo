"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BriefcaseBusinessIcon,
  HomeIcon,
  LogOutIcon,
  Package2Icon,
  ScrollTextIcon,
  SettingsIcon,
  ShoppingBasketIcon,
  ShoppingCartIcon,
  TruckIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Categories",
    href: "/categories",
    icon: Package2Icon,
  },
  {
    label: "Products",
    href: "/products",
    icon: ScrollTextIcon,
  },
  {
    label: "Sales",
    href: "/sales",
    icon: ShoppingCartIcon,
  },
  {
    label: "Restocks",
    href: "/restocks",
    icon: TruckIcon,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: UsersIcon,
  },
  {
    label: "Employees",
    href: "/employees",
    icon: BriefcaseBusinessIcon,
  },
];

const footerItems = [
  {
    label: "Profile",
    href: "/profile",
    icon: UserIcon,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
  {
    label: "Sign Out",
    href: "/sign-out",
    icon: LogOutIcon,
  },
];

export const MainSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      // dark bg-[#0a111a] text-slate-300
      className="border-none m-1.5 h-[calc(100vh-1rem)]!"
    >
      <SidebarHeader className="pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Duka System"
              size="lg"
              className="hover:bg-transparent"
            >
              <Link href="/">
                <div className="flex items-center gap-2">
                  <div className="bg-white/5 rounded p-1 flex items-center justify-center">
                    <ShoppingBasketIcon className="text-primary" />
                  </div>

                  <div className="text-xl font-bold tracking-tight text-white">
                    Duka
                    <span className="text-primary">System</span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <Separator className="bg-[#2b2e30]" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      size="default"
                    >
                      <Link href={item.href} prefetch>
                        <Icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator className="bg-[#2b2e30]" />

      {/* Footer actions */}
      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.label}
                  size="default"
                >
                  {item.label === "Sign Out" ? (
                    <button>
                      <Icon />
                      <span>{item.label}</span>
                    </button>
                  ) : (
                    <Link href={item.href} prefetch>
                      <Icon />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
