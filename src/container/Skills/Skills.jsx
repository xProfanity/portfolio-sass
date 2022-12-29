import React, { useState } from 'react'
import { AppWrap, MotionWrap } from '../../wrapper'
import { motion } from 'framer-motion'
import { urlFor, client } from '../../client'
import { useEffect } from 'react'
import {  Tooltip } from 'react-tooltip'

import './Skills.scss'

const Skills = () => {

  const [experiences, setExperiences] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(()=> {
    const populateSkills = async () => {
      const query = '*[_type == "experiences"]'
      const skillsQuery = '*[_type == "skills"]'

      const data = await client.fetch(query)
      setExperiences(data)
      
      const skillsData = await client.fetch(skillsQuery)
      setSkills(skillsData)
    }

    populateSkills()
  }, [])
  return (
    <>
      <h2 className='head-text'>Skills & Experience</h2>

      <div className='app__skills-container'>
        <motion.div className='app__skills-list'>
          {skills.map(skill => {
            return <motion.div
              key={skill._id}
              whileInView={{opacity: [0, 1]}}
              transition={{duration: 0.5}}
              className="app__skills-item app__flex"
            >
              <div className='app__flex' style={{backgroundColor: skill.bgColor}}>
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className='p-text'>{skill.name}</p>
            </motion.div>
          })}
        </motion.div>
        <motion.div className='app__skills-exp'>
          {experiences?.map( experience => (

            <motion.div
              className='app__skills-exp-item'
              key={experience._id}
            >
              <div className='app__skills-exp-year'>
                <p className='bold-text'>
                  {experience.year}
                </p>
              </div>
              <motion.div className='app__skills-exp-works'>
                {experience.works.map(work => {
                  return <>
                    <motion.div
                      key={work._id}
                      whileInView={{opacity: [0, 1]}}
                      transition={{duration: 0.5}}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                      data-tooltip-content={work.desc}
                    >
                      <h4 className='bold-text'>
                        {work.name}
                      </h4>
                      <p className='p-text'>
                        {work.company}
                      </p>
                    </motion.div>
                    <Tooltip
                      id={work._id}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </Tooltip>
                </>
                })}
              </motion.div>
            </motion.div>
          ) )}
            
        </motion.div>
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Skills, 'app__skills'), 'skills', 'app__whitebg')