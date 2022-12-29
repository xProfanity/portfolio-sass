import React, { useEffect, useState } from 'react'

import './Testimonials.scss'
import { motion } from 'framer-motion'
import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const Testimonials = () => {
  const [brands, setBrands] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleClick = index => {
    setCurrentIndex(index)
  }

  useEffect(()=> {
    const populateTestimonials = async () => {
      const query = '*[_type == "brands"]'
      const skillsQuery = '*[_type == "testimonials"]'

      const data = await client.fetch(query)
      setBrands(data)
      
      const testimonialData = await client.fetch(skillsQuery)
      setTestimonials(testimonialData)
    }

    populateTestimonials()
  }, [])

  const test = testimonials[currentIndex]

  return (
    <>
      {
        testimonials.length && (
          <>
            <div className='app__testimonial-item app__flex'>
              <img 
                src={urlFor(test.imageUrl)}
                alt="testimonial"
              />
              <div className='app__testimonial-content'>
                <p className='p-text'>{test.feedback}</p>
                <div>
                  <h4 className='bold-text'>{test.name}</h4>
                  <h5 className='p-text'>{test.company}</h5>
                </div>
              </div>
            </div>

            <div className='app__testimonial-btns app__flex'>
              <div className='app__flex' onClick={()=>handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
                <HiChevronLeft />
              </div>
              <div className='app__flex' onClick={()=>handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
                <HiChevronRight />
              </div>
            </div>
          </>
        )
      }

      <div className='app__testimonial-brands app__flex'>
        {brands.map(brand => (
          <motion.div 
            key={brand._id}
            whileInView={{opacity: [0, 1]}}
            transition={{duration: .5, type: 'tween'}}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Testimonials, 'app__testimonial'), 'testimonials', 'app__primarybg')