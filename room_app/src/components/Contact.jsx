import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase'

export default function Contact({ useRef, listing }) {
     const [landlord, setLandlord] = useState(null)
     useEffect(() => {
          async function getLandlord() {
               const docRef = doc(db, "users", useRef)
               const docSnap = await getDoc(docRef)
               if (docSnap.exists) {
                    setLandlord(docSnap.data())
               }
               else {
                    toast.error("Fail")
               }
          }
          getLandlord()
     }, [useRef])
     return (
          <>{landlord !== null && (
               <div>
                    <p>Contact {landlord.name}</p>
               </div>
          )}</>
     )
}
