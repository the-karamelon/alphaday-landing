import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "알파데이 – 아이디어만 가져오세요. 사전예약",
  description:
    "개발자 없이, 디자인 없이. 당신의 아이디어가 진짜 팔릴지 5분 만에 확인하세요. 알파데이 무료 사전예약.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="light" style={{ colorScheme: "light" }}>
      <body className="antialiased" style={{ fontFamily: "'A2z', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
