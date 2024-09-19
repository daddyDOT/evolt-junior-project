import { Divider } from "@nextui-org/react"

import { ReactNode, useEffect, useState } from 'react';

interface BaseProps {
  heading: string;
  description: string;
  children: ReactNode;
}

const Base = ({ heading, description, children }: BaseProps) => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [screenHeight, setScreenHeight] = useState<number>(0);

  useEffect(() => {
    const updateScreenHeight = () => {
      setScreenHeight(window.innerHeight);
    };

    const elementWithIdHeader = document.getElementById('header');
    if (elementWithIdHeader) {
      setHeaderHeight(elementWithIdHeader.offsetHeight);
    }
    updateScreenHeight();

    window.addEventListener('resize', updateScreenHeight);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', updateScreenHeight);
    };
  }, []);

  return (
    <div className={`bg-default-100 md:rounded-3xl w-full md:!h-full p-4 md:p-8 overflow-hidden flex flex-col justify-between gap-4 md:gap-8`} style={{ height: `${screenHeight - headerHeight}px` }}>
      <div className="hidden md:block">
        <h1 className="text-default-900 text-md md:text-2xl font-bold md:mb-1">{heading}</h1>
        <span className="text-default-500 text-xs md:text-sm">{description}</span>
      </div>
      <Divider className="hidden md:block" />
      {children}
    </div>
  )
}

export default Base