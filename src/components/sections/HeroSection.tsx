"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface HeroSectionProps {
    onCTAClick: () => void;
}

const phrases = [
    "타겟 고객 설정 완료 → 핵심 가설 도출 중",
    "가상 제품 랜딩페이지 생성 완료 ✅",
    "소셜 광고 집행 → 전환 데이터 수집 중",
    "결제 전환율 8.4% — 시장 반응 확인됨 🎯",
];

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
    const typingRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let phraseIdx = 0, charIdx = 0, isDeleting = false;
        let timer: ReturnType<typeof setTimeout>;
        function loop() {
            const el = typingRef.current;
            if (!el) return;
            const cur = phrases[phraseIdx];
            if (isDeleting) {
                el.textContent = cur.slice(0, --charIdx);
                if (charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
            } else {
                el.textContent = cur.slice(0, ++charIdx);
                if (charIdx === cur.length) { isDeleting = true; timer = setTimeout(loop, 2000); return; }
            }
            timer = setTimeout(loop, isDeleting ? 22 : 45);
        }
        timer = setTimeout(loop, 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative overflow-hidden border-b pt-24 pb-20">
            {/* dot grid */}
            <div className="dot-pattern pointer-events-none absolute inset-0 opacity-50" />
            {/* top fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
            {/* bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

            <div className="relative mx-auto max-w-5xl px-6">
                {/* Headline */}
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        머릿속 아이디어,
                        <br />
                        아직도 수천만 원 들여
                        <br />
                        <span className="text-primary">'먼저' 만들고</span> 계신가요?
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                        저희도 똑같이 실패해봤기에, 그 막막함을 누구보다 잘 압니다.
                    </p>
                    <p className="mx-auto mt-2 text-base leading-relaxed text-muted-foreground sm:whitespace-nowrap">
                        개발자 없이, 디자인 없이. 당신의 아이디어가 진짜 팔릴지 <strong className="font-semibold text-foreground">5분 만에</strong> 확인해 드릴게요.
                    </p>
                    <p className="mx-auto mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
                        아이디어만 가져오세요. 지갑을 여는 첫 고객은 저희가 찾아놓겠습니다.
                    </p>
                </div>

                {/* CTA buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Button size="lg" onClick={onCTAClick} className="cursor-pointer rounded-full px-6">
                        ⚡ 5분 만에 시장 반응 확인하기
                    </Button>
                    {/* <Button size="lg" variant="outline" onClick={onCTAClick} className="cursor-pointer rounded-full px-6">
                        서비스 더 알아보기
                    </Button> */}
                </div>

                {/* Terminal card */}
                <div className="mx-auto mt-12 max-w-2xl">
                    <Card className="overflow-hidden py-0 shadow-none">
                        <CardContent className="p-0">
                            <div className="flex items-center gap-1.5 border-b bg-muted px-4 py-2.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                            </div>
                            <div className="p-5">
                                <p className="typing-cursor font-mono text-sm min-h-[1.25rem]">
                                    <span ref={typingRef} />
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
