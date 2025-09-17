import ContactForm from '@/components/forms/contact.form'
import Socials from '../shared/socials'

export default function ContactSection() {
  return (
    <section id='contact'>
      <div className='min-h-screen flex flex-col justify-center md:items-center max-md:px-4'>
        <h2 className={'text-3xl mb-16 font-bold gradient-foreground'}>
          <span className={'max-md:hidden text-primary'}>Contact me</span>
          <div className={'md:hidden flex justify-center'}>
            <span className={'text-primary text-center'}>Contact me</span>
          </div>
        </h2>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-48 lg:gap-64'}>
          <ContactForm />
          <Socials />
        </div>
      </div>
    </section>
  )
}
