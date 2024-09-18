import { Chip } from '@nextui-org/react'

const Logo = () => (
  <span className="flex items-center gap-3 text-xl text-default-900 font-bold tracking-wider">
      <Chip size="sm">v1.0.0</Chip>
      <span>
        Chatter
      <span className="font-light text-default-500 text-xs">.app</span>
    </span>
  </span>
)

export default Logo