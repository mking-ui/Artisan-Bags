import React from 'react'
import { assets, BagIcon, CartIcon } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
      <Image onClick={()=>router.push('/seller')} className='w-28 lg:w-32 cursor-pointer' src={assets.logo} alt="" />
       
     <> <UserButton>
                   <UserButton.MenuItems>
                     <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push("/cart")} />
                   </UserButton.MenuItems>
                   <UserButton.MenuItems>
                     <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push("/my-orders")} />
                   </UserButton.MenuItems>
                   <UserButton.MenuItems>
                     <UserButton.Action label="About Us" labelIcon={<BagIcon />} onClick={() => router.push("/about-us")} />
                   </UserButton.MenuItems>
                   <UserButton.MenuItems>
                     <UserButton.Action label="Contact Us" labelIcon={<BagIcon />} onClick={() => router.push("/contact-us")} />
                   </UserButton.MenuItems>
                   <UserButton.MenuItems>
                     <UserButton.Action label="Home" labelIcon={<BagIcon />} onClick={() => router.push("/")} />
                   </UserButton.MenuItems>
                 </UserButton> </>
    </div>
  )
}

export default Navbar