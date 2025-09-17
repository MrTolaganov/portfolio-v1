import { ChildProps } from '@/types'
import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'

export default async function RootLayout({ children }: ChildProps) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
