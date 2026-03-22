import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NextTopLoader from "nextjs-toploader";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader
        color="#fcc800"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px rgb(46, 144, 250),0 0 5px rgb(46, 144, 250)"
      />

      <TooltipProvider>
        {children}
        <Toaster />
      </TooltipProvider>
    </>
  );
};
