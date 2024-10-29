import React from 'react'
import AnimateFlash from './AnimateFlash'
import { MessagesSquare } from 'lucide-react'
const FlashBar = () => {
  return (
    <div className="p-2 lg:p-1 grid grid-cols-5 w-screen">
        <AnimateFlash />
        <div className='lg:flex hidden lg:flex-row lg:gap-4 hover:cursor-pointer hover:text-green-900 text-white rounded-md py-1 px-2 lg:w-full lg:justify-end'>
            Contact<MessagesSquare size={20} />us
        </div>  
    </div>
  )
}

export default FlashBar