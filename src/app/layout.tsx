import '../styles/globals.css'
import localFont from 'next/font/local'
import NevBar from '@/components/common/NevBar'
import Footer from '@/components/common/Footer'
import Providers from '@/utils/provider'

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.ttf',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <NevBar />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  )
}
