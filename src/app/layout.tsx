import '../styles/globals.css'
import localFont from 'next/font/local'
import NevBar from '@/components/common/NevBar'
import Footer from '@/components/common/Footer'

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.ttf',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export const metadata = {
  title: {
    default: 'Techeerzip',
    template: 'Techeerzip',
  },
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <NevBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
