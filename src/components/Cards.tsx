import React from 'react'
import Name from './Name'
import Description from './Description'
import Tech from './Tech'

const Cards = () => {
  return (
    <div className=' w-[600px] lg:w-[800px] h-fit mt-4 lg:mt-40 z-10'>
      <Name></Name>
      <Description></Description>
      <Tech></Tech>
    </div>
  )
}

export default Cards