import { db } from "./firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";

const TIMEOUT_MS = 8000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Firestore timeout after ${ms}ms`)), ms)
    );
    return Promise.race([promise, timeout]);
}

/**
 * 사전예약 이메일 저장
 * @returns 생성된 문서 ID (피드백 업데이트 시 사용)
 */
export async function saveEmail(email: string): Promise<string> {
    console.log("🔥 Firebase projectId:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
    const docRef = await withTimeout(
        addDoc(collection(db, "reservations"), {
            email,
            source: "landing_page",
            createdAt: serverTimestamp(),
        }),
        TIMEOUT_MS
    );
    return docRef.id;
}

/**
 * 피드백 설문 결과를 기존 예약 문서에 업데이트
 */
export async function saveFeedback(
    docId: string,
    feedback: {
        startupStage: string;
        fears: string[];
        feature: string;
        story: string;
    }
): Promise<void> {
    const docRef = doc(db, "reservations", docId);
    await updateDoc(docRef, {
        ...feedback,
        feedbackSubmittedAt: serverTimestamp(),
    });
}
