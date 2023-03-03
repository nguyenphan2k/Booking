import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase'

export default function Contact({ useRef, listing }) {
     const [Landlord, setLandlord] = useState(null)
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
          <>{Landlord !== null && (
               <div>
                    <p>Contact {Landlord.name} for
                    the {listing.name.toLowerCase}</p>
                    <div>
                         <textarea name="message" id="message" rows="2"></textarea>
                    </div>
               </div>
          )}</>
     )
}
