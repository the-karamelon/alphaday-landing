"use client";

import { useState } from "react";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FeedbackModal from "./FeedbackModal";
import { saveEmail } from "@/lib/firestore";

interface ReservationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ReservationModal({ open, onOpenChange }: ReservationModalProps) {
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [docId, setDocId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = (val: boolean) => {
        onOpenChange(val);
        if (!val) setTimeout(() => { setSubmitted(false); setEmail(""); setDocId(null); }, 300);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const id = await saveEmail(email);
            setDocId(id);
            console.log("✅ 이메일 저장 성공, docId:", id);
        } catch (err) {
            console.error("❌ 이메일 저장 실패 (Firestore 오류):", err);
            // 저장 실패해도 완료 화면은 정상 노출
        }
        setIsLoading(false);
        setSubmitted(true);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="max-w-sm rounded-xl">
                    {!submitted ? (
                        <>
                            <DialogHeader>
                                <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">무료 사전예약</p>
                                <DialogTitle className="text-lg">이메일을 남겨주세요</DialogTitle>
                                <p className="text-sm text-muted-foreground pt-1">
                                    오픈 소식을 가장 먼저 알려드릴게요.
                                </p>
                            </DialogHeader>

                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-3 mt-2"
                            >
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="example@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-10 text-sm"
                                    autoFocus
                                />
                                <Button type="submit" disabled={isLoading} className="w-full cursor-pointer rounded-full">
                                    {isLoading ? "저장 중..." : "사전예약 신청하기"}
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-4 py-4 text-center">
                            <div className="pop-in flex h-16 w-16 items-center justify-center rounded-full border bg-muted text-3xl">
                                🎉
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-bold">사전예약 완료!</h3>
                                <p className="text-sm text-muted-foreground">
                                    오픈되면 <span className="font-medium text-foreground">{email}</span>으로<br />가장 먼저 알려드릴게요.
                                </p>
                            </div>
                            <div className="w-full rounded-xl border bg-muted/40 px-4 py-3 text-center">
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                    지금 혼자 창업을 준비하며 가장 답답한 부분은 무엇인가요?<br />
                                    저희가 그 문제부터 확실히 부숴놓겠습니다.
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-3 w-full cursor-pointer rounded-full text-xs bg-orange-500 hover:bg-orange-600 text-white hover:text-white border-orange-500 hover:border-orange-600"
                                    onClick={() => setFeedbackOpen(true)}
                                >
                                    💬 제가 겪고 있는 막막함은요...
                                </Button>
                            </div>
                            {/* <Button variant="outline" onClick={() => handleClose(false)} className="cursor-pointer rounded-full px-6 text-xs text-muted-foreground">
                            확인
                        </Button> */}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} onCloseAll={() => handleClose(false)} docId={docId} />
        </>
    );
}
