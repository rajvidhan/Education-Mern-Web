import React from 'react'
import ContactUsForm from '../../Contactpage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto flex-col'>
      <div className='flex items-center justify-center'>
      <h1 className='font-bold text-[35px]'>Get in Touch</h1>
      </div>
      <div className='flex items-center justify-center mb-[60px]'>
      <p className='text-richblack-200  '>We'd love to here for you,Please fill out this form.</p>
      </div>
    <div>
      <ContactUsForm />
    </div>
    </div>
  )
}

export default ContactFormSection
