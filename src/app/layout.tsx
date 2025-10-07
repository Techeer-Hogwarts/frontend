import '../styles/globals.css'
import localFont from 'next/font/local'
import ConditionalNavBar from '@/components/common/ConditionalNavBar'
import Footer from '@/components/common/Footer'
import Providers from '@/utils/provider'
import { Toaster } from 'react-hot-toast'
import { GoogleTagManager } from '@next/third-parties/google'

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
      <body className={`${pretendard.className} min-h-screen flex flex-col`}>
        {process.env.NEXT_PUBLIC_GOOGLE_TAGMANAGER && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAGMANAGER} />
        )}
        <ConditionalNavBar />
        <Providers>
          <main className="flex-1 w-full">{children}</main>
        </Providers>
        <Toaster position="top-center" reverseOrder={false} />
        <Footer />
      </body>
    </html>
  )
}
