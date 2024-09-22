import { Divider } from "@nextui-org/react"

import { ReactNode, useEffect, useMemo, useState } from 'react';

interface BaseProps {
  heading: string;
  description: string;
  children: ReactNode;
}

const Base = ({ heading, description, children }: BaseProps) => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [screenHeight, setScreenHeight] = useState<number>(0);

  const height = useMemo(() => Number(screenHeight) - Number(headerHeight), [screenHeight, headerHeight]);

  useEffect(() => {
    const elementWithIdHeader = document.getElementById('header');
    
    const updateScreenHeight = () => {
      if (elementWithIdHeader) {
        setHeaderHeight(elementWithIdHeader.offsetHeight);
      }
      setScreenHeight(window.innerHeight);
    };

    updateScreenHeight();
  
    window.addEventListener('resize', updateScreenHeight);
  
    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', updateScreenHeight);
    };
  }, []);

  return (
    <div className={`bg-default-100 md:rounded-3xl w-full md:!h-full p-4 md:p-8 overflow-hidden flex flex-col justify-between gap-4 md:gap-8`} style={{ height: height }}>

      <div className="flex justify-between w-full items-center md:block w-fit">
        <h1 className="text-default-800 font-semibold text-sm md:text-default-900 md:text-2xl md:font-bold md:mb-1">{heading}</h1>
        <span className="text-right text-default-500 text-xs md:text-sm md:text-left">{description}</span>
      </div>

      <Divider className="hidden md:block" />
      {children}
    </div>
  )
}

export default Base