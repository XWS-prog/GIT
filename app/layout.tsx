import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "金币远征｜浏览器像素平台游戏",
  description: "移动、跳跃、踩扁怪物，穿越三片大陆收集金币，点亮最后的星门。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
