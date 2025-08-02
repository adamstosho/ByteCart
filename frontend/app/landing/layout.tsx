import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ByteCart+ - Smart Inventory Management",
  description: "Never waste food again with ByteCart+, your intelligent kitchen companion for inventory tracking and expiration monitoring.",
  keywords: "inventory management, food waste, kitchen organization, expiration tracking, smart reminders",
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 