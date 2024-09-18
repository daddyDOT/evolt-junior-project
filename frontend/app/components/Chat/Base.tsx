import { Divider } from "@nextui-org/react"

import { ReactNode } from 'react';

interface BaseProps {
  heading: string;
  description: string;
  children: ReactNode;
}

const Base = ({ heading, description, children }: BaseProps) => {
  return (
    <div className="bg-default-100 rounded-3xl w-full p-8 overflow-hidden flex flex-col justify-between gap-8">
      <div>
      <h1 className="text-default-900 text-2xl font-bold mb-1">{heading}</h1>
      <span className="text-default-500 text-sm">{description}</span>
      </div>
      <Divider />
      {children}
    </div>
  )
}

export default Base