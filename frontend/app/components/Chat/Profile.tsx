import { User } from '@/app/interfaces'
import { Image, Tooltip } from '@nextui-org/react'
import { ReactNode } from 'react'

const Profile = ({ user, children, tooltip, className } : { user: User, children?: ReactNode, tooltip?: boolean, className?: string }) => {
  return (
    <div className={"flex gap-4 " + className}>
      <Image
        src={user.avatar}
        radius="full"
        width={40}
        height={40}
        className='flex-none'
        alt="avatar"
      />
      <div className="flex flex-col">
        {tooltip ? (
          <Tooltip
            content={user.socketId}
            showArrow
            classNames={{
              base: "dark before:bg-default-100",
              content: "dark bg-default-100 text-default-700"
            }}
          >
            <span className="text-default-700">{user.username}</span>
          </Tooltip>
          ) : (
          <span className="text-default-700">{user.username}</span>
        )}
        {children}
      </div>
    </div>
  )
}

export default Profile