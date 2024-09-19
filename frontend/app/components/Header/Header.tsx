'use client'

import { Button, Divider, Image } from '@nextui-org/react'
import React, { useState } from 'react'
import Logo from '../Logo'
import { MenuIcon } from '../icons'
import Drawer from '../Drawer/Drawer'
import * as Chat from '../Chat'
import { NotificationCenter } from '../NotificationCenter'
import { User } from '@/app/interfaces'
import { useSocketContext } from '@/app/contexts/SocketContext'

const Header = () => {
  const [state, setState] = useState(false)
  const { user, onlineUsers } = useSocketContext();

  return (
    <>
        <div className='md:hidden w-full p-4 flex flex-col gap-2 justify-between items-end bg-default-100' id='header'>
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
            <div className='flex justify-between w-full items-center'>
                <span className="text-default-800 font-semibold text-sm md:text-sm">Glavni razgovor</span>
                <span className="text-right text-default-500 text-xs md:text-sm">Only halal talk allowed</span>
            </div>
        </div>

        <Drawer state={state} control={setState}>
            <div className="w-full flex flex-col gap-[5rem] h-full">
                <div className='w-full flex justify-between items-center'>
                    <Logo />
                    <Button
                        variant="light"
                        size="sm"
                        isIconOnly
                        onClick={() => setState(false)}
                    >
                        X
                    </Button>
                </div>

                <div className="flex flex-col gap-3">
                <h2 className="text-sm text-default-800">Your account</h2>
                <div className="flex items-center justify-between">
                    <Chat.Profile
                    user={user}
                    tooltip
                    className="items-center"
                    />
                    <NotificationCenter />
                </div>
                </div>

                <div className="flex flex-col gap-3">
                <h2 className="text-sm text-default-800">Rooms</h2>
                <Button
                    color="default"
                    className="flex items-center gap-2 bg-default-100"
                >
                    <span>Glavni razgovor</span>
                </Button>
                </div>

                <div className="flex flex-col gap-3">
                <h2 className="text-sm text-default-800">Online users</h2>
                {onlineUsers.map((item : User) => (
                    <Button
                    key={item.socketId}
                    color="default"
                    className="flex items-center gap-2 bg-default-100"
                    startContent={
                        <Image src={item.avatar} alt="user-photo" className="w-[20px] h-[20px]" />
                    }
                    >
                    <span>{item.username}</span>
                    </Button>
                ))}
                </div>
            </div>
        </Drawer>
    </>
  )
}

export default Header