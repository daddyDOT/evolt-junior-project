import { Message } from '@/app/interfaces'
import Profile from './Profile'

const Bubble = (message : Message) => {
  return (
    <Profile user={message.user}>
      <span className="text-default-300 text-xs">{message.user.socketId}</span>
      <span className="text-default-700 mt-2 max-w-[800px]">{message.message}</span>
    </Profile>
  )
}

export default Bubble