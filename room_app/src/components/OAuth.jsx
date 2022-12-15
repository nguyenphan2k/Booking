import React from 'react'
import {FcGoogle} from 'react-icons/fc'

const OAuth = () => {
     return (
          <button className='flex items-center w-full bg-red-700
          justify-center gap-2 px-7 py-3 rounded transition duration-150
          ease-in-out text-white uppercase font-medium text-sm
          hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg
          active:shadow-lg'>
               <FcGoogle className='text-2xl bg-white mr-2 rounded-full'/>                                                                                                                                
               Continue with Google
          </button>
     )
}

export default OAuth