import { Message } from '@/app/interfaces'
import { Image } from '@nextui-org/react'

const Bubble = (message : Message) => {
  return (
    <div className="flex gap-4">
      <Image
        src={message.user.avatar}
        radius="full"
        width={40}
        height={40}
        className='flex-none'
        alt="avatar"
      />
      <div className="flex flex-col">
        <span className="text-default-700">{message.user.username}</span>
        <span className="text-default-300 text-xs">{message.user.socketId}</span>
        <span className="text-default-700 mt-2 max-w-[800px]">{message.message}</span>
      </div>
    </div>
  )
}

export default Bubble