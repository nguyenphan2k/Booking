import React, { useEffect, useState } from 'react'
import Photo from '../image/img1.jpg'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { useLocation, useNavigate } from 'react-router-dom'
const Header = () => {
  const [pageState, setPageState] = useState("Sign in")
  const navigate = useNavigate()
  const auth = getAuth()
  const location = useLocation()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setPageState("Profile")
      }
      else{
        setPageState("Sign In")
      }
    })
  },[auth])
  function pathMatchRoute(route) {
    if (route === location.pathname)
      return true
  }
  return (
    <header className='max-w-[1420px] mx-auto'>
      <div className='flex bg-slate-500 h-20 px-4  justify-between items-center 
      shadow-sm border-b sticky top-0 z-40'>
        <div className="left_side">
          <img
            src={Photo}
            alt=""
            className='w-10 rounded-full cursor-pointer'
            onClick={() => navigate("/")}
          />
        </div>
        <div className='mid_side'>
          <h1 className='uppercase text-3xl font-medium text-black'>
            Hưng Nguyên Guest House
          </h1>
        </div>
        <div className="right_side">
          <ul className='flex space-x-5'>
            <li
              className={`cursor-pointer py-3 text-sm text-gray-400 
              font-semibold border-b-[3px] border-b-transparent
              ${pathMatchRoute("/") && "text-black border-b-red-500"}`}
              onClick={() => navigate("/")}>
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm text-gray-400 
            font-semibold border-b-[3px] border-b-transparent
            ${pathMatchRoute("/offers") && "text-black border-b-red-500"}`}
              onClick={() => navigate("/offers")}>
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm text-gray-400 
            font-semibold border-b-[3px] border-b-transparent
            ${(pathMatchRoute("/signin") || pathMatchRoute("/profile")) && "text-black border-b-red-500"}`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header