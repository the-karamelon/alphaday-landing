"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onCTAClick: () => void;
}

export default function Navbar({ onCTAClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-background/95 backdrop-blur transition-all duration-200",
        scrolled ? "shadow-sm" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-[16px] font-bold text-white">α</span>
          alphaday
        </a>
        <Button size="sm" onClick={onCTAClick} className="cursor-pointer rounded-full px-4 text-xs">
          무료 사전예약
        </Button>
      </div>
    </header>
  );
}
