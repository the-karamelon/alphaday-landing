import { Separator } from "@/components/ui/separator";

const LINKS: Record<string, string[]> = {
    "서비스": ["서비스 소개", "이용 방법"],
    "회사": ["팀 소개"],
    "지원": ["문의하기", "이용약관", "개인정보처리방침"],
};

export default function Footer() {
    return (
        <footer className="border-t">
            <div className="mx-auto max-w-5xl px-6 py-12">
                <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
                    <div>
                        <div className="mb-3 flex items-center gap-1.5">
                            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-[16px] font-bold text-white">α</span>
                            <span className="text-sm font-semibold">alphaday</span>
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            아이디어를 가장 빠르게,<br />
                            가장 적은 비용으로 검증하는 창업 플랫폼
                        </p>
                    </div>
                    <a href="mailto:the.karamelon@gmail.com" className="text-xs text-muted-foreground transition-colors hover:text-foreground lg:text-right">
                        the.karamelon@gmail.com
                    </a>
                </div>
                <Separator className="my-8" />
                <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
                    <p>© 2026 Karamelon. All rights reserved.</p>
                    {/* <div className="flex gap-4">
                        {["Twitter", "LinkedIn", "Instagram"].map((s) => (
                            <a key={s} href="#" className="transition-colors hover:text-foreground">{s}</a>
                        ))}
                    </div> */}
                </div>
            </div>
        </footer>
    );
}
