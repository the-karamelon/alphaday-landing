import { ImageResponse } from "next/og";

export const alt = "알파데이 – 아이디어만 가져오세요";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "#111827",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px",
                    gap: "24px",
                }}
            >
                {/* 로고 */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        marginBottom: "8px",
                    }}
                >
                    <div
                        style={{
                            width: "56px",
                            height: "56px",
                            background: "white",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "32px",
                            fontWeight: "bold",
                            color: "#111827",
                        }}
                    >
                        α
                    </div>
                    <span
                        style={{
                            fontSize: "36px",
                            fontWeight: "bold",
                            color: "white",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        alphaday
                    </span>
                </div>

                {/* 메인 카피 */}
                <div
                    style={{
                        fontSize: "52px",
                        fontWeight: "bold",
                        color: "white",
                        textAlign: "center",
                        lineHeight: 1.2,
                        letterSpacing: "-1px",
                    }}
                >
                    아이디어만 가져오세요.
                </div>

                {/* 서브 카피 */}
                <div
                    style={{
                        fontSize: "24px",
                        color: "#9ca3af",
                        textAlign: "center",
                        lineHeight: 1.5,
                    }}
                >
                    개발자 없이, 디자인 없이.{"\n"}
                    당신의 아이디어가 진짜 팔릴지 5분 만에 확인하세요.
                </div>

                {/* CTA 배지 */}
                <div
                    style={{
                        marginTop: "16px",
                        background: "white",
                        color: "#111827",
                        fontSize: "18px",
                        fontWeight: "600",
                        padding: "12px 32px",
                        borderRadius: "999px",
                    }}
                >
                    🚀 무료 사전예약 진행 중
                </div>
            </div>
        ),
        { ...size }
    );
}
