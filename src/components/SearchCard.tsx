import React from 'react'
import { Input } from './ui/input'

const SearchCard = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      {/* Wrapper with gradient border */}
      <div className="p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg">
        {/* Inner div to prevent border changes on focus */}
        <div className="bg-white rounded-lg">
          <Input 
            type="text" 
            className="w-96 p-2 bg-transparent border-none rounded-lg focus:ring-0 focus:border-transparent focus:outline-none" 
            placeholder="Search Product" 
          />
        </div>
      </div>
    </div>
  )
}

export default SearchCard;
