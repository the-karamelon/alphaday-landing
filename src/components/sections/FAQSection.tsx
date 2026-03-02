"use client";

import { useState } from "react";

const FAQS = [
  { q: "개발이나 디자인 지식이 없어도 사용할 수 있나요?", a: "네, 전혀 필요하지 않습니다. 비개발자 창업자를 위해 설계되었습니다. 아이디어만 입력하면 AI가 모든 것을 처리해 드립니다." },
  { q: "사전예약 이후 언제부터 서비스를 이용할 수 있나요?", a: "선착순 100명에게는 베타 오픈과 동시에 우선 접근권이 부여됩니다. 사전예약 확정 후 이메일로 일정을 안내해 드립니다." },
  { q: "정말 무료로 시작할 수 있나요?", a: "사전예약은 100% 무료이며, 카드 등록도 필요 없습니다. 베타 기간 동안은 핵심 기능을 무료로 이용하실 수 있습니다." },
  { q: "하드웨어 제품 아이디어도 검증할 수 있나요?", a: "물론입니다. 전국 메이커스페이스 네트워크를 통해 시제품 제작까지 연결해 드립니다." },
  { q: "검증 데이터를 실제 투자 유치에 활용할 수 있나요?", a: "네. 실제 결제 전환율과 O2O 구매 행동 데이터를 제공하므로 투자자 미팅에서 강력한 근거 자료로 활용할 수 있습니다." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="border-b py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">FAQ</p>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">자주 묻는 질문</h2>
        </div>
        <div className="divide-y rounded-xl border bg-background">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium transition-colors hover:bg-muted/40"
              >
                <span>{faq.q}</span>
                <span
                  className={`ml-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-200"
                style={{ maxHeight: open === i ? "200px" : "0" }}
              >
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
