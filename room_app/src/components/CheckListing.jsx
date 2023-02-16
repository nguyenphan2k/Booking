import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn, MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'

export default function CheckListing({ listing, id, onDelete, onEdit }) {
  return (
    <li className='bg-white flex flex-col justify-between items-center
    shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow 
    duration-150 m-[10px]'>
      <Link className='contents' to={`/category/${listing.type}/${id}`}>
        <img
          src={listing.imgUrls[0]}
          alt="img"
          className='h-[170px] w-full object-cover hover:scale-105
          transition-scale ease-in duration-200'
          loading='lazy'
        />
        <div className='w-full p-[10px]'>
          <div className='flex items-center space-x-1'>
            <MdLocationOn className='h-4 w-4 text-green-600' />
            <p className='font-semibold text-sm mb-[2px]
            text-gray-600 truncate'>{listing.address}</p>
          </div>
          <p className='font-semibold m-0 text-xl'>{listing.name}</p>
          <p className='text-[#457b9d] mt-2 font-semibold'>
            ${listing.offer
              ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            {listing.type === 'rent' && "/ month"}
          </p>
          <div className='flex items-center mt-[10px] space-x-3'>
            <div className='flex items-center space-x-1'>
              <p className='font-bold text-xs'>
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Beds"}
              </p>
            </div>
            <div className='flex items-center space-x-1'>
              <p className='font-bold text-xs'>
                {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Baths"}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {
        onDelete && (
          <FaTrash
            className='absolute bottom-2 right-2 h-[14px]
          cursor-pointer text-red-600'
            onClick={() => onDelete(listing.id)}
          />
        )
      }
      {
        onEdit && (
          <MdEdit
            className='absolute bottom-2 right-7 h-4
          cursor-pointer'
            onClick={() => onEdit(listing.id)}
          />
        )
      }
    </li>
  )
}
