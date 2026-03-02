"use client";

import { useState } from "react";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import ValuesSection from "@/components/sections/ValuesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";
import ReservationModal from "@/components/sections/ReservationModal";
import ScrollObserver from "@/components/ScrollObserver";

export default function PageClient() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="min-h-screen">
            <ScrollObserver />
            <Navbar onCTAClick={() => setModalOpen(true)} />
            <HeroSection onCTAClick={() => setModalOpen(true)} />
            <StatsSection />
            <ValuesSection />
            <HowItWorksSection />
            <CTASection onCTAClick={() => setModalOpen(true)} />
            <Footer />
            <ReservationModal open={modalOpen} onOpenChange={setModalOpen} />
        </div>
    );
}
