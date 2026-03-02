const FEATURES = [
    {
        icon: "🤝",
        title: "개발자, 디자이너가 없어서 시작도 못 하셨나요?",
        desc: "코딩 한 줄 몰라도 괜찮습니다. 알파데이 AI가 당신의 머릿속 뭉게구름 같은 아이디어를, 당장 내다 팔 수 있는 그럴듯한 제품 랜딩페이지로 뚝딱 그려냅니다.",
    },
    {
        icon: "☕",
        title: "퇴근 후 쪼개 쓰는 금 같은 시간, 커피 몇 잔 값으로.",
        desc: "수십 달의 시간과 수천만 원의 외주 개발비, 이젠 절대 쓰지 마세요. 주말에 카페에서 커피 한 잔 마실 시간과 돈만 있으면 내 비즈니스의 진짜 시장 반응을 확인할 수 있습니다.",
    },
    {
        icon: "🎯",
        title: "더 이상 지인들의 '아이디어 좋네'라는 빈말에 속지 마세요.",
        desc: "우리에게 필요한 건 가짜 칭찬이 아니라, 지갑을 여는 진짜 고객입니다. 감이나 추측이 아닌 명확한 결제 전환율 데이터로 당신의 아이디어에 확신을 드립니다.",
    },
];

export default function ValuesSection() {
    return (
        <section id="values" className="relative overflow-hidden border-b py-24">
            <div className="dot-pattern pointer-events-none absolute inset-0 opacity-30" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

            <div className="relative mx-auto max-w-5xl px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
                        저희도 똑같이 실패해봤기에,<br />그 막막함을 누구보다 잘 압니다.
                    </h2>
                </div>

                {/* bento grid */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {FEATURES.map((f, i) => (
                        <div
                            key={i}
                            className="fade-up rounded-xl border bg-background p-6"
                            style={{ transitionDelay: `${i * 0.06}s` }}
                        >
                            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border bg-muted text-xl">
                                {f.icon}
                            </div>
                            <h3 className="mb-2 font-semibold leading-snug">{f.title}</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
