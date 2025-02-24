import '../styles/globals.css'
import localFont from 'next/font/local'
import NavBar from '@/components/common/NavBar'
import Footer from '@/components/common/Footer'
import Providers from '@/utils/provider'

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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={pretendard.variable}>
      <body
        className={`${pretendard.className} min-h-screen flex flex-col justify-center items-center`}
      >
        <NavBar />
        <Providers>
          <main className="flex-1">{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  )
}
