/* app/layout.tsx */
"use client";

import "../globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";

  const navItems = [
    { href: "/feed", label: "WATCH" },
    { href: "/live12", label: "LIVE12" },
    { href: "/wallet", label: "WALLET" },
  ];

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col items-center">
        <div className="w-full max-w-[430px] min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 flex justify-center pointer-events-auto">
          <div className="w-full max-w-[430px] bg-black border-t border-neutral-800">
            <div className="flex justify-between items-center px-4 py-2">
              {navItems.map((item) => {
                const active = pathname === item.href || (item.href === "/live12" && pathname === "/");
                return (
                  <Link key={item.href} href={item.href} className="flex-1">
                    <button
                      className={`w-full py-2 text-sm font-semibold rounded-md transition-colors duration-150 ${
                        active ? "text-yellow-400" : "text-neutral-300"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </body>
    </html>
  );
}
