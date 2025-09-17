import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ChildProps } from '@/types'
import { ThemeProvider } from '@/components/providers/theme.provider'
import { Toaster } from '@/components/ui/sonner'
import NextAuthSessionProvider from '@/components/providers/session.provider'
import TopLoader from '@/components/shared/top-loader'
import { Analytics } from '@vercel/analytics/next'

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tulaganovok.uz'),
  title: 'Tulaganov',
  description: 'This is a portfolio website created by Otabek Tulaganov.',
  icons: { icon: '/favicon.png' },
  authors: [{ name: 'Otabek Tulaganov', url: 'https://www.tulaganovok.uz' }],
  openGraph: {
    title: 'Tulaganov',
    description: 'This is a portfolio website created by Otabek Tulaganov.',
    type: 'website',
    url: 'https://www.tulaganovok.uz',
    locale: 'en_US',
    images: 'https://gsebcf8sup.ufs.sh/f/SzyWteeJGb1CMsps8nB2a7etWLKqTJfB0uQvpY5h4X3irAC6',
    countryName: 'Uzbekistan',
    siteName: 'Tulaganov',
    emails: 'tulaganovok04@gmail.com',
  },
}

export default function RootLayout({ children }: Readonly<ChildProps>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased custom-scrollbar`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthSessionProvider>
            <TopLoader />
            {children}
          </NextAuthSessionProvider>
          <Toaster position={'bottom-center'} />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
