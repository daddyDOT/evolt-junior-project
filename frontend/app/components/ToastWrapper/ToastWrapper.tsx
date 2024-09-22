'use client'

import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';

const ToastWrapper = () => {

  // 0 - landscape, 1 - portrait
  const [orientation, setOrientation] = useState<number>(0)

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 1 : 0)
    }

    window.addEventListener('resize', () => updateOrientation())

    // cleanup
    return () => {
      window.removeEventListener('resize', () => updateOrientation())
    } 
  }, [])

  return (
    <ToastContainer
      position={orientation ? "top-center" : "bottom-right"}
      autoClose={2000}
      limit={3}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      stacked
      theme="colored"
    />
  )
}

export default ToastWrapper