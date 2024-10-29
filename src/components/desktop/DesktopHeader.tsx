import React from 'react'
import CsImage from '../CsImage'
import { LOGO_IMG } from '@/constants/index'
import SearchCard from '../SearchCard'
import { ScrollTextIcon } from 'lucide-react'
import ProductNavigationMenu from './ProductNavigation'
import { ShoppingCartIcon } from 'lucide-react'
const DesktopHeader = () => {
  return (
    <header className='grid grid-cols-3 grid-rows-2 h-full gap-2'>
      {/* <div className='row-span-2 flex justify-center items-center'>
        <CsImage  src={LOGO_IMG.src} alt={LOGO_IMG.alt} width={300} height={34}/>
      </div> */}
      
      <div className='row-span-1 col-span-3 flex justify-center items-center'>
        <ProductNavigationMenu />
        <div className='flex justify-center items-center gap-2 '>
          <span className='flex justify-center items-center hover:cursor-pointer  hover:bg-gray-100 rounded-md py-1 px-2 gap-1'>
            Wish
            <ScrollTextIcon />
            List
          </span>
          <span className='flex justify-center items-center hover:cursor-pointer hover:bg-gray-100 rounded-md py-1 px-2 gap-1'>
            Current
            <ShoppingCartIcon />
            Cart
          </span>
        </div>
      </div>
      <div className='row-span-1 col-span-3 flex justify-around items-center px-4'>
        <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Bulk stationary
        </span>
        <SearchCard />
      </div>
    </header>
  )
}

export default DesktopHeader