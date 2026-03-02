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
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                    <div className="col-span-2 lg:col-span-1">
                        <div className="mb-3 flex items-center gap-1.5">
                            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-[11px] font-bold text-white">α</span>
                            <span className="text-sm font-semibold">alphaday</span>
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            아이디어를 가장 빠르게,<br />
                            가장 적은 비용으로 검증하는 창업 플랫폼
                        </p>
                    </div>
                    {/* {Object.entries(LINKS).map(([title, items]) => (
                        <div key={title}>
                            <p className="mb-3 text-xs font-semibold">{title}</p>
                            <ul className="flex flex-col gap-2">
                                {items.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))} */}
                </div>
                <Separator className="my-8" />
                <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
                    <p>© 2026 AlphaDay. All rights reserved.</p>
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
