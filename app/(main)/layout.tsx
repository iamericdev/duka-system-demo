import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  MainNavbar,
  NavbarSkeleton,
} from "@/modules/dashboard-layout/ui/components/navbar";
import { MainSidebar } from "@/modules/dashboard-layout/ui/components/sidebar";
import { Suspense } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-1.5 h-screen overflow-hidden bg-white">
      <SidebarProvider className="rounded-xl bg-white h-[calc(100vh-1rem)]!">
        <MainSidebar />
        <SidebarInset className="overflow-hidden h-[calc(100vh-1rem)] rounded-r-2xl shadow-lg border">
          {/* Top navigation bar */}
          <Suspense fallback={<NavbarSkeleton />}>
            <MainNavbar />
          </Suspense>
          {/* Page content */}
          <main className="flex flex-col flex-1 overflow-y-auto min-h-0">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
