import React, { useState } from 'react'
import Photo1 from '../image/wofl.jpg'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '../firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SignUp = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  {/*Inititial user*/ }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  {/*Asignment equal object*/ }
  const { name, email, password } = formData
  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  {/*Create sign up*/ }
  async function onSubmit(e) {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword
        (auth, email, password)
      updateProfile(auth.userCredential, {
        displayName: name
      })
      const user = userCredential.user
      const formDataCopy = { ...formData }
      {/*Delete a object exist*/ }
      delete formDataCopy.password
      formDataCopy.timestap = serverTimestamp()
      await setDoc(doc(db, "users", user.uid), formDataCopy)
      toast.success("Sign up done")
      navigate("/")
    } catch (error) {
      toast.error("Something went wrong with the registration")
    }
  }
  return (
    <section>
      <h1 className='text-3xl uppercase text-center mt-6 font-bold'>Sign Up</h1>
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
              id='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your full name'
              className='w-full px-4 mb-6 py-2 text-xl rounded 
              outline-none text-gray-700 bg-white border-gray-300
              transition ease-in-out'
            />
            <input
              type="email"
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
                Have a account? <Link to="/signin"
                  className='text-red-600 hover:text-red-700 transition duration-200
                ease-in-out'>Sign In
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
            <button
              type='submit'
              className='uppercase w-full bg-blue-600 text-white px-7 py-3
            text-sm font-medium rounded shadow-md hover:bg-blue-700
            transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>
              Sign Up
            </button>
            <div className='my-4 before:border-t flex before:flex-1 items-center
          before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignUp