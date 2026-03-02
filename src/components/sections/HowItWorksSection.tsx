"use client";

import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";

/* ── 타입 정의 ── */
type TypingVisual = { kind: "typing"; lines: string[] };
type ConversionVisual = { kind: "conversion"; conversion: string; sub: string; visitors: number; clicks: number };
type MapVisual = { kind: "map"; pins: { top: string; left: string; delay: number }[] };
type BarsVisual = { kind: "bars"; bars: { label: string; pct: number }[] };
type StepVisual = TypingVisual | ConversionVisual | MapVisual | BarsVisual;

/* ── Step 01 : 타이핑 애니메이션 비주얼 ── */
function TypingCard({ lines }: { lines: string[] }) {
    const [shown, setShown] = useState<number[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || started.current) return;
                started.current = true;
                lines.forEach((_, i) => {
                    setTimeout(() => setShown((prev) => [...prev, i]), 500 + i * 750);
                });
            },
            { threshold: 0.4 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [lines]);

    return (
        <div ref={ref} className="rounded-xl border bg-muted/30 p-5">
            <p className="mb-4 font-mono text-xs text-muted-foreground"># AI 기획서 자동 생성 중...</p>
            <div className="flex flex-col gap-2">
                {lines.map((line, i) => {
                    const colonIdx = line.indexOf(":");
                    const label = colonIdx !== -1 ? line.slice(0, colonIdx).trim() : line;
                    const value = colonIdx !== -1 ? line.slice(colonIdx + 1).trim() : "";
                    const isVisible = shown.includes(i);
                    return (
                        <div
                            key={i}
                            className="flex items-center justify-between rounded-lg border bg-background px-3 py-2.5"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(8px)",
                                transition: "opacity 0.45s ease, transform 0.45s ease",
                            }}
                        >
                            <span className="font-mono text-sm text-muted-foreground">{label}</span>
                            <span className="text-sm font-medium">{value}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ── Step 04 : 바 차트 비주얼 ── */
function BarsCard({ bars }: { bars: { label: string; pct: number }[] }) {
    const [shown, setShown] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || started.current) return;
                started.current = true;
                setTimeout(() => setShown(true), 150);
            },
            { threshold: 0.4 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} className="rounded-xl border bg-muted/30 p-5">
            <p className="mb-4 font-mono text-xs text-muted-foreground"># 오프라인 O2O 행동 퍼널 데이터</p>
            <div className="flex h-40 items-end justify-center gap-4">
                {bars.map((b, i) => (
                    <div key={b.label} className="flex w-10 flex-col items-center gap-1.5">
                        <span
                            className="text-xs font-semibold text-primary"
                            style={{
                                opacity: shown ? 1 : 0,
                                transition: `opacity 0.3s ease ${i * 120 + 300}ms`,
                            }}
                        >
                            {b.pct}%
                        </span>
                        <div className="flex w-full items-end rounded-sm bg-muted" style={{ height: "120px" }}>
                            <div
                                className="w-full rounded-sm bg-primary/80"
                                style={{
                                    height: shown ? `${b.pct}%` : "0%",
                                    transition: `height 0.6s cubic-bezier(0.34,1.1,0.64,1) ${i * 120}ms`,
                                }}
                            />
                        </div>
                        <span className="text-xs text-muted-foreground">{b.label}</span>
                    </div>
                ))}
            </div>
            <p
                className="mt-4 text-xs leading-relaxed text-muted-foreground"
                style={{
                    opacity: shown ? 1 : 0,
                    transition: "opacity 0.4s ease 800ms",
                }}
            >
                오프라인 전환율(<span className="font-semibold text-foreground">28%</span>)은 온라인(3%) 대비
                압도적으로 높습니다. 만져볼 수 있는 시제품의 힘을 증명하세요.
            </p>
        </div>
    );
}

/* ── Step 03 : 맵 핀 솟아나는 비주얼 ── */

function MapCard({
    pins,
}: {
    pins: { top: string; left: string; delay: number }[];
}) {
    const [shown, setShown] = useState<number[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || started.current) return;
                started.current = true;
                pins.forEach((pin, i) => {
                    setTimeout(() => setShown((prev) => [...prev, i]), pin.delay);
                });
            },
            { threshold: 0.4 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [pins]);

    return (
        <div ref={ref} className="rounded-xl border bg-muted/30 p-5">
            <p className="mb-4 font-mono text-xs text-muted-foreground"># 전국 메이커스페이스 네트워크</p>
            {/* 지도 컨테이너 */}
            <div className="relative mx-auto" style={{ width: "160px", height: "191px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/korea-map.svg"
                    alt="대한민국 지도"
                    className="absolute inset-0 w-full h-full object-contain opacity-20"
                    draggable={false}
                />
                {/* 핀 */}
                {pins.map((pin, i) => {
                    const isVisible = shown.includes(i);
                    return (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                top: pin.top,
                                left: pin.left,
                                transform: isVisible
                                    ? "translate(-50%, -50%) scale(1)"
                                    : "translate(-50%, -50%) scale(0)",
                                opacity: isVisible ? 1 : 0,
                                transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                                transformOrigin: "center",
                            }}
                        >
                            <div className="h-2 w-2 rounded-full bg-primary shadow-sm" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ── STEP 데이터 ── */
const STEPS: { num: string; title: string; desc: string; visual: StepVisual }[] = [
    {
        num: "01",
        title: "모호한 아이디어를 팔리는 기획으로",
        desc: '"이거 진짜 될까?" 밤새 끙끙 앓지 마세요. 알파데이 AI 파트너가 타겟 고객 설정부터 핵심 가설까지, 단 몇 초 만에 완벽한 기획서로 곁에서 정리해 드립니다.',
        visual: {
            kind: "typing",
            lines: [
                "타겟 고객: 25-35세 직장인 N잡러 ✅",
                "핵심 가설: 도출 완료 ✅",
                "경쟁 분석: 레드오션 회피 루트 발견 ✅",
            ],
        },
    },
    {
        num: "02",
        title: "아직 제품이 없어도 파는 마법 (온라인 가검증)",
        desc: "진짜 제품이 없어서 못 판다고요? AI가 만들어낸 감각적인 가상 제품 컷으로 먼저 랜딩페이지를 오픈해 보세요. 소셜 미디어에 띄워 '진짜 돈을 낼 고객'이 존재하는지 5분 만에 테스트합니다.",
        visual: { kind: "conversion", conversion: "4.8%", sub: "수요 검증 기준선(2.0%) 통과", visitors: 1500, clicks: 72 },
    },
    {
        num: "03",
        title: "머릿속 상상을 손에 잡히는 현실로",
        desc: "지방에 계시거나, 초기 제작비가 부담되어 하드웨어 창업을 포기하려 하셨나요? 알파데이의 전국 메이커스페이스 동료들이 3D 프린팅부터 전문가 멘토링까지 당신의 곁에서 도와드립니다.",
        visual: {
            kind: "map",
            pins: [
                { top: "39.7%", left: "46.5%", delay: 0 },
                { top: "19.6%", left: "42.6%", delay: 30 },
                { top: "59.4%", left: "59.0%", delay: 60 },
                { top: "21.5%", left: "43.0%", delay: 90 },
                { top: "60.8%", left: "41.7%", delay: 120 },
                { top: "60.9%", left: "41.9%", delay: 150 },
                { top: "48.8%", left: "58.1%", delay: 180 },
                { top: "40.2%", left: "46.9%", delay: 210 },
                { top: "60.6%", left: "62.6%", delay: 240 },
                { top: "60.2%", left: "62.4%", delay: 270 },
                { top: "37.8%", left: "46.0%", delay: 300 },
                { top: "21.4%", left: "40.4%", delay: 330 },
                { top: "49.0%", left: "44.6%", delay: 360 },
                { top: "59.8%", left: "58.8%", delay: 390 },
                { top: "32.2%", left: "44.7%", delay: 420 },
                { top: "32.1%", left: "43.4%", delay: 450 },
                { top: "39.7%", left: "46.8%", delay: 480 },
                { top: "22.4%", left: "44.3%", delay: 510 },
                { top: "48.3%", left: "58.2%", delay: 540 },
                { top: "48.3%", left: "58.2%", delay: 570 },
                { top: "48.4%", left: "58.0%", delay: 600 },
                { top: "40.1%", left: "46.5%", delay: 630 },
                { top: "62.5%", left: "62.1%", delay: 660 },
                { top: "21.5%", left: "42.2%", delay: 690 },
                { top: "19.1%", left: "43.0%", delay: 720 },
                { top: "32.5%", left: "44.6%", delay: 750 },
                { top: "54.4%", left: "65.0%", delay: 780 },
                { top: "23.8%", left: "41.5%", delay: 810 },
                { top: "19.8%", left: "43.7%", delay: 840 },
                { top: "21.4%", left: "42.8%", delay: 870 },
                { top: "45.6%", left: "65.2%", delay: 900 },
                { top: "48.5%", left: "58.2%", delay: 930 },
                { top: "21.1%", left: "40.6%", delay: 960 },
                { top: "60.6%", left: "62.4%", delay: 990 },
                { top: "22.4%", left: "44.2%", delay: 1020 },
                { top: "23.8%", left: "41.8%", delay: 1050 },
                { top: "22.3%", left: "40.0%", delay: 1080 },
                { top: "24.9%", left: "44.9%", delay: 1110 },
                { top: "35.0%", left: "47.8%", delay: 1140 },
                { top: "32.6%", left: "43.3%", delay: 1170 },
                { top: "49.3%", left: "44.5%", delay: 1200 },
                { top: "49.3%", left: "44.8%", delay: 1230 },
                { top: "60.8%", left: "41.8%", delay: 1260 },
                { top: "53.9%", left: "64.8%", delay: 1290 },
                { top: "60.7%", left: "62.4%", delay: 1320 },
                { top: "25.2%", left: "45.0%", delay: 1350 },
                { top: "19.3%", left: "41.7%", delay: 1380 },
                { top: "61.0%", left: "41.8%", delay: 1410 },
                { top: "19.5%", left: "44.0%", delay: 1440 },
                { top: "60.1%", left: "62.7%", delay: 1470 },
                { top: "67.0%", left: "37.7%", delay: 1500 },
                { top: "19.0%", left: "42.7%", delay: 1530 },
                { top: "64.0%", left: "47.9%", delay: 1560 },
                { top: "48.2%", left: "44.7%", delay: 1590 },
                { top: "16.5%", left: "43.9%", delay: 1620 },
                { top: "24.3%", left: "43.4%", delay: 1650 },
                { top: "20.7%", left: "43.6%", delay: 1680 },
                { top: "20.0%", left: "44.4%", delay: 1710 },
                { top: "32.6%", left: "44.7%", delay: 1740 },
                { top: "61.0%", left: "41.2%", delay: 1770 },
                { top: "58.0%", left: "53.3%", delay: 1800 },
                { top: "56.2%", left: "51.4%", delay: 1830 },
                { top: "14.5%", left: "50.1%", delay: 1860 },
                { top: "21.7%", left: "63.6%", delay: 1890 },
                { top: "23.0%", left: "52.0%", delay: 1920 },
                { top: "22.5%", left: "44.1%", delay: 1950 },
                { top: "28.7%", left: "51.5%", delay: 1980 },
                { top: "27.1%", left: "54.3%", delay: 2010 },
                { top: "35.6%", left: "47.9%", delay: 2040 },
                { top: "39.7%", left: "46.6%", delay: 2070 },
                { top: "25.7%", left: "44.0%", delay: 2100 },
                { top: "32.6%", left: "44.8%", delay: 2130 },
                { top: "38.1%", left: "45.8%", delay: 2160 },
                { top: "60.7%", left: "41.9%", delay: 2190 },
                { top: "60.9%", left: "41.8%", delay: 2220 },
                { top: "60.1%", left: "62.7%", delay: 2250 },
                { top: "60.4%", left: "62.6%", delay: 2280 },
                { top: "60.7%", left: "62.5%", delay: 2310 },
                { top: "21.4%", left: "40.5%", delay: 2340 },
                { top: "49.5%", left: "44.5%", delay: 2370 },
                { top: "32.7%", left: "44.7%", delay: 2400 },
                { top: "22.7%", left: "40.2%", delay: 2430 },
                { top: "28.0%", left: "49.9%", delay: 2460 },
                { top: "60.6%", left: "42.5%", delay: 2490 },
                { top: "33.1%", left: "42.5%", delay: 2520 },
                { top: "13.7%", left: "50.1%", delay: 2550 },
                { top: "48.5%", left: "58.3%", delay: 2580 },
                { top: "66.5%", left: "37.5%", delay: 2610 },
                { top: "89.5%", left: "38.8%", delay: 2640 },
                { top: "35.3%", left: "47.8%", delay: 2670 },
                { top: "60.6%", left: "41.9%", delay: 2700 },
                { top: "25.6%", left: "56.7%", delay: 2730 },
                { top: "22.4%", left: "44.2%", delay: 2760 },
                { top: "18.7%", left: "43.1%", delay: 2790 },
                { top: "59.7%", left: "62.7%", delay: 2820 },
                { top: "60.5%", left: "62.5%", delay: 2850 },
                { top: "20.9%", left: "43.9%", delay: 2880 },
                { top: "20.8%", left: "43.9%", delay: 2910 },
                { top: "20.7%", left: "43.6%", delay: 2940 },
                { top: "49.0%", left: "44.7%", delay: 2970 },
                { top: "49.0%", left: "44.8%", delay: 3000 },
                { top: "19.2%", left: "42.6%", delay: 3030 },
                { top: "24.4%", left: "43.5%", delay: 3060 },
                { top: "21.3%", left: "42.6%", delay: 3090 },
                { top: "59.6%", left: "62.9%", delay: 3120 },
                { top: "48.7%", left: "58.3%", delay: 3150 },
                { top: "19.2%", left: "43.0%", delay: 3180 },
                { top: "39.6%", left: "46.9%", delay: 3210 },
                { top: "48.5%", left: "58.3%", delay: 3240 },
                { top: "61.0%", left: "41.8%", delay: 3270 },
                { top: "60.4%", left: "41.9%", delay: 3300 },
                { top: "48.2%", left: "58.4%", delay: 3330 },
                { top: "22.6%", left: "44.3%", delay: 3360 },
                { top: "22.3%", left: "44.4%", delay: 3390 },
                { top: "22.6%", left: "44.4%", delay: 3420 },
                { top: "49.6%", left: "44.5%", delay: 3450 },
                { top: "24.9%", left: "45.0%", delay: 3480 },
                { top: "35.4%", left: "47.7%", delay: 3510 },
                { top: "49.1%", left: "44.5%", delay: 3540 },
                { top: "40.2%", left: "46.9%", delay: 3570 },
                { top: "48.6%", left: "58.2%", delay: 3600 },
                { top: "60.7%", left: "42.0%", delay: 3630 },
                { top: "40.0%", left: "46.7%", delay: 3660 },
                { top: "39.9%", left: "46.6%", delay: 3690 },
                { top: "48.4%", left: "58.1%", delay: 3720 },
                { top: "21.3%", left: "42.9%", delay: 3750 },
                { top: "61.0%", left: "41.8%", delay: 3780 },
                { top: "60.4%", left: "42.0%", delay: 3810 },
                { top: "61.0%", left: "41.8%", delay: 3840 },
                { top: "60.5%", left: "41.6%", delay: 3870 },
                { top: "60.9%", left: "42.6%", delay: 3900 },
                { top: "63.9%", left: "47.7%", delay: 3930 },
                { top: "62.0%", left: "62.2%", delay: 3960 },
                { top: "61.8%", left: "60.5%", delay: 3990 },
                { top: "46.5%", left: "40.4%", delay: 4020 },
                { top: "50.3%", left: "42.6%", delay: 4050 },
                { top: "49.1%", left: "44.4%", delay: 4080 },
                { top: "49.6%", left: "44.5%", delay: 4110 },
                { top: "49.6%", left: "44.6%", delay: 4140 },
                { top: "49.5%", left: "44.7%", delay: 4170 },
                { top: "47.3%", left: "42.7%", delay: 4200 },
                { top: "53.2%", left: "63.6%", delay: 4230 },
                { top: "54.2%", left: "65.0%", delay: 4260 },
                { top: "54.0%", left: "64.7%", delay: 4290 },
                { top: "48.6%", left: "58.1%", delay: 4320 },
                { top: "48.9%", left: "58.3%", delay: 4350 },
                { top: "20.2%", left: "44.1%", delay: 4380 },
                { top: "22.2%", left: "44.3%", delay: 4410 },
                { top: "22.4%", left: "44.1%", delay: 4440 },
                { top: "21.0%", left: "43.9%", delay: 4470 },
                { top: "20.5%", left: "43.8%", delay: 4500 },
                { top: "62.0%", left: "62.2%", delay: 4530 },
                { top: "49.6%", left: "44.5%", delay: 4560 },
                { top: "24.0%", left: "41.6%", delay: 4590 },
                { top: "24.1%", left: "43.8%", delay: 4620 },
                { top: "18.7%", left: "44.1%", delay: 4650 },
                { top: "48.2%", left: "58.2%", delay: 4680 },
                { top: "48.3%", left: "58.3%", delay: 4710 },
                { top: "22.4%", left: "42.6%", delay: 4740 },
                { top: "18.1%", left: "43.9%", delay: 4770 },
                { top: "19.9%", left: "42.6%", delay: 4800 },
                { top: "60.2%", left: "62.8%", delay: 4830 },
                { top: "59.4%", left: "59.2%", delay: 4860 },
                { top: "49.4%", left: "44.8%", delay: 4890 },
                { top: "60.2%", left: "62.7%", delay: 4920 },
                { top: "23.0%", left: "51.7%", delay: 4950 },
                { top: "35.1%", left: "47.7%", delay: 4980 },
                { top: "54.0%", left: "64.9%", delay: 5010 },
                { top: "48.4%", left: "58.4%", delay: 5040 },
                { top: "20.6%", left: "43.6%", delay: 5070 },
                { top: "45.9%", left: "64.8%", delay: 5100 },
                { top: "61.1%", left: "41.7%", delay: 5130 },
                { top: "48.9%", left: "57.3%", delay: 5160 },
                { top: "17.6%", left: "43.7%", delay: 5190 },
                { top: "16.1%", left: "60.7%", delay: 5220 },
                { top: "22.3%", left: "41.4%", delay: 5250 },
                { top: "24.7%", left: "44.8%", delay: 5280 },
                { top: "64.1%", left: "49.6%", delay: 5310 },
                { top: "13.9%", left: "50.1%", delay: 5340 },
                { top: "21.6%", left: "40.5%", delay: 5370 },
                { top: "40.1%", left: "46.8%", delay: 5400 },
                { top: "19.0%", left: "43.0%", delay: 5430 },
                { top: "19.2%", left: "43.4%", delay: 5460 },
                { top: "20.0%", left: "44.1%", delay: 5490 },
                { top: "60.8%", left: "42.6%", delay: 5520 },
                { top: "59.5%", left: "59.0%", delay: 5550 },
                { top: "18.8%", left: "44.3%", delay: 5580 },
                { top: "20.6%", left: "40.9%", delay: 5610 },
                { top: "22.5%", left: "44.3%", delay: 5640 },
                { top: "21.6%", left: "40.6%", delay: 5670 },
                { top: "36.3%", left: "57.2%", delay: 5700 },
                { top: "59.7%", left: "58.9%", delay: 5730 },
                { top: "54.3%", left: "64.7%", delay: 5760 },
                { top: "59.8%", left: "58.9%", delay: 5790 },
                { top: "60.4%", left: "41.9%", delay: 5820 },
                { top: "19.9%", left: "42.4%", delay: 5850 },
                { top: "60.9%", left: "62.5%", delay: 5880 },
                { top: "21.6%", left: "40.4%", delay: 5910 },
                { top: "38.7%", left: "44.4%", delay: 5940 },
                { top: "21.2%", left: "40.5%", delay: 5970 },
                { top: "60.1%", left: "42.1%", delay: 6000 },
                { top: "22.6%", left: "40.2%", delay: 6030 },
                { top: "36.2%", left: "57.2%", delay: 6060 },
                { top: "48.8%", left: "58.2%", delay: 6090 },
                { top: "61.7%", left: "62.1%", delay: 6120 },
                { top: "21.2%", left: "44.6%", delay: 6150 },
                { top: "48.7%", left: "58.8%", delay: 6180 },
                { top: "64.5%", left: "47.6%", delay: 6210 },
                { top: "24.8%", left: "43.5%", delay: 6240 },
                { top: "22.1%", left: "44.1%", delay: 6270 },
                { top: "60.5%", left: "62.7%", delay: 6300 },
                { top: "18.0%", left: "41.7%", delay: 6330 },
                { top: "61.0%", left: "62.6%", delay: 6360 },
                { top: "32.1%", left: "44.4%", delay: 6390 },
                { top: "21.1%", left: "40.6%", delay: 6420 },
                { top: "34.0%", left: "43.8%", delay: 6450 },
                { top: "20.3%", left: "40.1%", delay: 6480 },
                { top: "19.4%", left: "42.2%", delay: 6510 },
                { top: "25.2%", left: "45.0%", delay: 6540 },
                { top: "18.2%", left: "53.5%", delay: 6570 },
                { top: "28.9%", left: "46.0%", delay: 6600 },
                { top: "31.3%", left: "50.2%", delay: 6630 },
                { top: "22.0%", left: "44.3%", delay: 6660 },
                { top: "18.6%", left: "42.9%", delay: 6690 },
                { top: "24.4%", left: "43.5%", delay: 6720 },
                { top: "60.1%", left: "53.7%", delay: 6750 },
                { top: "23.8%", left: "47.2%", delay: 6780 },
                { top: "22.5%", left: "42.6%", delay: 6810 },
                { top: "23.4%", left: "41.7%", delay: 6840 },
                { top: "54.1%", left: "64.7%", delay: 6870 },
                { top: "21.7%", left: "39.9%", delay: 6900 },
                { top: "21.6%", left: "44.5%", delay: 6930 },
                { top: "48.2%", left: "59.3%", delay: 6960 },
                { top: "64.0%", left: "47.9%", delay: 6990 },
                { top: "13.8%", left: "49.9%", delay: 7020 },
                { top: "23.8%", left: "47.3%", delay: 7050 },
                { top: "19.5%", left: "43.1%", delay: 7080 },
                { top: "24.4%", left: "43.8%", delay: 7110 },
                { top: "66.7%", left: "37.7%", delay: 7140 },
                { top: "59.3%", left: "59.0%", delay: 7170 },
                { top: "20.1%", left: "44.2%", delay: 7200 },
                { top: "67.7%", left: "49.5%", delay: 7230 },
                { top: "46.5%", left: "59.7%", delay: 7260 },
                { top: "20.9%", left: "42.1%", delay: 7290 },
                { top: "60.7%", left: "41.9%", delay: 7320 },
                { top: "89.4%", left: "38.8%", delay: 7350 },
                { top: "40.3%", left: "46.7%", delay: 7380 },
                { top: "56.4%", left: "46.9%", delay: 7410 },
                { top: "60.5%", left: "62.5%", delay: 7440 },
                { top: "60.4%", left: "62.5%", delay: 7470 },
                { top: "60.0%", left: "61.7%", delay: 7500 },
                { top: "21.5%", left: "44.6%", delay: 7530 },
                { top: "22.6%", left: "44.3%", delay: 7560 },
                { top: "54.5%", left: "64.8%", delay: 7590 },
                { top: "22.9%", left: "44.3%", delay: 7620 },
                { top: "36.8%", left: "59.3%", delay: 7650 },
                { top: "20.7%", left: "41.9%", delay: 7680 },
                { top: "23.1%", left: "52.0%", delay: 7710 },
                { top: "18.4%", left: "43.9%", delay: 7740 },
                { top: "19.8%", left: "43.6%", delay: 7770 },
                { top: "17.9%", left: "44.0%", delay: 7800 },
                { top: "60.6%", left: "42.0%", delay: 7830 },
                { top: "24.9%", left: "45.0%", delay: 7860 },
                { top: "20.2%", left: "42.7%", delay: 7890 },
                { top: "18.7%", left: "43.7%", delay: 7920 },
                { top: "32.7%", left: "44.7%", delay: 7950 },
                { top: "22.3%", left: "42.7%", delay: 7980 },
                { top: "91.0%", left: "39.2%", delay: 8010 },
                { top: "61.2%", left: "62.0%", delay: 8040 },
                { top: "18.7%", left: "44.3%", delay: 8070 },
                { top: "32.2%", left: "58.6%", delay: 8100 },
                { top: "24.5%", left: "43.2%", delay: 8130 },
                { top: "60.2%", left: "58.0%", delay: 8160 },
                { top: "23.7%", left: "43.4%", delay: 8190 },
                { top: "17.9%", left: "43.2%", delay: 8220 },
                { top: "63.2%", left: "40.8%", delay: 8250 },
                { top: "63.6%", left: "40.8%", delay: 8280 },
            ],
        },
    },
    {
        num: "04",
        title: "투자자와 경영진의 고개를 끄덕이게 할 강력한 무기",
        desc: "설문조사의 가짜 '좋아요'는 투자자도 안 믿습니다. 지역 거점 팝업 쇼룸에서 수집된 고객의 생생한 O2O 구매 행동 데이터로, 당신의 사업계획서에 누구도 반박할 수 없는 강력한 힘을 실어주세요.",
        visual: {
            kind: "bars",
            bars: [
                { label: "방문", pct: 100 },
                { label: "체류", pct: 85 },
                { label: "상담", pct: 42 },
                { label: "구매", pct: 28 },
            ],
        },
    },
];

/* ── 메인 섹션 ── */
export default function HowItWorksSection() {
    return (
        <section id="how" className="border-b py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="flex flex-col">
                    {STEPS.map((step, i) => (
                        <div key={i}>
                            <div className="fade-up grid grid-cols-1 items-center gap-10 py-14 lg:grid-cols-2">
                                {/* 텍스트 */}
                                <div>
                                    <span className="inline-block rounded-md border px-2 py-0.5 font-mono text-xs text-muted-foreground mb-4">
                                        STEP {step.num}
                                    </span>
                                    <h3 className="mb-3 text-xl font-bold tracking-tight lg:text-2xl">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                                </div>

                                {/* 비주얼 */}
                                {step.visual.kind === "typing" && (
                                    <TypingCard lines={step.visual.lines} />
                                )}

                                {step.visual.kind === "conversion" && (
                                    <div className="rounded-xl border bg-muted/30 p-5">
                                        <p className="mb-4 font-mono text-xs text-muted-foreground"># 가짜문(Fake Door) 수요 검증 데이터</p>
                                        <div className="flex flex-col gap-3">
                                            <div className="rounded-lg border bg-background px-4 py-5 text-center">
                                                <p className="text-5xl font-bold text-primary">
                                                    {step.visual.conversion}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">{step.visual.sub}</p>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2.5">
                                                <span className="pulse-dot inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                                                <span className="text-xs text-muted-foreground">
                                                    💡 실시간 지표:{" "}
                                                    <span className="font-medium text-foreground">
                                                        {step.visual.visitors.toLocaleString("ko-KR")}명
                                                    </span>{" "}
                                                    방문 중{" "}
                                                    <span className="font-medium text-foreground">
                                                        {step.visual.clicks}명
                                                    </span>{" "}
                                                    사전결제 버튼 클릭
                                                </span>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                                            온라인 평균 전환율은 2~3%입니다. 알파데이에서 가상 제품으로{" "}
                                            <span className="font-semibold text-foreground">5% 이상</span>의 클릭(CTR)이 나왔다면,
                                            당장 개발을 시작해도 좋습니다.
                                        </p>
                                    </div>
                                )}

                                {step.visual.kind === "map" && <MapCard pins={step.visual.pins} />}

                                {step.visual.kind === "bars" && (
                                    <BarsCard bars={step.visual.bars} />
                                )}
                            </div>

                            {i < STEPS.length - 1 && <Separator />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
