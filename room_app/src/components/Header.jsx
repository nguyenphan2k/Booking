import React from 'react'
import Photo from '../image/img1.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  function pathRoute(route) {
    if (route === location.pathname)
      return true
  }
  return (
    <header className='max-w-[1420px] mx-auto'>
      <div className='flex bg-slate-200 h-20 px-4 justify-between items-center 
      shadow-sm border-b sticky top-0 z-50'>
        <div className="left_side">
          <img
            src={Photo}
            alt=""
            className='w-10 rounded-full cursor-pointer'
            onClick={() => navigate("/")}
          />
        </div>
        <div className='mid_side'>
          <h1 className='uppercase text-xl font-bold text-orange-500'>
            Hưng Nguyên Guest House
          </h1>
        </div>
        <div className="right_side">
          <ul className='flex space-x-5'>
            <li
              className={`cursor-pointer py-3 text-sm text-gray-400 
              font-semibold border-b-[3px] border-b-transparent
              ${pathRoute("/") && "text-black border-b-red-500"}`}
              onClick={() => navigate("/")}>
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm text-gray-400 
            font-semibold border-b-[3px] border-b-transparent
            ${pathRoute("/offers") && "text-black border-b-red-500"}`}
              onClick={() => navigate("/offers")}>
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm text-gray-400 
            font-semibold border-b-[3px] border-b-transparent
            ${pathRoute("/signin") && "text-black border-b-red-500"}`}
              onClick={() => navigate("/signin")}>
              SignIn
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header