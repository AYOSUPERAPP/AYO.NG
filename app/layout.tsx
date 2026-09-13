import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AYO.NG - African Pride Nigeria Made",
  description: "Capture. Connect. Create. Discover. Built in Lagos for Nigeria.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#050508] text-white antialiased">{children}</body>
    </html>
  );
}
