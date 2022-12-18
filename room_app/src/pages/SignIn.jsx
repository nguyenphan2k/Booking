import React, { useState } from 'react'
import Photo1 from '../image/wofl.jpg'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import OAuth from '../components/OAuth'
import {signInWithEmailAndPassword, auth, GoogleAuthProvider} from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { async } from '@firebase/util'
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData
  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  const navigate = useNavigate()
  async function onSubmit(e){
    e.preventDefault()
    try {
      toast.success("Sign done")
      navigate("/")
    } catch (error) {
      toast.error("Fail")
    }
  }
  return (
    <section>
      <h1 className='text-3xl uppercase text-center mt-6 font-bold'>Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6
      py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img
            src={Photo1}
            alt="photo1"
            className='w-full rounded-2xl'
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              id='email'
              value={email}
              onChange={onChange}
              placeholder='Enter address'
              className='w-full px-4 mb-6 py-2 text-xl rounded 
              outline-none text-gray-700 bg-white border-gray-300
              transition ease-in-out'
            />
            <div className='relative mb-6'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                value={password}
                onChange={onChange}
                placeholder='Password'
                className='w-full px-4 py-2 text-xl rounded 
              outline-none text-gray-700 bg-white border-gray-300
              transition ease-in-out'
              />
              {showPassword ?
                <AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer'
                  onClick={() => setShowPassword((prev) => !prev)} />
                :
                <AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer'
                  onClick={() => setShowPassword((prev) => !prev)} />
              }
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm
            sm:text-lg'>
              <p className='text-gray-600 mb-6'>
                Don't have an account? <Link to="/signup"
                  className='text-red-600 hover:text-red-700 transition duration-200
                ease-in-out'>Register
                </Link>
              </p>
              <p>
                <Link to="/forgotpassword" className='text-blue-600 hover:text-blue-800 
                transition duration-200
                ease-in-out'>
                  Forgot Password
                </Link>
              </p>
            </div>
          </form>
          <button
            type='submit'
            className='uppercase w-full bg-blue-600 text-white px-7 py-3
            text-sm font-medium rounded shadow-md hover:bg-blue-700
            transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>
            Sign In
          </button>
          <div className='my-4 before:border-t flex before:flex-1 items-center
          before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
            <p className='text-center font-semibold mx-4'>OR</p>
          </div>
          <OAuth />
        </div>
      </div>
    </section>
  )
}

export default SignIn