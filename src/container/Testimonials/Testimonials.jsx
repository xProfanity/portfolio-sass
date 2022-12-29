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

  return (
    <>
      {
        test
      }
    </>
  )
}

export default AppWrap(MotionWrap(Testimonials, 'app__testimonial'), 'testimonials', 'app__primarybg')