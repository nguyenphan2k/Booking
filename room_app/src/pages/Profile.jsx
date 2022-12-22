import React, { useState } from 'react'

const Profile = () => {
  const [formData, setFormData] = useState({
    name: 'Nguyen',
    email: 'phannguyen7565@gmail.com',
  })
  const { name, email } = formData
  function onSubmit() {

  }
  return (
    <>
      <section>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
        <div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              id='name'
              value={name}
              disabled className='w-full px-4 py-2 text-xl text-gray-700
              bg-white border border-gray-300 rounded transition ease-in-out'
            />
            <input
              type="email"
              id='email'
              value={email}
            />
          </form>
        </div>
      </section>
    </>
  )
}

export default Profile