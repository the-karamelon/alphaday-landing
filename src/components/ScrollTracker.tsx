"use client";

import { useEffect } from "react";

export default function ScrollTracker() {
    useEffect(() => {
        const trackedDepths = new Set<number>();

        const handleScroll = () => {
            if (typeof window === "undefined" || !window.gtag) return;

            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            [25, 50, 75, 100].forEach((depth) => {
                if (scrollPercent >= depth && !trackedDepths.has(depth)) {
                    trackedDepths.add(depth);
                    if (window.gtag) {
                        window.gtag("event", "scroll", {
                            percent_scrolled: depth,
                        });
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return null;
}
