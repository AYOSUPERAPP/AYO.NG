import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AYO.NG - Nigeria Made | Play, Chat, Earn',
  description: 'Nigeria No.1 Super App - Games, Chat, Earn, Cashout with Paystack - Naija Made',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* Nigeria Made Header */}
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-green-600/20">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-white rounded-lg flex items-center justify-center font-black text-black">
                A
              </div>
              <span className="font-black text-xl tracking-tight">
                AYO<span className="text-green-500">.NG</span>
              </span>
              <span className="text- bg-green-500 text-black px-2 py-0.5 rounded-full font-bold ml-2">
                NIGERIA MADE
              </span>
            </div>
            <div className="text-xs text-gray-400">🇳🇬 Naija to the World</div>
          </div>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="border-t border-white/10 py-6 text-center text-xs text-gray-500">
          © 2026 AYO.NG - Built in Lagos • Play • Chat • Earn
        </footer>
      </body>
    </html>
  )
}
