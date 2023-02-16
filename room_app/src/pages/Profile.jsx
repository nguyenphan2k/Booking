import React, { useEffect, useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { FcHome } from 'react-icons/fc'
import CheckListing from '../components/CheckListing'

const Profile = () => {
  const auth = getAuth()
  const [changeDetail, setChangeDetail] = useState(false)
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const { name, email } = formData
  function onLogout() {
    auth.signOut()
    navigate("/")
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        const docRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(docRef, {
          name,
        })
      }
      toast.success("done")
    } catch (error) {
      toast.error("fail")
    }
  }
  async function onDelete(listingID){
      if(window.confirm("Are you to delete")){
        await deleteDoc(doc(db, "listings" , listingID))
        const updatedListings = listings.filter((listing) => listing.id !== listingID)
        setListings(updatedListings)
        toast.success("Done")
      }
  }
  function onEdit(listingID){
    navigate(`/edit-listing/${listingID}`)
  }
  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings")
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      )
      const querySnap = await getDocs(q)
      let listings = []
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      console.log(listings);
      setListings(listings)
      setLoading(false)
    }
    fetchUserListings()
  }, [auth.currentUser.uid])
  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center
      flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            <input
              type="text"
              id='name'
              onChange={onChange}
              value={name}
              disabled={!changeDetail}
              className={`w-full px-4 py-2 text-xl text-gray-700
              bg-white border border-gray-300 rounded transition ease-in-out mb-6 
              ${changeDetail && "bg-red-200 focus:bg-red-200"}`}
            />
            <input
              type="email"
              id='email'
              value={email}
              onChange={onChange}
              className='w-full px-4 py-2 text-xl text-gray-700
              bg-white border border-gray-300 rounded transition ease-in-out mb-6'
            />
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p
                className='flex items-center mb-6'>
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className='text-red-600 hover:text-red-700 cursor-pointer transition
                ease-in-out duration-200 ml-1'
                >
                  {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className='text-blue-600 hover:text-blue-700 cursor-pointer transition
              ease-in-out duration-200'>
                Sign out
              </p>
            </div>
          </form>
          <button
            className='w-full bg-blue-600 text-white uppercase 
            px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700
            transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
            type='submit'
          >
            <Link
              to="/create-listing"
              className='flex items-center justify-center'
            >
              <FcHome className='mr-2 text-3xl bg-red-200 rounded-full
              p-1 border-2'/>
              Sell or rent your home</Link>
          </button>
        </div>
      </section>
      <div>
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">
              My Listings
            </h2>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            2xl:grid-cols-5 mt-6 mb-6'>
              {listings.map((listing) => (
                <CheckListing
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}

export default Profile