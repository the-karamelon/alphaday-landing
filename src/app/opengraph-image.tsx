import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const alt = "알파데이 – 아이디어만 가져오세요";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
    // public 폴더에서 직접 ttf 로드
    const [fontRegular, fontBold] = await Promise.all([
        readFile(path.join(process.cwd(), "public", "에이투지체-4Regular.ttf")),
        readFile(path.join(process.cwd(), "public", "에이투지체-7Bold.ttf")),
    ]);

    return new ImageResponse(
        (
            <div
                style={{
                    background: "#ffffff",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    fontFamily: "'A2z'",
                }}
            >
                {/* dot grid 배경 */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: "radial-gradient(circle, #d1d5db 1.5px, transparent 1.5px)",
                        backgroundSize: "28px 28px",
                        opacity: 0.5,
                        display: "flex",
                    }}
                />

                {/* 콘텐츠 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0px", position: "relative", padding: "0 80px" }}>

                    {/* 로고 */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "36px" }}>
                        <div style={{ width: "40px", height: "40px", background: "#E75C3A", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "bold", color: "white" }}>
                            α
                        </div>
                        <span style={{ fontSize: "22px", fontWeight: "700", color: "#111827", letterSpacing: "-0.5px" }}>
                            alphaday
                        </span>
                    </div>

                    {/* 헤드라인 */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                        <div style={{ display: "flex", fontSize: "60px", fontWeight: "800", color: "#111827", letterSpacing: "-2px", lineHeight: 1.15, textAlign: "center" }}>
                            머릿속 아이디어,
                        </div>
                        <div style={{ display: "flex", fontSize: "60px", fontWeight: "800", letterSpacing: "-2px", lineHeight: 1.15, textAlign: "center", gap: "0px" }}>
                            <span style={{ color: "#E75C3A" }}>'먼저' 만들기&nbsp;</span>
                            <span style={{ color: "#111827" }}>전에 검증하세요</span>
                        </div>
                    </div>

                    {/* 서브 카피 */}
                    <div style={{ display: "flex", fontSize: "22px", color: "#6b7280", marginTop: "24px", letterSpacing: "-0.3px", textAlign: "center" }}>
                        개발자 없이, 디자인 없이. 아이디어만 가져오세요.
                    </div>

                    {/* 사전예약 버튼 */}
                    <div style={{
                        display: "flex",
                        marginTop: "40px",
                        background: "#E75C3A",
                        color: "white",
                        fontSize: "22px",
                        fontWeight: "600",
                        padding: "18px 48px",
                        borderRadius: "999px",
                        letterSpacing: "-0.3px",
                    }}>
                        ⚡ 5분 만에 시장 반응 확인하기
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                { name: "A2z", data: fontRegular, weight: 400, style: "normal" },
                { name: "A2z", data: fontBold, weight: 700, style: "normal" },
            ],
        }
    );
}
