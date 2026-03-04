"use client";

import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/gtag";

interface CTASectionProps {
    onCTAClick: () => void;
}

export default function CTASection({ onCTAClick }: CTASectionProps) {
    return (
        <section className="relative overflow-hidden border-b py-32">
            <div className="dot-pattern pointer-events-none absolute inset-0 opacity-40" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />

            <div className="relative mx-auto max-w-3xl px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
                    혼자서 끙끙 앓던 그 훌륭한 아이디어,<br />
                    이제 서랍 속에서 꺼내주세요.
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-base leading-relaxed text-muted-foreground">
                    완벽한 타이밍을 기다리느라 시간을 버리지 마세요. <br />알파데이가 당신의 가장 든든한 페이스메이커가 되어 함께 뛰겠습니다.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3">
                    <Button
                        size="lg"
                        onClick={() => {
                            trackCTAClick('5분 만에 내 아이디어 시장 반응 확인 (CTA Section)', 'button');
                            onCTAClick();
                        }}
                        className="group relative cursor-pointer overflow-hidden rounded-full px-8 transition-all"
                        title="준비는 저희가 다 해두었습니다"
                    >
                        <span>⚡ 5분 만에 내 아이디어 시장 반응 확인하기</span>
                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-primary/90 opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-sm font-medium text-primary-foreground">
                            준비는 저희가 다 해두었습니다 →
                        </span>
                    </Button>
                </div>
            </div>
        </section>
    );
}
