import React,{useState} from 'react'
import Photo1 from '../image/wofl.jpg'
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const {email, password} = formData
  function onChange(e){
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  return (
    <section>
      <h1 className='text-3xl uppercase text-center mt-6 font-bold'>SignIn</h1>
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
          <form>
            <input
              type="text"
              id='email'
              value={email}
              onChange={onChange}
              placeholder='Enter address'
              className='w-full px-4 py-2 text-xl rounded 
              outline-none text-gray-700 bg-white border-gray-300
              transition ease-in-out'
            />
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
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignIn