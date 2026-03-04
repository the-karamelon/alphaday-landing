import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const BASE_URL = "https://alphaday.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "알파데이 – 아이디어만 가져오세요. 무료 사전예약",
    template: "%s | 알파데이",
  },
  description:
    "개발자 없이, 디자인 없이. 당신의 아이디어가 진짜 팔릴지 5분 만에 확인하세요. 창업 아이디어 검증, MVP 제작, 시제품 제작, 고객 반응 테스트까지. 알파데이 무료 사전예약.",
  keywords: [
    "창업",
    "창업 아이디어 검증",
    "MVP 검증",
    "가짜문 테스트",
    "Fake Door",
    "시제품 제작",
    "메이커스페이스",
    "사전예약",
    "스타트업",
    "창업 플랫폼",
    "알파데이",
    "alphaday",
    "랜딩페이지 제작",
    "고객 반응 테스트",
  ],
  authors: [{ name: "알파데이", url: BASE_URL }],
  creator: "알파데이",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: BASE_URL,
    siteName: "알파데이",
    title: "알파데이 – 아이디어만 가져오세요. 무료 사전예약",
    description:
      "개발자 없이, 디자인 없이. 당신의 아이디어가 진짜 팔릴지 5분 만에 확인하세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "알파데이 – 아이디어만 가져오세요. 무료 사전예약",
    description:
      "개발자 없이, 디자인 없이. 당신의 아이디어가 진짜 팔릴지 5분 만에 확인하세요.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="light" style={{ colorScheme: "light" }}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VCH292ELCZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VCH292ELCZ');
          `}
        </Script>
      </head>
      <body className="antialiased" style={{ fontFamily: "'A2z', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
