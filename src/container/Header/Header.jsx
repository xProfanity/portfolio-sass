import React from 'react'

import './Header.scss'
import { motion } from 'framer-motion'

import { images } from '../../constants'

import { AppWrap } from '../../wrapper'

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    }
  }
}

const Header = () => {
  return (
    <div className='app__header app__flex'>
      <motion.div
        whileInView={{
          x: [-100, 0], opacity: [0, 1]
        }}
        transition={{
          duration: 0.5
        }}
        className="app__header-info"
      >
        <div className='app__header-badge'>
            <div className='badge-cmp app__flex'>
              <span>👋</span>
              <div style={{marginLeft: 20 }}>
                <p className='p-text'>Hello, I am</p>
                <h1 className='head-text'>gerrardafk</h1>
              </div>
            </div>
            <div className='tag-cmp app__flex'>
              <p className='p-text'>full-stack developer</p>
              <p className='p-text'>Web Developer</p>
              <p className='p-text'>Freelancer</p>
              <p className='p-text'>ui designer</p>
            </div>
        </div>
      </motion.div>
      <motion.div
        whileInView={{
          opacity: [0, 1]
        }}
        transition={{
          duration: 0.5,
          delayChildren: 0.5
        }}
        className="app__header-img"
      >
        {/* <img src={images.d3} style={{borderRadius: '100%'}} alt='profile_bg' /> */}
        <motion.img
          whileInView={{
            scale: [0, 1]
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut'
          }}
          className='overlay_circle'
          src={images.d2}
          alt='profile_cicle'
          style={{borderRadius: '100%'}}
        />
      </motion.div>
      <motion.div
        variants={scaleVariants}
        whileInView={
          scaleVariants.whileInView
        }
        className="app__header-circles"
      >
        {
          [images.api, images.react, images.git].map((circle, index) => {
            return <div className='circl-cmp app__flex' key={`circle-${index}`}>
              <img src={circle} alt='circle' />
            </div>
          })
        }
      </motion.div>
    </div>
  )
}

export default AppWrap(Header, 'home')