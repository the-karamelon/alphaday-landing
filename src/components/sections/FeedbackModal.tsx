"use client";

import { useState } from "react";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { saveFeedback } from "@/lib/firestore";

interface FeedbackModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCloseAll?: () => void;
    docId?: string | null;
}

const STAGES = [
    "머릿속에 아이디어만 둥둥 떠다니는 상태 (막막함)",
    "기획/디자인은 끝났는데 개발 구현에서 막힌 상태 (실행의 벽)",
    "시제품은 있는데 어디서 고객 반응을 봐야 할지 모르는 상태 (검증의 벽)",
    "이미 한 번 실패의 쓴맛을 보고 피봇(Pivot)을 준비하는 상태 (재도전)",
];

const FEARS = [
    "수천만 원의 외주 개발비를 썼다가 아무도 안 살까 봐",
    "개발자/디자이너 팀원을 구하지 못해서 계속 시간만 흐르고 있어서",
    "주변 지인들은 좋다고 하는데, 진짜 돈을 낼 시장 수요인지 확신이 없어서",
    "시제품(워킹목업)을 만들고 싶은데 오프라인 제조 인프라나 비용이 부족해서",
];

const FEATURES = [
    "AI 파트너와 함께 모호한 아이디어를 5분 만에 기획서로 정리하기",
    "제품 없이 AI 이미지로 랜딩페이지만 만들어 시장 반응 가검증(Fake Door) 하기",
    "전국 메이커스페이스 네트워크를 통해 내 제품 실물로 뚝딱 만들기",
    "지역 팝업 쇼룸에 내 제품을 전시하고 고객 O2O 결제 데이터 수집하기",
];

const BRIDGES = [
    "",
    "아, 그런 상황이시군요. 충분히 공감합니다.\n그렇다면...",
    "네, 그 두려움 잘 알고 있습니다.\n마지막으로 한 가지만 더 여쭤볼게요.",
    "거의 다 왔어요! 마지막으로...",
];

export default function FeedbackModal({ open, onOpenChange, onCloseAll, docId }: FeedbackModalProps) {
    const [step, setStep] = useState(0); // 0~3: 질문, 4: 완료
    const [startupStage, setStartupStage] = useState("");
    const [fears, setFears] = useState<string[]>([]);
    const [feature, setFeature] = useState("");
    const [story, setStory] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = (val: boolean) => {
        onOpenChange(val);
        if (!val) setTimeout(() => {
            setStep(0); setStartupStage(""); setFears([]); setFeature(""); setStory("");
        }, 300);
    };

    const toggleFear = (f: string) => {
        setFears((prev) =>
            prev.includes(f) ? prev.filter((x) => x !== f) : prev.length < 2 ? [...prev, f] : prev
        );
    };

    const canNext = () => {
        if (step === 0) return !!startupStage;
        if (step === 1) return fears.length > 0;
        if (step === 2) return !!feature;
        return true;
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md rounded-xl">
                {step < 4 ? (
                    <>
                        {/* 진행 바 */}
                        <div className="flex gap-1 mb-2">
                            {[0, 1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="h-1 flex-1 rounded-full transition-all duration-300"
                                    style={{ background: i <= step ? "var(--primary)" : "var(--muted)" }}
                                />
                            ))}
                        </div>

                        {/* 브릿지 문구 */}
                        {step > 0 && BRIDGES[step] && (
                            <p className="text-xs text-muted-foreground whitespace-pre-line mb-1 italic">
                                {BRIDGES[step]}
                            </p>
                        )}

                        <DialogHeader>
                            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                {step + 1} / 4
                            </p>
                            <DialogTitle className="text-base leading-snug mt-1">
                                {step === 0 && "현재 창업자님의 아이디어는 어느 단계에 머물러 있나요?"}
                                {step === 1 && "지금 사업화하면서 가장 두렵거나 망설여지는 이유는 무엇인가요? (최대 2개)"}
                                {step === 2 && "알파데이가 런칭된다면, 가장 먼저 써보고 싶은 '마법'은 무엇인가요?"}
                                {step === 3 && "창업자님이 겪으셨던 가장 억울하고 힘들었던 창업 썰을 들려주세요. (선택)"}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col gap-2 mt-2">
                            {step === 0 && STAGES.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStartupStage(s)}
                                    className={`rounded-lg border px-3 py-2.5 text-left text-xs transition-colors ${startupStage === s
                                        ? "border-primary bg-primary/10 text-primary font-medium"
                                        : "bg-background text-muted-foreground hover:border-primary/50"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}

                            {step === 1 && FEARS.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => toggleFear(f)}
                                    className={`rounded-lg border px-3 py-2.5 text-left text-xs transition-colors ${fears.includes(f)
                                        ? "border-primary bg-primary/10 text-primary font-medium"
                                        : "bg-background text-muted-foreground hover:border-primary/50"
                                        } ${!fears.includes(f) && fears.length >= 2 ? "opacity-40 cursor-not-allowed" : ""}`}
                                >
                                    {f}
                                </button>
                            ))}

                            {step === 2 && FEATURES.map((ft) => (
                                <button
                                    key={ft}
                                    onClick={() => setFeature(ft)}
                                    className={`rounded-lg border px-3 py-2.5 text-left text-xs transition-colors ${feature === ft
                                        ? "border-primary bg-primary/10 text-primary font-medium"
                                        : "bg-background text-muted-foreground hover:border-primary/50"
                                        }`}
                                >
                                    {ft}
                                </button>
                            ))}

                            {step === 3 && (
                                <textarea
                                    rows={4}
                                    placeholder="저희가 밤을 새워서라도 해결책을 만들어오겠습니다..."
                                    value={story}
                                    onChange={(e) => setStory(e.target.value)}
                                    className="w-full resize-none rounded-lg border bg-background px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                />
                            )}
                        </div>

                        <div className="flex gap-2 mt-2">
                            {step > 0 && (
                                <Button variant="outline" onClick={() => setStep((s) => s - 1)} className="rounded-full px-4 text-xs cursor-pointer">
                                    이전
                                </Button>
                            )}
                            <Button
                                onClick={async () => {
                                    if (step === 3) {
                                        setIsSubmitting(true);
                                        try {
                                            if (docId) {
                                                await saveFeedback(docId, { startupStage, fears, feature, story });
                                            }
                                        } catch (err) {
                                            console.error("피드백 저장 실패:", err);
                                        } finally {
                                            setIsSubmitting(false);
                                        }
                                    }
                                    setStep((s) => s + 1);
                                }}
                                disabled={!canNext() || isSubmitting}
                                className="flex-1 rounded-full text-xs cursor-pointer"
                            >
                                {step === 3 ? (isSubmitting ? "저장 중..." : "제출하기") : "다음"}
                            </Button>
                        </div>
                    </>
                ) : (
                    /* 완료 화면 */
                    <div className="flex flex-col items-center gap-4 py-6 text-center">
                        <div className="pop-in flex h-16 w-16 items-center justify-center rounded-full border bg-muted text-3xl">
                            🙏
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-bold">목소리가 무사히 도착했습니다!</h3>
                            <p className="text-xs leading-relaxed text-muted-foreground px-2">
                                남겨주신 소중한 이야기를 바탕으로{" "}
                                <span className="font-semibold text-foreground">오늘부터 바로 개발에 착수</span>하겠습니다.
                                런칭 날, 가장 먼저 기쁜 소식과 함께{" "}
                                <span className="font-semibold text-foreground">무료 검증권</span>을 들고 메일로 찾아뵙겠습니다.
                                <br /><br />
                                오늘 하루도 고생 많으셨습니다. 🤝
                            </p>
                        </div>
                        <Button
                            onClick={() => { handleClose(false); onCloseAll?.(); }}
                            className="rounded-full px-6 text-xs cursor-pointer"
                        >
                            닫기
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
