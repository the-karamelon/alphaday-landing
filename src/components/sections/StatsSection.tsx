"use client";

import { useEffect, useRef } from "react";

const STATS = [
    {
        target: 42,
        suffix: "%",
        title: "'시장 수요 없음(No Market Need)'. 스타트업이 실패하는 가장 압도적인 1위 이유입니다.",
    },
    {
        target: 3,
        suffix: "개월",
        title: "쓸데없는 기능만 가득한 MVP를 만드느라 허비하는 평균 시간입니다.",
    },
    {
        target: 2500,
        suffix: "만원",
        title: "검증되지 않은 아이디어를 외주 개발할 때 날리는 평균 비용입니다.",
    },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const done = useRef(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting || done.current) return;
            done.current = true;
            let n = 0;
            const step = target / 50;
            const t = setInterval(() => {
                n = Math.min(n + step, target);
                el.textContent = target >= 1000 ? Math.round(n).toLocaleString("ko-KR") : String(Math.round(n));
                if (n >= target) clearInterval(t);
            }, 28);
        }, { threshold: 0.5 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [target]);
    return <><span ref={ref}>0</span>{suffix}</>;
}

export default function StatsSection() {
    return (
        <section id="stats" className="border-b py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-4 text-center">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        창업 시장의 팩트 폭행
                    </p>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight lg:text-3xl">
                        외면하기 싫지만, 마주해야 할 숫자들
                    </h2>
                </div>
                <div className="mt-12 grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0 rounded-lg border bg-background">
                    {STATS.map((s, i) => (
                        <div key={i} className="fade-up flex flex-col items-center px-24 py-8 text-center">
                            <p className="mb-3 text-5xl font-bold tabular-nums text-primary lg:text-6xl">
                                <CountUp target={s.target} suffix={s.suffix} />
                            </p>
                            <p className="text-sm font-semibold leading-snug">{s.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
