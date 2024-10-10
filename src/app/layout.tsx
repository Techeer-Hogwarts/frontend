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
      <body>
        <NevBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
