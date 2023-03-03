import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
     EffectFade,
     Autoplay,
     Navigation,
     Pagination,
} from "swiper";
import "swiper/css/bundle";
import { FaShare, FaMapMarkedAlt, FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa'
import { getAuth } from 'firebase/auth'
import Contact from "../components/Contact";

export default function Listing() {
     const auth = getAuth()
     const params = useParams()
     const [listing, setListing] = useState(null)
     const [loading, setLoading] = useState(true)
     const [shareLinkCopied, setShareLinkCopied] = useState(false)
     const [contactLandlord, setContactLandlord] = useState(false)
     SwiperCore.use([Autoplay, Navigation, Pagination]);
     useEffect(() => {
          async function fetchListing() {
               const docRef = doc(db, "listings", params.listingId);
               const docSnap = await getDoc(docRef);
               if (docSnap.exists()) {
                    setListing(docSnap.data());
                    setLoading(false);
               }
          }
          fetchListing();
     }, [params.listingId]);
     if (loading) {
          return <Spinner />;
     }
     return (
          <main>
               <Swiper
                    slidesPerView={1}
                    navigation
                    pagination={{ type: "progressbar" }}
                    effect="fade"
                    modules={[EffectFade]}
                    autoplay={{ delay: 3000 }}
               >
                    {listing.imgUrls.map((url, index) => (
                         <SwiperSlide key={index}>
                              <div className='relative w-full overflow-hidden h-[300px]'
                                   style={{
                                        background: `url(${listing.imgUrls[index]}) center no-repeat`,
                                        backgroundSize: 'cover',
                                   }}>
                              </div>
                         </SwiperSlide>
                    ))}
               </Swiper>
               <div className="fixed top-[13%] right-[3%] z-10
               bg-white cursor-pointer rounded-full border-2
               border-gray-400 w-12 h-12 flex justify-center
               items-center" onClick={() => {
                         navigator.clipboard.writeText(window.location.href)
                         setShareLinkCopied(true)
                         setTimeout(() => {
                              setShareLinkCopied(false)
                         }, 2000)
                    }}>
                    <FaShare className="text-lg text-slate-500" />
               </div>
               {
                    shareLinkCopied && (
                         <p className="fixed top-[23%] right-[5%] font-semibold
                         border-2 border-gray-400 rounded-md bg-white
                         z-10 p-2">Link Copy</p>
                    )
               }
               <div className="flex flex-col md:flex-row max-w-6xl
               lg:mx-auto m-4 p-4 rounded-lg border-3 shadow-lg
               bg-white lg:space-x-5">
                    <div className="w-full h-[200px] lg-[400px]">
                         <p className="text-2xl font-bold mb-3
                         text-blue-900">
                              {listing.name} - ${""}
                              {listing.offer
                                   ? listing.discountedPrice
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                   : listing.regularPrice
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              {listing.type === "rent" ? " / month" : ""}
                         </p>
                         <p className="flex items-center mt-6 mb-3
                         font-semibold">
                              <FaMapMarkedAlt className="mr-1 text-green-700" />
                              {listing.address}
                         </p>
                         <div className="flex justify-start items-center space-x-4 w-[75%]">
                              <p className="bg-red-800 w-full max-w-[200px] rounded-md 
                              text-white p-1 font-medium text-center shadow-md cursor-pointer">
                                   For {listing.type === "rent" ? "Rent" : "Sale"}
                              </p>
                              <p className="bg-green-800 w-full max-w-[200px] rounded-md
                              text-white p-1 font-medium text-center shadow-md cursor-pointer">
                                   {listing.offer && (
                                        <p>
                                             ${(+listing.regularPrice) - (+listing.discountedPrice)} discount
                                        </p>
                                   )}
                              </p>
                         </div>
                         <p className="mt-3 mb-3">
                              <span className="font-semibold">Description - </span>
                              {listing.description}
                         </p>
                         <ul className="flex items-center space-x-2 space-x-10 text-sm font-semibold">
                              <li className="flex items-center whitespace-nowrap">
                                   <FaBed className="mr-1 text-lg" />
                                   {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "Beds"}
                              </li>
                              <li className="flex items-center whitespace-nowrap">
                                   <FaBath className="mr-1 text-lg" />
                                   {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "Baths"}
                              </li>
                              <li className="flex items-center whitespace-nowrap">
                                   <FaParking className="mr-1 text-lg" />
                                   {+listing.parking >= 1 ? `${listing.parking} Parking` : "Parking"}
                              </li>
                              <li className="flex items-center whitespace-nowrap">
                                   <FaChair className="mr-1 text-lg" />
                                   {+listing.furnished >= 1 ? `${listing.furnished} Furnished` : "Furnished"}
                              </li>
                         </ul>
                         {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
                              <div className="mt-6">
                                   <button
                                        onClick={() => setContactLandlord(true)}
                                        className="px-7 py-3 bg-blue-600 text-white font-medium
                              text-sm uppercase rounded transition duration-150 ease-in-out shadow-md
                              hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
                              w-full text-center">
                                        Contact Landlord
                                   </button>
                              </div>
                         )}
                         {contactLandlord && (
                              <Contact userRef={listing.userRef} listing={listing}/>
                         )}
                    </div>
                    <div className="bg-blue-300 w-full h-[200px] lg-[400px]
                    overflow-x-hidden">
                         
                    </div>
               </div>
          </main>
     )
}
