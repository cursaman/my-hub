import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "my-hub | 나만의 정보 포털",
  description: "관심 있는 정보와 자주 쓰는 서비스를 한곳에서 만나보세요.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
