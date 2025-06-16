import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <p className={'py-6 text-center'}>
        &copy;{' '}
        <Link href={'/'} className={'gradient-foreground underline'}>
          Tulaganov
        </Link>{' '}
        {new Date().getFullYear()}
        {'. '}
        All rights reserved
      </p>
    </footer>
  )
}
