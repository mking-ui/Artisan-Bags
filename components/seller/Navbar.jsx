import React from 'react'
import { assets, BagIcon, CartIcon, HomeIcon } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
      <Image onClick={() => router.push('/')} className='w-28 lg:w-32 cursor-pointer' src={assets.logo} alt="" />

      <> <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push("/")} />
        </UserButton.MenuItems>
      </UserButton> </>
    </div>
  )
}

export default Navbar