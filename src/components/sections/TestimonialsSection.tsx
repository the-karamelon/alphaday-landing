const TESTIMONIALS = [
  {
    quote: "알파데이 덕분에 3개월 걸릴 검증을 1주일 만에 끝냈습니다. 실제 전환 데이터로 투자 미팅에서 바로 OK를 받았어요.",
    name: "김민준", role: "B2B SaaS 창업자", emoji: "🦁",
  },
  {
    quote: "개발자 없이 혼자서 랜딩페이지를 만들고 첫 고객 10명을 모았습니다. 막막했던 시작이 이렇게 쉬울 줄 몰랐어요.",
    name: "이서연", role: "1인 뷰티 창업자", emoji: "🌸",
  },
  {
    quote: "외주비 2500만 원 쓰기 전에 알파데이로 먼저 테스트했더니, 원래 아이디어가 틀렸다는 걸 알았어요. 덕분에 돈을 아꼈습니다.",
    name: "박지호", role: "하드웨어 스타트업 CTO", emoji: "🔧",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="border-b py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">고객 후기</p>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            이미 검증을 마친 창업자들의 이야기
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="fade-up flex flex-col gap-5 rounded-xl border bg-background p-6"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1l1.4 2.9L12 4.5 9.5 6.8l.6 3.4L7 8.7 3.9 10.2l.6-3.4L2 4.5l3.6-.6L7 1z" fill="#f97316" />
                  </svg>
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 border-t pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted text-sm">
                  {t.emoji}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
