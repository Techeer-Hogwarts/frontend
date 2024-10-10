import '../styles/globals.css'
import NevBar from '@/components/common/NevBar'
import Footer from '@/components/common/Footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <NevBar />
        <main className="flex-grow flex flex-col items-center justify-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
