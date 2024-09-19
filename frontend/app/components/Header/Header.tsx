import { Button, Divider } from '@nextui-org/react'
import React from 'react'
import Logo from '../Logo'
import { MenuIcon } from '../icons'

const Header = () => {
  return (
    <div className='md:hidden w-full p-4 flex flex-col gap-2 justify-between items-end bg-default-100' id='header'>
        <div className='w-full flex justify-between items-center bg-default-100'>
            <Button
            isIconOnly
            variant="solid"
            size="lg"
            >
                <MenuIcon />
            </Button>
            <div className='text-right'>
                <Logo />
            </div>
        </div>
        <Divider className='my-[5px] h-[1px]' />
        <div className='flex justify-between w-full items-center'>
            <span className="text-default-800 font-semibold text-sm md:text-sm">Glavni razgovor</span>
            <span className="text-right text-default-500 text-xs md:text-sm">Only halal talk allowed</span>
        </div>
    </div>
  )
}

export default Header