import React, { useState } from 'react'

import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../client'

import './Footer.scss'

const Footer = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { name, email, message } = formData

  const handleChangeInput = e => {
    const { name, value } = e.target

    setFormData({
      ...formData, 
      [name]: value
    })
  }

  const handleSubmit = async () => {
    setLoading( true )
    
    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }

    await client.create(contact)
    setLoading(false)
    setIsFormSubmitted(true)
  }


  return (
    <>
      <h2 className='head-text'>Take a coffee & chat with me</h2>

      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt='email' />
          <a href='mailto:pecpalmplay@gmail.com' className='p-text'>pecpalmplay@gmail.com</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} alt='email' />
          <a href='tel: +265 997 65 80 60' className='p-text'>+265 997 65 80 60</a>
        </div>
      </div>

      {
        !isFormSubmitted ? <div className='app__footer-form app__flex'>
        <div className='app__flex'>
          <input 
            className='p-text' 
            type='text' 
            placeholder='Your name' 
            value={name}
            onChange={handleChangeInput}
            name='name'  
          />
          <input 
            className='p-text' 
            type='text' 
            placeholder='Your email' 
            value={email}
            onChange={handleChangeInput}
            name='email'  
          />
        </div>
        <div>
          <textarea 
            className='p-text'
            placeholder='Your message'
            value={message}
            name='message'
            onChange={handleChangeInput}
          />
        </div>
        <button type='button' className='p-text' onClick={handleSubmit}>
          { loading ? 'Sending' : 'Send Message' }
        </button>
      </div> : <div>
        <h3 className='head-text'>Thank you for getting in touch!</h3>
      </div>
      }
    </>
  )
}

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__whitebg')