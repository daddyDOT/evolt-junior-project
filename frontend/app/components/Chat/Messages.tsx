import { ScrollShadow } from "@nextui-org/react"

import { ReactNode } from "react";

const Messages = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollShadow
      className="flex flex-col-reverse gap-5 h-full"
      visibility="top"
    >
      {children}
    </ScrollShadow>
  )
}

export default Messages