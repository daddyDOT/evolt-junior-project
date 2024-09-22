'use client'

import { useState } from 'react'
import { Button, Divider } from '@nextui-org/react'
import { MenuIcon } from '../icons'
import Logo from '../Logo'
import Drawer from '../Drawer/Drawer'
import Sidebar from '../Sidebar/Sidebar'

const Header = () => {
  const [state, setState] = useState(false)

  return (
    <>
        <div className='md:hidden w-full p-4 pb-0 flex flex-col gap-2 justify-between items-end bg-default-100' id='header'>
            <div className='w-full flex justify-between items-center bg-default-100'>
                <Button
                isIconOnly
                variant="solid"
                size="lg"
                onClick={() => setState(true)}
                >
                    <MenuIcon />
                </Button>
                <div className='text-right'>
                    <Logo />
                </div>
            </div>
            <Divider className='my-[5px] h-[1px]' />
        </div>

        <Drawer state={state} onClose={setState}>
            <Sidebar
                mobile
                onClose={() => setState(false)}
            />
        </Drawer>
    </>
  )
}

export default Header