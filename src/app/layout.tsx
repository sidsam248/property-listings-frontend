import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GlobalBottomNav from './ui/global-bottom-nav/global-bottom-nav'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Property Listings Blr',
  description: 'Property Listings Frontend',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col min-h-screen m-0"}>
        <main className = "min-h-screen grid grid-cols-1">
          <div className= "w-full my-2">
          {children}
          </div>
        </main>
        <GlobalBottomNav />
      </body>
    </html>
  )
}
