import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { db } from '../firebase'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'

const OAuth = () => {
     const navigate = useNavigate()
     async function onGoogleClick(){
          try {
               const auth = getAuth()
               const provider = new GoogleAuthProvider()
               const result = await signInWithPopup(auth, provider)
               const user = result.user
               {/*check for the user*/}
               const docRef = doc(db, "users", user.uid)
               const docSnap = await getDoc(docRef)
               if(!docSnap.exists()){
                    await setDoc(docRef, {
                         name: user.displayName,
                         email: user.email,
                         timestap:serverTimestamp(),
                    })
               }
               toast.success("Sign up done")
               navigate("/")
          } catch (error) {
               toast.error("Sign up error")
          }
     }
     return (
          <button
               type='button'
               onClick={onGoogleClick}
               className='flex items-center w-full bg-red-700
          justify-center gap-2 px-7 py-3 rounded transition duration-150
          ease-in-out text-white uppercase font-medium text-sm
          hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg
          active:shadow-lg'>
               <FcGoogle className='text-2xl bg-white mr-2 rounded-full' />
               Continue with Google
          </button>
     )
}

export default OAuth