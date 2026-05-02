import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Italian Crash Course',
  description: 'MAGARI!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
