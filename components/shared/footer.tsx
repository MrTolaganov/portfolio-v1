import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <p className={'py-6 text-center'}>
        &copy; <Link href={'/'}>Tulaganov</Link> {new Date().getFullYear()}
        {'. '}
        All rights reserved
      </p>
    </footer>
  )
}
