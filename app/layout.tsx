import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Etymologist',
  description: 'Roots and Vibes',
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
